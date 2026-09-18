import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient, SuperAdminRole } from '@prisma/client';
import * as argon2 from 'argon2';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(
      'SUPER_ADMIN_EMAIL e SUPER_ADMIN_PASSWORD são obrigatórios.',
    );
  }

  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 3,
    parallelism: 1,
  });

  const superAdmin = await prisma.superAdmin.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      name: 'Super Admin',
      email,
      password: passwordHash,
      role: SuperAdminRole.SUPER_ADMIN,
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
