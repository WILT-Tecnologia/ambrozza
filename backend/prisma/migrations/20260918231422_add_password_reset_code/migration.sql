-- CreateTable
CREATE TABLE "password_reset_codes" (
    "id" TEXT NOT NULL,
    "shopkeeperId" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "password_reset_codes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "password_reset_codes_shopkeeperId_idx" ON "password_reset_codes"("shopkeeperId");

-- AddForeignKey
ALTER TABLE "password_reset_codes" ADD CONSTRAINT "password_reset_codes_shopkeeperId_fkey" FOREIGN KEY ("shopkeeperId") REFERENCES "shopkeepers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
