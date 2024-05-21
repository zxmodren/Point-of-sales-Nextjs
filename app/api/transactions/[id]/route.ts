import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const onSaleProducts = await prisma.onSaleProduct.findMany({
      where: { transactionId: id },
      select: {
        id: true,
        transactionId:true,
        productId: true,
        quantity: true,
        product: {
          select: {
            sellprice: true,
            productstock: {
              select: {
                name: true,
                cat: true,
              }
            }
          }
        }
      },
    });

    if (!onSaleProducts.length) {
      return NextResponse.json({ message: 'OnSaleProduct not found' }, { status: 404 });
    }

    return NextResponse.json(onSaleProducts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
