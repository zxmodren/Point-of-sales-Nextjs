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
    const body = await request.json();

    const editProduct = await prisma.transaction.update({
      where: {
        id: String(params.id),
      },
      data: {
        totalAmount: body.totalAmount,
        isComplete: true,
      },
    });

    return NextResponse.json(editProduct, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
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
