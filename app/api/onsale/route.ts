import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Initialize Prisma client
const prisma = new PrismaClient();

// Handler function for POST request
export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // Check if a product with the same productId and transactionId already exists in the database
    const existingOrderProduct = await prisma.onSaleProduct.findFirst({
      where: {
        productId: body.productId,
        transactionId: body.transactionId,
      },
    });

    let onSaleProduct;

    if (existingOrderProduct) {
      // If it exists, update the quantity by adding the new quantity to the existing quantity
      onSaleProduct = await prisma.onSaleProduct.update({
        where: {
          id: existingOrderProduct.id, // Use the id of the existing product
        },
        data: {
          quantity: existingOrderProduct.quantity + body.qTy,
        },
      });
    } else {
      // If it doesn't exist, create a new product
      onSaleProduct = await prisma.onSaleProduct.create({
        data: {
          transactionId: body.transactionId,
          productId: body.productId,
          quantity: body.qTy,
        },
      });
    }

    // Return the created or updated product in the response
    return NextResponse.json(onSaleProduct, { status: 201 });
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
};
