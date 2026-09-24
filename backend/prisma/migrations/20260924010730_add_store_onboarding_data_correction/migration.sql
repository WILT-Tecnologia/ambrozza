/*
  Warnings:

  - You are about to drop the column `document` on the `shopkeepers` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `shopkeepers` table. All the data in the column will be lost.
  - You are about to drop the `store_addresses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_appearances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_onboarding_consents` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store_operations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cep` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `colorPalette` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `stores` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `stores` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "store_addresses" DROP CONSTRAINT "store_addresses_storeId_fkey";

-- DropForeignKey
ALTER TABLE "store_appearances" DROP CONSTRAINT "store_appearances_storeId_fkey";

-- DropForeignKey
ALTER TABLE "store_onboarding_consents" DROP CONSTRAINT "store_onboarding_consents_shopkeeperId_fkey";

-- DropForeignKey
ALTER TABLE "store_operations" DROP CONSTRAINT "store_operations_storeId_fkey";

-- DropIndex
DROP INDEX "shopkeepers_document_key";

-- AlterTable
ALTER TABLE "shopkeepers" DROP COLUMN "document",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "stores" ADD COLUMN     "allowDelivery" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "allowPickup" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "colorPalette" TEXT NOT NULL,
ADD COLUMN     "complement" TEXT,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "number" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL,
ADD COLUMN     "street" TEXT NOT NULL;

-- DropTable
DROP TABLE "store_addresses";

-- DropTable
DROP TABLE "store_appearances";

-- DropTable
DROP TABLE "store_onboarding_consents";

-- DropTable
DROP TABLE "store_operations";
