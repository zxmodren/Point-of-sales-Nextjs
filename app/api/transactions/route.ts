import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient();

// Function to generate a unique transaction ID
const generateUniqueId = async () => {
  let isUnique = false;
  let customId = '';

  // Loop until a unique ID is generated
  while (!isUnique) {
    customId = `TRS-${uuidv4().slice(0, 8)}`;
    const existingOrder = await prisma.transaction.findUnique({
      where: { id: customId },
    });

    // Check if the generated ID already exists in the database
    if (!existingOrder) {
      isUnique = true;
    }
  }

  return customId;
};

// POST request handler to create a new transaction with a unique ID
export const POST = async (request: Request) => {
  try {
    // Generate a unique transaction ID
    const customId = await generateUniqueId();

    // Create a new transaction with the unique ID
    const newOrder = await prisma.transaction.create({
      data: {
        id: customId,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
