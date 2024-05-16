import * as z from "zod";

import { CatProduct } from "@prisma/client";

const categoryValidator = (val: string): val is CatProduct =>
    Object.values(CatProduct).includes(val as CatProduct);

export const productSchema = z.object({
    productName: z
    .string()
    .min(2, "Product name must be at least 2 characters")
    .nonempty("Product name cannot be empty"),
    buyPrice: z.number().positive("Buy price must be a positive number").min(0.05, "Buy price min $0.05 "),
    sellPrice: z
    .number()
    .positive("Sell price must be a positive number")
    .min(0.01, "Sell price min $0.01"),
    stockProduct: z.number().positive("Buy price must be a positive number").min(1, "Stock min 1"),
    category: z.string().nonempty("Category cannot be empty").refine(categoryValidator, {
        message: "Select category",
        params: {
          validValues: Object.values(CatProduct).join(", "),
        },
      }),
})
.refine(
  (data) =>
    data.buyPrice == null ||
    data.sellPrice == null ||
    data.sellPrice > data.buyPrice,
  {
    message: "Sell price must be greater than buy price",
    path: ["sellPrice"],
  }
);

