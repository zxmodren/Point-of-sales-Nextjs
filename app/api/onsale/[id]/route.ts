import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();

    const editOrderproduct = await prisma.onSaleProduct.update({
      where: {
        id: String(params.id),
      },
      data: {
        quantity: body.qTy,
      },
    });

    return NextResponse.json(editOrderproduct, { status: 201 });
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
    const Orderproduct = await prisma.onSaleProduct.delete({
      where: {
        id: String(params.id),
      },
    });

    return NextResponse.json(Orderproduct, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
