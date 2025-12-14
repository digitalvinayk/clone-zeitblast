import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create a test organization
  const org = await prisma.organization.upsert({
    where: { id: 'test-org-001' },
    update: {},
    create: {
      id: 'test-org-001',
      name: 'Test Organization',
      complianceStatus: 'APPROVED',
      timezone: 'America/New_York',
    },
  });

  console.log('✅ Created organization:', org.name);

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user = await prisma.user.upsert({
    where: { email: 'admin@intelloblast.com' },
    update: {},
    create: {
      email: 'admin@intelloblast.com',
      name: 'Test Admin',
      password: hashedPassword,
      role: 'ADMIN',
      organizationId: org.id,
    },
  });

  console.log('✅ Created test user:');
  console.log('   Email:', user.email);
  console.log('   Password: password123');
  console.log('   Role:', user.role);

  // Create another test user
  const user2 = await prisma.user.upsert({
    where: { email: 'user@intelloblast.com' },
    update: {},
    create: {
      email: 'user@intelloblast.com',
      name: 'Test User',
      password: hashedPassword,
      role: 'USER',
      organizationId: org.id,
    },
  });

  console.log('✅ Created second test user:');
  console.log('   Email:', user2.email);
  console.log('   Password: password123');
  console.log('   Role:', user2.role);

  console.log('\n🎉 Database seeding completed!');
  console.log('\n📝 You can now login with:');
  console.log('   Email: admin@intelloblast.com');
  console.log('   Password: password123');
  console.log('\n   OR');
  console.log('\n   Email: user@intelloblast.com');
  console.log('   Password: password123');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
