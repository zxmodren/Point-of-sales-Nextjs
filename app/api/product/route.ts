import { CatProduct, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient();

export const POST = async (request: Request) => {
    try {
        const customId = `PRD-${uuidv4()}`;
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
}    
  