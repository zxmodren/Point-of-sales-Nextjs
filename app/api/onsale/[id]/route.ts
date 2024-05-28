import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Handler function for PATCH request
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const body = await request.json();

    // Update the quantity of the order product with the specified id
    const editedOrderProduct = await prisma.onSaleProduct.update({
      where: {
        id: String(params.id),
      },
      data: {
        quantity: body.qTy,
      },
    });

    // Return the updated order product in the response
    return NextResponse.json(editedOrderProduct, { status: 201 });
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
};

// Handler function for DELETE request
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // Delete the order product with the specified id
    const deletedOrderProduct = await prisma.onSaleProduct.delete({
      where: {
        id: String(params.id),
      },
    });

    // Return a success message in the response
    return NextResponse.json(deletedOrderProduct, { status: 200 });
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
};
