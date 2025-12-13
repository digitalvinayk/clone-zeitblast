import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const orgId = session.user.organizationId;

    // Get total contacts
    const totalContacts = await prisma.contact.count({
      where: { organizationId: orgId },
    });

    // Get total messages
    const totalMessages = await prisma.message.count({
      where: { organizationId: orgId },
    });

    // Get total conversations
    const totalConversations = await prisma.conversation.count({
      where: { organizationId: orgId },
    });

    // Get contacts by status
    const contactsByStatus = await prisma.contact.groupBy({
      by: ['status'],
      where: { organizationId: orgId },
      _count: true,
    });

    const contactsByStatusMap = contactsByStatus.reduce((acc: { [key: string]: number }, item: any) => {
      acc[item.status] = item._count;
      return acc;
    }, {} as { [key: string]: number });

    // Get messages by status
    const messagesByStatus = await prisma.message.groupBy({
      by: ['status'],
      where: { organizationId: orgId },
      _count: true,
    });

    const messagesByStatusMap = messagesByStatus.reduce((acc: { [key: string]: number }, item: any) => {
      acc[item.status] = item._count;
      return acc;
    }, {} as { [key: string]: number });

    // Calculate response rate (inbound messages / outbound messages)
    const outboundCount = await prisma.message.count({
      where: {
        organizationId: orgId,
        direction: 'OUTBOUND',
      },
    });

    const inboundCount = await prisma.message.count({
      where: {
        organizationId: orgId,
        direction: 'INBOUND',
      },
    });

    const averageResponseRate = outboundCount > 0
      ? Math.round((inboundCount / outboundCount) * 100)
      : 0;

    const stats = {
      totalContacts,
      totalMessages,
      totalConversations,
      averageResponseRate,
      contactsByStatus: contactsByStatusMap,
      messagesByStatus: messagesByStatusMap,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
