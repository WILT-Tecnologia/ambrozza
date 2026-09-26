-- Adiciona a nova coluna temporariamente como nullable
ALTER TABLE "store_onboarding_consents"
ADD COLUMN "storeId" TEXT;

-- Migra o consentimento existente do Shopkeeper para a Store dele
UPDATE "store_onboarding_consents" AS c
SET "storeId" = s."id"
FROM "stores" AS s
WHERE s."shopkeeperId" = c."shopkeeperId";

-- Remove a relação antiga
ALTER TABLE "store_onboarding_consents"
DROP CONSTRAINT "store_onboarding_consents_shopkeeperId_fkey";

-- Remove a constraint UNIQUE antiga
DROP INDEX "store_onboarding_consents_shopkeeperId_key";

-- Remove a coluna antiga
ALTER TABLE "store_onboarding_consents"
DROP COLUMN "shopkeeperId";

-- Agora que os dados foram migrados, torna storeId obrigatório
ALTER TABLE "store_onboarding_consents"
ALTER COLUMN "storeId" SET NOT NULL;

-- Cria a nova constraint UNIQUE
CREATE UNIQUE INDEX "store_onboarding_consents_storeId_key"
ON "store_onboarding_consents"("storeId");

-- Cria a nova relação com Store
ALTER TABLE "store_onboarding_consents"
ADD CONSTRAINT "store_onboarding_consents_storeId_fkey"
FOREIGN KEY ("storeId")
REFERENCES "stores"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;
