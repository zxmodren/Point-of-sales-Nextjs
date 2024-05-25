import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

type QuantityByDay = {
  day: string;
  totalQuantity: number;
};

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    if (!start || !end) {
      return NextResponse.json(
        { error: 'Missing start or end date' },
        { status: 400 }
      );
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setUTCHours(23, 59, 59, 999); // Set end date to the end of the day

    const result = await prisma.onSaleProduct.groupBy({
      by: ['saledate'],
      _sum: {
        quantity: true,
      },
      where: {
        saledate: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: {
        saledate: 'asc',
      },
    });

    // Create an array of all dates in the range
    const dateArray: QuantityByDay[] = [];
    for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
      dateArray.push({ day: d.toISOString().split('T')[0], totalQuantity: 0 });
    }

    // Map the database results to the date array
    const resultMap = result.reduce<Record<string, number>>((acc, entry) => {
      const day = entry.saledate.toISOString().split('T')[0];
      acc[day] = entry._sum.quantity || 0;
      return acc;
    }, {});

    const combinedResult = dateArray.map((dateEntry) => ({
      day: dateEntry.day,
      totalQuantity: resultMap[dateEntry.day] ?? 0,
    }));

    return NextResponse.json({ combinedResult }, { status: 200 });
  } catch (error) {
    console.error('Error occurred:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
