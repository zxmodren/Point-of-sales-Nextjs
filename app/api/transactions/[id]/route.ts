import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const onSaleProducts = await prisma.onSaleProduct.findMany({
      where: { transactionId: id },
      select: {
        id: true,
        transactionId: true,
        productId: true,
        quantity: true,
        product: {
          select: {
            sellprice: true,
            productstock: {
              select: {
                name: true,
                cat: true,
              },
            },
          },
        },
      },
      orderBy: {
        product: {
          productstock: {
            name: 'asc',
          },
        },
      },
    });

    if (!onSaleProducts.length) {
      return NextResponse.json(
        { message: 'OnSaleProduct not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(onSaleProducts, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const prisma = new PrismaClient();

    const body = await request.json();

    const productIds = body.productId.split(',').map((id: string) => id.trim());
    const quantities = Array.isArray(body.qTy)
      ? body.qTy.map(parseFloat)
      : [parseFloat(body.qTy)];

    if (productIds.length !== quantities.length) {
      throw new Error('Product IDs and quantities must have the same length');
    }

    const updatedStocks = [];
    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const quantity = quantities[i];

      const existingStock = await prisma.productStock.findFirst({
        where: { id: productId },
      });

      if (!existingStock) {
        throw new Error(`Stock not found for product ID: ${productId}`);
      }

      const updatedStock = await prisma.productStock.update({
        where: { id: productId },
        data: { stock: existingStock.stock - quantity },
      });

      updatedStocks.push(updatedStock);
    }

    const totalAmount = parseFloat(body.totalAmount);
    if (isNaN(totalAmount)) {
      throw new Error('Invalid totalAmount');
    }

    const editTransaction = await prisma.transaction.update({
      where: {
        id: String(params.id),
      },
      data: {
        totalAmount,
        isComplete: true,
      },
    });

    await prisma.$disconnect();

    return NextResponse.json(
      { editTransaction, updatedStocks },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const transaction = await prisma.transaction.delete({
      where: {
        id: String(params.id),
      },
    });

    return NextResponse.json(transaction, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
