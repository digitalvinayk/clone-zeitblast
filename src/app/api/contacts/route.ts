import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/contacts - List all contacts
export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      organizationId: session.user.organizationId,
    };

    if (search) {
      where.OR = [
        { firstName: { contains: search } },
        { lastName: { contains: search } },
        { primaryPhone: { contains: search } },
      ];
    }

    if (status) {
      where.status = status;
    }

    const [contacts, total] = await Promise.all([
      prisma.contact.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          properties: {
            take: 1,
            select: {
              address: true,
              city: true,
              state: true,
            },
          },
        },
      }),
      prisma.contact.count({ where }),
    ]);

    return NextResponse.json({
      contacts,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    );
  }
}

// POST /api/contacts - Create a new contact
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.organizationId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, primaryPhone, emails, mailingAddress, tags, source } = body;

    if (!primaryPhone) {
      return NextResponse.json(
        { error: 'Primary phone is required' },
        { status: 400 }
      );
    }

    // Check if contact already exists
    const existingContact = await prisma.contact.findFirst({
      where: {
        organizationId: session.user.organizationId,
        primaryPhone,
      },
    });

    if (existingContact) {
      return NextResponse.json(
        { error: 'Contact with this phone number already exists' },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        organizationId: session.user.organizationId,
        firstName,
        lastName,
        primaryPhone,
        emails: emails ? JSON.stringify(emails) : null,
        mailingAddress: mailingAddress ? JSON.stringify(mailingAddress) : null,
        tags: tags ? JSON.stringify(tags) : null,
        source,
        status: 'NEW',
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Failed to create contact' },
      { status: 500 }
    );
  }
}
