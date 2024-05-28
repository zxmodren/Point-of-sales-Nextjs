export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Instantiate Prisma client
const prisma = new PrismaClient();

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

    // Query transactions within the date range, including related products and product details
    const transactions = await prisma.transaction.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
      },
      include: {
        products: {
          include: {
            product: {
              include: {
                productstock: true,
              },
            },
          },
        },
      },
    });

    // Query shop data to get the tax value
    const shopData = await prisma.shopData.findFirst();
    const taxRate = shopData?.tax ?? 0;

    // Initialize groupedData with default 0 values for each day in the range
    const groupedData: {
      date: string;
      netIncome: number;
      taxIncome: number;
      grossIncomeWithTax: number;
    }[] = [];

    // Populate default data for each day in the date range
    let currentDate = startDate;
    while (currentDate <= endDate) {
      groupedData.push({
        date: currentDate.toISOString().split('T')[0],
        netIncome: 0,
        taxIncome: 0,
        grossIncomeWithTax: 0,
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Process each transaction and group by createdAt date
    transactions.forEach((transaction) => {
      const date = transaction.createdAt.toISOString().split('T')[0];
      let costPriceTotal = 0;
      let sellPriceTotal = 0;
      let taxProfit = 0;

      // Process each onSaleProduct in the transaction
      transaction.products.forEach((onSaleProduct) => {
        const productStock = onSaleProduct.product;
        const product = onSaleProduct.product.productstock;
        const sellPrice = productStock.sellprice * onSaleProduct.quantity;
        const buyPrice = product.price * onSaleProduct.quantity;
        const tax = sellPrice * (taxRate / 100); // Calculate tax based on the tax rate
        const sellPriceWithTax = sellPrice + tax;
        const profit = sellPrice - buyPrice;
        costPriceTotal += profit;
        sellPriceTotal += sellPriceWithTax;
        taxProfit += sellPriceWithTax - sellPrice;
      });

      const netIncome = costPriceTotal;
      const taxIncome = taxProfit;
      const grossIncomeWithTax = sellPriceTotal;

      // Update groupedData with calculated values
      const existingData = groupedData.find((data) => data.date === date);
      if (existingData) {
        existingData.netIncome += netIncome;
        existingData.taxIncome += taxIncome;
        existingData.grossIncomeWithTax += grossIncomeWithTax;
      }
    });

    // Return the grouped data as a JSON response with a 200 status code
    return NextResponse.json({ groupedData }, { status: 200 });
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
