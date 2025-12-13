import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendSMS, formatPhoneNumber } from '@/lib/twilio';

// POST /api/campaigns/[id]/send - Send campaign
export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    // Get campaign
    const campaign = await prisma.campaign.findFirst({
      where: {
        id,
        organizationId: session.user.organizationId,
      },
      include: {
        contacts: {
          where: { status: 'PENDING' },
          include: {
            contact: true,
          },
        },
      },
    });

    if (!campaign) {
      return NextResponse.json({ error: 'Campaign not found' }, { status: 404 });
    }

    if (campaign.status === 'ACTIVE') {
      return NextResponse.json(
        { error: 'Campaign is already running' },
        { status: 400 }
      );
    }

    // Update campaign status
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: {
        status: 'ACTIVE',
        startedAt: new Date(),
      },
    });

    // Get phone number to send from
    const phoneNumber = await prisma.phoneNumber.findFirst({
      where: {
        organizationId: session.user.organizationId,
        status: 'ACTIVE',
      },
      orderBy: { messagesSent: 'asc' }, // Use least used number
    });

    if (!phoneNumber) {
      return NextResponse.json(
        { error: 'No active phone number found' },
        { status: 400 }
      );
    }

    let successCount = 0;
    let failCount = 0;

    // Send messages to all contacts
    for (const campaignContact of campaign.contacts) {
      const contact = campaignContact.contact;

      // Check DNC list
      const isDNC = await prisma.dncEntry.findFirst({
        where: {
          organizationId: session.user.organizationId,
          phoneNumber: contact.primaryPhone,
        },
      });

      if (isDNC || contact.dncStatus) {
        await prisma.campaignContact.update({
          where: { id: campaignContact.id },
          data: { status: 'OPTED_OUT' },
        });
        failCount++;
        continue;
      }

      // Replace merge fields in message template
      let message = campaign.messageTemplate;
      message = message.replace(/\{firstName\}/g, contact.firstName || '');
      message = message.replace(/\{lastName\}/g, contact.lastName || '');
      message = message.replace(/\{phone\}/g, contact.primaryPhone);

      // Send SMS
      const result = await sendSMS({
        to: formatPhoneNumber(contact.primaryPhone),
        message,
        from: phoneNumber.number,
      });

      if (result.success) {
        // Save message record
        await prisma.message.create({
          data: {
            organizationId: session.user.organizationId,
            contactId: contact.id,
            campaignId: campaign.id,
            fromNumber: phoneNumber.number,
            fromNumberId: phoneNumber.id,
            toNumber: contact.primaryPhone,
            direction: 'OUTBOUND',
            content: message,
            status: 'SENT',
            provider: 'TWILIO',
            providerMessageId: result.messageSid,
            userId: session.user.id,
            sentAt: new Date(),
          },
        });

        await prisma.campaignContact.update({
          where: { id: campaignContact.id },
          data: { status: 'ACTIVE' },
        });

        await prisma.contact.update({
          where: { id: contact.id },
          data: {
            lastContactedAt: new Date(),
            status: 'CONTACTED',
          },
        });

        successCount++;
      } else {
        await prisma.campaignContact.update({
          where: { id: campaignContact.id },
          data: { status: 'FAILED' },
        });
        failCount++;
      }

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    // Update campaign as completed
    await prisma.campaign.update({
      where: { id: campaign.id },
      data: {
        status: 'COMPLETED',
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      successCount,
      failCount,
      total: campaign.contacts.length,
    });
  } catch (error) {
    console.error('Error sending campaign:', error);
    return NextResponse.json(
      { error: 'Failed to send campaign' },
      { status: 500 }
    );
  }
}
