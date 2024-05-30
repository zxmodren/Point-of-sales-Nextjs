import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Initialize Prisma client
const prisma = new PrismaClient();

// Handler function for POST request to update product stock
export const POST = async (request: Request) => {
  try {
    // Parse the request body as JSON
    const body = await request.json();

    // Validate the required fields
    if (typeof body.stock !== 'number') {
      return NextResponse.json(
        { error: 'stock is required and must be a number' },
        { status: 400 }
      );
    }

    // Get all products from the productStock table
    const allProducts = await prisma.productStock.findMany();

    // Update each product's stock by adding the stock from the request body
    const updatePromises = allProducts.map((product) =>
      prisma.productStock.update({
        where: { id: product.id },
        data: { stock: product.stock + body.stock },
      })
    );

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    // Return a success message
    return NextResponse.json(
      { message: 'Updated stock for all products' },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
};
