-- DropForeignKey
ALTER TABLE "OnSaleProduct" DROP CONSTRAINT "OnSaleProduct_productId_fkey";

-- AddForeignKey
ALTER TABLE "OnSaleProduct" ADD CONSTRAINT "OnSaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
