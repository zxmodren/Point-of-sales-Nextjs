import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET request handler to fetch onSaleProducts by transactionId
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Fetch transaction with the given id
    const transaction = await prisma.transaction.findUnique({
      where: { id },
    });

    // Return 404 if transaction is not found
    if (!transaction) {
      return NextResponse.json(
        { message: 'Transaction not found' },
        { status: 405 }
      );
    }

    // Fetch onSaleProducts with detailed product information
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

    // Return 404 if no onSaleProducts are found for the given transactionId
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

// PATCH request handler to update transaction and product stocks
export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const prisma = new PrismaClient();

    const body = await request.json();

    // Split productId and quantity strings and convert quantities to numbers
    const productIds = body.productId.split(',').map((id: string) => id.trim());
    const quantities = Array.isArray(body.qTy)
      ? body.qTy.map(parseFloat)
      : [parseFloat(body.qTy)];

    // Check if productIds and quantities have the same length
    if (productIds.length !== quantities.length) {
      throw new Error('Product IDs and quantities must have the same length');
    }

    const updatedStocks = [];
    for (let i = 0; i < productIds.length; i++) {
      const productId = productIds[i];
      const quantity = quantities[i];

      // Find existing stock for the product
      const existingStock = await prisma.productStock.findFirst({
        where: { id: productId },
      });

      // Throw error if stock not found
      if (!existingStock) {
        throw new Error(`Stock not found for product ID: ${productId}`);
      }

      // Update stock quantity
      const updatedStock = await prisma.productStock.update({
        where: { id: productId },
        data: { stock: existingStock.stock - quantity },
      });

      updatedStocks.push(updatedStock);
    }

    // Parse totalAmount from request body
    const totalAmount = parseFloat(body.totalAmount);
    if (isNaN(totalAmount)) {
      throw new Error('Invalid totalAmount');
    }

    // Update transaction with totalAmount and mark as complete
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

    // Return updated transaction and stocks
    return NextResponse.json(
      { editTransaction, updatedStocks },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
};

// DELETE request handler to delete a transaction
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    // Delete transaction by id
    const transaction = await prisma.transaction.delete({
      where: {
        id: String(params.id),
      },
    });

    return NextResponse.json(transaction, { status: 200 });
  } catch (error: any) {
    if (error.code === 'P2025') {
      // Prisma error code for data not found
      return NextResponse.json(
        { error: 'Transaction not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
