import { CatProduct, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();
export const runtime = 'edge'
export const PATCH = async (
    request: Request,
    { params }: { params: { id: string } }
  ) => {
    try {
        const body = await request.json();
    
        const editProduct = await prisma.productStock.update({
            where: {
                id: String(params.id),
              },
            data: {
                name: body.productName,
                stock: body.stockProduct,
                price: body.buyPrice,
                cat: body.category as CatProduct,
                Product: {
                    update: {
                        where:{
                            productId:String(params.id),
                        },
                        data:{
                            sellprice:body.sellPrice,
                        }
                    }
                }
            },
            include: {
                Product: true,
            }
        });
        
        return NextResponse.json(editProduct, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}    
  
export const DELETE = async (
    request: Request,
    { params }: { params: { id: string } }
  ) => {
    try {
      const product = await prisma.productStock.delete({
        where: {
          id: String(params.id),
        },
      });
  
      return NextResponse.json(product, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } finally {
      await prisma.$disconnect();
    }
  };
  