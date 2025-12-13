import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { sendSMS, formatPhoneNumber, validatePhoneNumber } from '@/lib/twilio';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { to, message, contactId, campaignId, fromNumberId } = body;

    if (!to || !message) {
      return NextResponse.json(
        { error: 'Phone number and message are required' },
        { status: 400 }
      );
    }

    // Validate phone number
    if (!validatePhoneNumber(to)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    // Check DNC list
    const dncEntry = await prisma.dncEntry.findFirst({
      where: {
        organizationId: session.user.organizationId,
        phoneNumber: formatPhoneNumber(to),
      },
    });

    if (dncEntry) {
      return NextResponse.json(
        { error: 'This number is on the Do Not Call list' },
        { status: 400 }
      );
    }

    // Get phone number to send from
    let fromPhone = process.env.TWILIO_PHONE_NUMBER;
    if (fromNumberId) {
      const phoneNumber = await prisma.phoneNumber.findFirst({
        where: {
          id: fromNumberId,
          organizationId: session.user.organizationId,
        },
      });
      if (phoneNumber) {
        fromPhone = phoneNumber.number;
      }
    }

    // Send SMS via Twilio
    const result = await sendSMS({
      to: formatPhoneNumber(to),
      message,
      from: fromPhone,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send SMS' },
        { status: 500 }
      );
    }

    // Save message to database
    const messageRecord = await prisma.message.create({
      data: {
        organizationId: session.user.organizationId,
        contactId: contactId || null,
        campaignId: campaignId || null,
        fromNumber: fromPhone || '',
        fromNumberId: fromNumberId || null,
        toNumber: formatPhoneNumber(to),
        direction: 'OUTBOUND',
        content: message,
        status: 'SENT',
        provider: 'TWILIO',
        providerMessageId: result.messageSid,
        userId: session.user.id,
        sentAt: new Date(),
      },
    });

    // Update phone number stats if applicable
    if (fromNumberId) {
      await prisma.phoneNumber.update({
        where: { id: fromNumberId },
        data: {
          messagesSent: { increment: 1 },
          messagesToday: { increment: 1 },
          lastUsedAt: new Date(),
        },
      });
    }

    // Update contact last contacted time
    if (contactId) {
      await prisma.contact.update({
        where: { id: contactId },
        data: {
          lastContactedAt: new Date(),
          status: 'CONTACTED',
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: messageRecord,
      messageSid: result.messageSid,
    });
  } catch (error) {
    console.error('Error sending SMS:', error);
    return NextResponse.json(
      { error: 'Failed to send SMS' },
      { status: 500 }
    );
  }
}
