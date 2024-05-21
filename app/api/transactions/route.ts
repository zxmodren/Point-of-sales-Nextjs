import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
const prisma = new PrismaClient();

const generateUniqueId = async () => {
    let isUnique = false;
    let customId = '';

    while (!isUnique) {
        customId = `TRS-${uuidv4().slice(0, 8)}`;
        const existingOrder = await prisma.transaction.findUnique({
            where: { id: customId },
        });

        if (!existingOrder) {
            isUnique = true;
        }
    }

    return customId;
};

export const POST = async (request: Request) => {
    try {
        const customId = await generateUniqueId();
    
        const newOrder = await prisma.transaction.create({
            data: {
                id: customId,
            }
        });
    
        return NextResponse.json(newOrder, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
};    
  