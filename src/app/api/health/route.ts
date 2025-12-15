import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  const checks = {
    timestamp: new Date().toISOString(),
    nextauthSecret: !!process.env.NEXTAUTH_SECRET,
    nextauthUrl: process.env.NEXTAUTH_URL || 'NOT_SET',
    databaseUrl: process.env.DATABASE_URL ? 'SET' : 'NOT_SET',
    databaseConnection: 'UNKNOWN',
  };

  // Test database connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    checks.databaseConnection = 'SUCCESS';
  } catch (error: any) {
    checks.databaseConnection = `FAILED: ${error.message}`;
  }

  return NextResponse.json(checks, { status: 200 });
}
