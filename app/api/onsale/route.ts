import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    // Cek apakah produk dengan productId yang sama dan transactionId yang sama sudah ada dalam database
    const existingOrderproduct = await prisma.onSaleProduct.findFirst({
      where: {
        productId: body.productId,
        transactionId: body.transactionId,
      },
    });

    let onsale;

    if (existingOrderproduct) {
      // Jika sudah ada, tambahkan quantity yang baru ke quantity yang sudah ada
      onsale = await prisma.onSaleProduct.update({
        where: {
          id: existingOrderproduct.id, // Menggunakan id produk yang sudah ada
        },
        data: {
          quantity: existingOrderproduct.quantity + body.qTy,
        },
      });
    } else {
      // Jika belum ada, buat produk baru
      onsale = await prisma.onSaleProduct.create({
        data: {
          transactionId: body.transactionId,
          productId: body.productId,
          quantity: body.qTy,
        },
      });
    }

    return NextResponse.json(onsale, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
