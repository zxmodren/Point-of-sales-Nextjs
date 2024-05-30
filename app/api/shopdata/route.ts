export const dynamic = 'force-dynamic';
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Instantiate Prisma client
const prisma = new PrismaClient();

// Handler function for GET requests
export async function GET(req: NextRequest) {
  try {
    // Fetch shopData from the database
    const shopData = await prisma.shopData.findMany();

    // Extract the first item from the result
    const data = shopData[0];

    // Return the data as a JSON response with a 200 status code
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    // Log the error for debugging purposes
    console.error('Error fetching shop data:', error);

    // Return a detailed error message as a JSON response with a 500 status code
    return NextResponse.json(
      { error: 'Failed to fetch shop data. Please try again later.' },
      { status: 500 }
    );
  } finally {
    // Disconnect the Prisma client after the request is processed
    await prisma.$disconnect();
  }
}
