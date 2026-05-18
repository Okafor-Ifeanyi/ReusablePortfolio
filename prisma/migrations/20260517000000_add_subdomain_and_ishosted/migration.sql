-- AlterTable
ALTER TABLE "portfolios" ADD COLUMN "subdomain" TEXT,
ADD COLUMN "is_hosted" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "portfolios_subdomain_key" ON "portfolios"("subdomain");
