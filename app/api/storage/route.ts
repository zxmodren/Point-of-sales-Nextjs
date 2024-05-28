import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Handler function for GET request to fetch product stocks
export async function GET() {
  try {
    // Fetch all product stocks from the database, including the sell price of each product
    const productStocks = await prisma.productStock.findMany({
      include: {
        Product: {
          select: {
            sellprice: true,
          },
        },
      },
    });

    // Return the product stocks in the response
    return NextResponse.json(productStocks, { status: 200 });
  } catch (error) {
    // Handle errors if fetching product stocks fails
    return NextResponse.json(
      { error: 'Failed to fetch product stocks' },
      { status: 500 }
    );
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
}
