/*
  Warnings:

  - A unique constraint covering the columns `[document]` on the table `shopkeepers` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "shopkeepers" ADD COLUMN     "document" TEXT,
ADD COLUMN     "phone" TEXT;

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
CREATE UNIQUE INDEX "store_onboarding_consents_shopkeeperId_key" ON "store_onboarding_consents"("shopkeeperId");

-- CreateIndex
CREATE UNIQUE INDEX "shopkeepers_document_key" ON "shopkeepers"("document");

-- AddForeignKey
ALTER TABLE "store_onboarding_consents" ADD CONSTRAINT "store_onboarding_consents_shopkeeperId_fkey" FOREIGN KEY ("shopkeeperId") REFERENCES "shopkeepers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
