/*
  Warnings:

  - You are about to drop the column `accountId` on the `approval_requests` table. All the data in the column will be lost.
  - You are about to drop the column `accountId` on the `stores` table. All the data in the column will be lost.
  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[slug]` on the table `stores` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[shopkeeperId]` on the table `stores` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopkeeperId` to the `approval_requests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shopkeeperId` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StoreMemberRole" AS ENUM ('CUSTOMER', 'STAFF', 'MANAGER', 'OWNER');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'CANCELED', 'DELIVERED');

-- DropForeignKey
ALTER TABLE "approval_requests" DROP CONSTRAINT "approval_requests_accountId_fkey";

-- DropForeignKey
ALTER TABLE "stores" DROP CONSTRAINT "stores_accountId_fkey";

-- DropIndex
DROP INDEX "stores_accountId_key";

-- AlterTable
ALTER TABLE "approval_requests" DROP COLUMN "accountId",
ADD COLUMN     "shopkeeperId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stores" DROP COLUMN "accountId",
ADD COLUMN     "shopkeeperId" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL;

-- DropTable
DROP TABLE "accounts";

-- CreateTable
CREATE TABLE "shopkeepers" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shopkeepers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_memberships" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "role" "StoreMemberRole" NOT NULL DEFAULT 'CUSTOMER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "store_memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shopkeepers_email_key" ON "shopkeepers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "store_memberships_userId_storeId_key" ON "store_memberships"("userId", "storeId");

-- CreateIndex
CREATE UNIQUE INDEX "stores_slug_key" ON "stores"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "stores_shopkeeperId_key" ON "stores"("shopkeeperId");

-- AddForeignKey
ALTER TABLE "approval_requests" ADD CONSTRAINT "approval_requests_shopkeeperId_fkey" FOREIGN KEY ("shopkeeperId") REFERENCES "shopkeepers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stores" ADD CONSTRAINT "stores_shopkeeperId_fkey" FOREIGN KEY ("shopkeeperId") REFERENCES "shopkeepers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_memberships" ADD CONSTRAINT "store_memberships_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_memberships" ADD CONSTRAINT "store_memberships_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;
