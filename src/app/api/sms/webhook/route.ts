import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * Twilio webhook for incoming SMS
 * This endpoint receives POST requests from Twilio when messages are received
 */
export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const from = formData.get('From') as string;
    const to = formData.get('To') as string;
    const body = formData.get('Body') as string;
    const messageSid = formData.get('MessageSid') as string;

    // Find the phone number this was sent to
    const phoneNumber = await prisma.phoneNumber.findFirst({
      where: { number: to },
    });

    if (!phoneNumber) {
      console.error('Phone number not found:', to);
      return new NextResponse('OK', { status: 200 });
    }

    // Find or create contact
    let contact = await prisma.contact.findFirst({
      where: {
        organizationId: phoneNumber.organizationId,
        primaryPhone: from,
      },
    });

    if (!contact) {
      // Create new contact for incoming message
      contact = await prisma.contact.create({
        data: {
          organizationId: phoneNumber.organizationId,
          primaryPhone: from,
          status: 'NEW',
          source: 'Inbound SMS',
        },
      });
    }

    // Check for opt-out keywords
    const optOutKeywords = ['STOP', 'STOPALL', 'UNSUBSCRIBE', 'CANCEL', 'END', 'QUIT'];
    const bodyUpper = body.trim().toUpperCase();

    if (optOutKeywords.includes(bodyUpper)) {
      // Add to DNC list
      await prisma.dncEntry.create({
        data: {
          organizationId: phoneNumber.organizationId,
          phoneNumber: from,
          reason: 'OPT_OUT',
          source: 'SMS Keyword',
        },
      });

      // Update contact
      await prisma.contact.update({
        where: { id: contact.id },
        data: { dncStatus: true },
      });
    }

    // Find or create conversation
    let conversation = await prisma.conversation.findFirst({
      where: {
        contactId: contact.id,
        phoneNumberId: phoneNumber.id,
      },
    });

    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          organizationId: phoneNumber.organizationId,
          contactId: contact.id,
          phoneNumberId: phoneNumber.id,
          status: 'ACTIVE',
        },
      });
    }

    // Save incoming message
    const message = await prisma.message.create({
      data: {
        organizationId: phoneNumber.organizationId,
        contactId: contact.id,
        conversationId: conversation.id,
        fromNumber: from,
        toNumber: to,
        direction: 'INBOUND',
        content: body,
        status: 'RECEIVED',
        provider: 'TWILIO',
        providerMessageId: messageSid,
      },
    });

    // Update conversation
    await prisma.conversation.update({
      where: { id: conversation.id },
      data: {
        lastMessageAt: new Date(),
        lastMessagePreview: body.substring(0, 100),
        unreadCount: { increment: 1 },
      },
    });

    // Log analytics event
    await prisma.analyticsEvent.create({
      data: {
        organizationId: phoneNumber.organizationId,
        eventType: 'sms_received',
        eventData: {
          contactId: contact.id,
          messageId: message.id,
          from,
          to,
        },
      },
    });

    // Return TwiML response
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`,
      {
        status: 200,
        headers: { 'Content-Type': 'text/xml' },
      }
    );
  } catch (error) {
    console.error('Error processing incoming SMS:', error);
    return new NextResponse('OK', { status: 200 });
  }
}
