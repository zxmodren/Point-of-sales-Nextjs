import { CatProduct, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient();

const generateUniqueId = async () => {
    let isUnique = false;
    let customId = '';

    while (!isUnique) {
        customId = `PRD-${uuidv4().slice(0, 8)}`;
        const existingProduct = await prisma.productStock.findUnique({
            where: { id: customId },
        });

        if (!existingProduct) {
            isUnique = true;
        }
    }

    return customId;
};

export const POST = async (request: Request) => {
    try {
        const customId = await generateUniqueId();
        const body = await request.json();
    
        const newProduct = await prisma.productStock.create({
            data: {
                id: customId,
                name: body.productName,
                stock: body.stockProduct,
                price: body.buyPrice,
                cat: body.category as CatProduct,
                Product: {
                    create: {
                        sellprice: body.sellPrice
                    }
                }
            },
        });
    
        return NextResponse.json(newProduct, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};    
  