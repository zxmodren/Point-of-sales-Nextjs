/*
  Warnings:

  - You are about to drop the `Tax` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tax";

-- CreateTable
CREATE TABLE "ShopData" (
    "id" TEXT NOT NULL,
    "tax" INTEGER,
    "name" TEXT,

    CONSTRAINT "ShopData_pkey" PRIMARY KEY ("id")
);
