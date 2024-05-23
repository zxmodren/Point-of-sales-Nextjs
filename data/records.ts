import { db } from '@/lib/db';

export const fetchRecords = async ({ take = 5, skip = 0 }) => {
  'use server';
  try {
    const results = await db.transaction.findMany({
      skip,
      take,
      select: {
        id: true,
        totalAmount: true,
        createdAt: true,
        isComplete: true,
        products: {
          select: {
            id: true,
            productId: true,
            quantity: true,
          },
        },
      },
      orderBy: {
        id: 'asc',
      },
    });

    // Hitung total quantity untuk setiap transaksi
    const resultsWithTotalQuantity = results.map((transaction) => {
      const totalQuantity = transaction.products.reduce(
        (sum, product) => sum + product.quantity,
        0
      );
      return {
        ...transaction,
        totalQuantity,
      };
    });

    const totalTransactions = await db.transaction.count();

    return {
      data: resultsWithTotalQuantity,
      metadata: {
        hasNextPage: skip + take < totalTransactions,
        totalPages: Math.ceil(totalTransactions / take),
      },
    };
  } finally {
    await db.$disconnect();
  }
};
