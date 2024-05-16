/*
  Warnings:

  - The primary key for the `Transaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `transactionId` on the `OnSaleProduct` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "OnSaleProduct" DROP CONSTRAINT "OnSaleProduct_transactionId_fkey";

-- AlterTable
ALTER TABLE "OnSaleProduct" DROP COLUMN "transactionId",
ADD COLUMN     "transactionId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "OnSaleProduct" ADD CONSTRAINT "OnSaleProduct_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
