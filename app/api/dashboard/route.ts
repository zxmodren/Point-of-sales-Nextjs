import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Handler function for GET request
export async function GET(req: NextRequest) {
  try {
    // Aggregate total stock
    const totalStock = await prisma.productStock.aggregate({
      _sum: {
        stock: true,
      },
    });

    // Aggregate total amount
    const totalAmount = await prisma.transaction.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    // Aggregate total quantity
    const totalQuantity = await prisma.onSaleProduct.aggregate({
      _sum: {
        quantity: true,
      },
    });

    // Disconnect Prisma client
    await prisma.$disconnect();

    // Return aggregated data in the response
    return NextResponse.json(
      { totalStock, totalAmount, totalQuantity },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
