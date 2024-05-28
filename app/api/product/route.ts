import { CatProduct, PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Initialize Prisma client
const prisma = new PrismaClient();

// Function to generate a unique ID for a new product
const generateUniqueId = async () => {
  let isUnique = false;
  let customId = '';

  // Loop until a unique ID is generated
  while (!isUnique) {
    // Generate a new ID with the prefix 'PRD-' and a random UUID
    customId = `PRD-${uuidv4().slice(0, 8)}`;
    // Check if the generated ID already exists in the database
    const existingProduct = await prisma.productStock.findUnique({
      where: { id: customId },
    });

    // If the ID is unique, exit the loop
    if (!existingProduct) {
      isUnique = true;
    }
  }

  return customId;
};

// Handler function for POST request to create a new product
export const POST = async (request: Request) => {
  try {
    // Generate a unique ID for the new product
    const customId = await generateUniqueId();
    // Parse the request body as JSON
    const body = await request.json();

    // Create a new product with the generated ID and other details
    const newProduct = await prisma.productStock.create({
      data: {
        id: customId,
        name: body.productName,
        stock: body.stockProduct,
        price: body.buyPrice,
        cat: body.category as CatProduct,
        Product: {
          create: {
            sellprice: body.sellPrice,
          },
        },
      },
    });

    // Return the newly created product in the response
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error: any) {
    // Handle errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    // Disconnect Prisma client
    await prisma.$disconnect();
  }
};
