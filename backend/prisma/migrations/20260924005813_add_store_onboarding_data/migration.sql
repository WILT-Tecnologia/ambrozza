/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `shopkeepers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shopkeepers" ADD COLUMN     "document" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "store_addresses" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "complement" TEXT,

    CONSTRAINT "store_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_operations" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "allowDelivery" BOOLEAN NOT NULL DEFAULT true,
    "allowPickup" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "store_operations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_appearances" (
    "id" TEXT NOT NULL,
    "storeId" TEXT NOT NULL,
    "colorPalette" TEXT NOT NULL,

    CONSTRAINT "store_appearances_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_onboarding_consents" (
    "id" TEXT NOT NULL,
    "shopkeeperId" TEXT NOT NULL,
    "termsAccepted" BOOLEAN NOT NULL,
    "privacyAccepted" BOOLEAN NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "store_onboarding_consents_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "store_addresses_storeId_key" ON "store_addresses"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "store_operations_storeId_key" ON "store_operations"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "store_appearances_storeId_key" ON "store_appearances"("storeId");

-- CreateIndex
CREATE UNIQUE INDEX "store_onboarding_consents_shopkeeperId_key" ON "store_onboarding_consents"("shopkeeperId");

-- CreateIndex
CREATE UNIQUE INDEX "shopkeepers_document_key" ON "shopkeepers"("document");

-- AddForeignKey
ALTER TABLE "store_addresses" ADD CONSTRAINT "store_addresses_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_operations" ADD CONSTRAINT "store_operations_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_appearances" ADD CONSTRAINT "store_appearances_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "store_onboarding_consents" ADD CONSTRAINT "store_onboarding_consents_shopkeeperId_fkey" FOREIGN KEY ("shopkeeperId") REFERENCES "shopkeepers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
