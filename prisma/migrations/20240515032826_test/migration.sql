-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('OWNER', 'WORKER', 'UNKNOW');

-- CreateEnum
CREATE TYPE "CatProduct" AS ENUM ('ELECTRO', 'DRINK', 'FOOD', 'FASHION');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'UNKNOW',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductStock" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "imageProduct" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" DOUBLE PRECISION NOT NULL,
    "cat" "CatProduct" NOT NULL,

    CONSTRAINT "ProductStock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnSaleProduct" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "saledate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OnSaleProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sellprice" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ProductStock_id_key" ON "ProductStock"("id");

-- CreateIndex
CREATE INDEX "OnSaleProduct_productId_idx" ON "OnSaleProduct"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");

-- AddForeignKey
ALTER TABLE "OnSaleProduct" ADD CONSTRAINT "OnSaleProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductStock"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productId_fkey" FOREIGN KEY ("productId") REFERENCES "ProductStock"("id") ON DELETE CASCADE ON UPDATE CASCADE;
