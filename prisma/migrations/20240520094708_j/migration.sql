-- DropForeignKey
ALTER TABLE "OnSaleProduct" DROP CONSTRAINT "OnSaleProduct_productId_fkey";

-- CreateIndex
CREATE INDEX "OnSaleProduct_productId_transactionId_idx" ON "OnSaleProduct"("productId", "transactionId");

-- AddForeignKey
ALTER TABLE "OnSaleProduct" ADD CONSTRAINT "OnSaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("productId") ON DELETE CASCADE ON UPDATE CASCADE;
