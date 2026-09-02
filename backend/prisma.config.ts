import { config } from 'dotenv';
import { defineConfig, env } from 'prisma/config';

config({
  path: process.env.PRISMA_ENV_FILE ?? '.env',
});

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
