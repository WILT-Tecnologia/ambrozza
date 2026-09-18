// prisma/seedEmails.ts
import * as dotenv from 'dotenv';
dotenv.config();

import { faker } from '@faker-js/faker';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const passwordHash = await argon2.hash('senha123');

  for (let i = 0; i < 50; i++) {
    const name = faker.person.fullName();
    const email = faker.internet
      .email({ firstName: name.split(' ')[0] })
      .toLowerCase();

    const shopkeeper = await prisma.shopkeeper.create({
      data: {
        name,
        email,
        password: passwordHash,
        approvalStatus: 'PENDING',
      },
    });

    await prisma.approvalRequest.create({
      data: {
        shopkeeperId: shopkeeper.id,
        status: 'PENDING',
        createdAt: faker.date.recent({ days: 30 }),
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
