import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function GET(req: NextRequest) {
  try {
    const totalStock = await prisma.productStock.aggregate({
      _sum: {
        stock: true,
      },
    });

    const totalAmount = await prisma.transaction.aggregate({
      _sum: {
        totalAmount: true,
      },
    });

    const totalQuantity = await prisma.onSaleProduct.aggregate({
      _sum: {
        quantity: true,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json(
      { totalStock, totalAmount, totalQuantity },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
