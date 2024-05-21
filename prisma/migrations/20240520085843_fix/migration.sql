-- DropIndex
DROP INDEX "OnSaleProduct_productId_idx";

-- CreateIndex
CREATE INDEX "OnSaleProduct_productId_transactionId_idx" ON "OnSaleProduct"("productId", "transactionId");
