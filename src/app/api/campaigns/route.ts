import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/campaigns - List all campaigns
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const campaigns = await prisma.campaign.findMany({
      where: {
        organizationId: session.user.organizationId,
      },
      include: {
        createdBy: {
          select: {
            name: true,
            email: true,
          },
        },
        _count: {
          select: {
            contacts: true,
            messages: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ campaigns });
  } catch (error) {
    console.error('Error fetching campaigns:', error);
    return NextResponse.json(
      { error: 'Failed to fetch campaigns' },
      { status: 500 }
    );
  }
}

// POST /api/campaigns - Create new campaign
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { name, type, messageTemplate, contactIds, scheduledAt } = body;

    if (!name || !messageTemplate) {
      return NextResponse.json(
        { error: 'Name and message template are required' },
        { status: 400 }
      );
    }

    const campaign = await prisma.campaign.create({
      data: {
        organizationId: session.user.organizationId,
        name,
        type: type || 'BLAST',
        messageTemplate,
        status: scheduledAt ? 'SCHEDULED' : 'DRAFT',
        scheduledAt: scheduledAt ? new Date(scheduledAt) : null,
        createdById: session.user.id,
      },
    });

    // Add contacts to campaign
    if (contactIds && contactIds.length > 0) {
      await prisma.campaignContact.createMany({
        data: contactIds.map((contactId: string) => ({
          campaignId: campaign.id,
          contactId,
          status: 'PENDING',
        })),
      });
    }

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error('Error creating campaign:', error);
    return NextResponse.json(
      { error: 'Failed to create campaign' },
      { status: 500 }
    );
  }
}
