import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Instantiate Prisma client
const prisma = new PrismaClient();

// Define type for QuantityByDay
type QuantityByDay = {
  day: string;
  totalQuantity: number;
};

// Handler function for GET requests
export async function GET(req: NextRequest) {
  try {
    // Get start and end dates from query parameters
    const { searchParams } = new URL(req.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    // Return an error response if start or end date is missing
    if (!start || !end) {
      return NextResponse.json(
        { error: 'Missing start or end date' },
        { status: 400 }
      );
    }

    // Convert start and end dates to Date objects
    const startDate = new Date(start);
    const endDate = new Date(end);
    endDate.setUTCHours(23, 59, 59, 999); // Set end date to the end of the day

    // Query the database to get total quantity sold for each day in the range
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

    // Create an array of all dates in the range with totalQuantity initialized to 0
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

    // Combine the date array and the database results to get total quantity for each day
    const combinedResult = dateArray.map((dateEntry) => ({
      day: dateEntry.day,
      totalQuantity: resultMap[dateEntry.day] ?? 0,
    }));

    // Return the combined result as a JSON response with a 200 status code
    return NextResponse.json({ combinedResult }, { status: 200 });
  } catch (error) {
    // Log and return an error message as a JSON response with a 500 status code if there's an error
    console.error('Error occurred:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  } finally {
    // Disconnect the Prisma client after the request is processed
    await prisma.$disconnect();
  }
}
