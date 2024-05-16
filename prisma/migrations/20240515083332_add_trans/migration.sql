/*
  Warnings:

  - You are about to alter the column `quantity` on the `OnSaleProduct` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - Added the required column `transactionId` to the `OnSaleProduct` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OnSaleProduct" ADD COLUMN     "transactionId" TEXT NOT NULL,
ALTER COLUMN "quantity" SET DATA TYPE INTEGER,
ALTER COLUMN "saledate" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "totalAmount" DECIMAL(65,30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OnSaleProduct" ADD CONSTRAINT "OnSaleProduct_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
