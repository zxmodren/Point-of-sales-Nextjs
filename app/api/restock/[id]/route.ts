import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Initialize Prisma client
const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // Parse the request body as JSON
    const body = await request.json();

    // Get the current stock of the product
    const currentProduct = await prisma.productStock.findUnique({
      where: {
        id: String(params.id),
      },
    });

    // Calculate the new stock by adding the body's stockProduct to the current stock
    const newStock = currentProduct?.stock + body.stockProduct;

    // Update the product's stock
    const updatedProduct = await prisma.productStock.update({
      where: {
        id: String(params.id),
      },
      data: {
        stock: newStock,
      },
    });

    // Return the updated product in the response
    return NextResponse.json(updatedProduct, { status: 201 });
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
};
