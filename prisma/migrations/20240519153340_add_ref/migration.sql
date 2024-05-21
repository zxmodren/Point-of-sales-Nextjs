-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "ref" TEXT;
