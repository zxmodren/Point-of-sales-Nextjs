import * as z from 'zod';

import { CatProduct } from '@prisma/client';

const categoryValidator = (val: string): val is CatProduct =>
  Object.values(CatProduct).includes(val as CatProduct);

export const productSchema = z
  .object({
    productName: z
      .string()
      .min(2, 'Product name must be at least 2 characters')
      .min(1, 'Product name cannot be empty'),
    buyPrice: z
      .number()
      .positive('Buy price must be a positive number')
      .min(0.05, 'Buy price min $0.05 '),
    sellPrice: z
      .number()
      .positive('Sell price must be a positive number')
      .min(0.01, 'Sell price min $0.01'),
    stockProduct: z
      .number()
      .positive('Buy price must be a positive number')
      .min(1, 'Stock min 1'),
    category: z
      .string()
      .min(1, 'Category cannot be empty')
      .refine(categoryValidator, {
        message: 'Select category',
        params: {
          validValues: Object.values(CatProduct).join(', '),
        },
      }),
  })
  .refine(
    (data) =>
      data.buyPrice == null ||
      data.sellPrice == null ||
      data.sellPrice > data.buyPrice,
    {
      message: 'Sell price must be greater than buy price',
      path: ['sellPrice'],
    }
  );
export const onsaleSchema = z.object({
  productId: z.string().min(1, 'Select Product'),
  qTy: z.number().positive('Qty must be a positive number').min(1, 'Qty min 1'),
  transactionId: z.string().min(1, 'Transaction Id is Empty'),
});
export const orderSchema = z.object({
  qTy: z.number().positive('Qty must be a positive number').min(1, 'Qty min 1'),
});
export const taxSchema = z.object({
  tax: z.number().min(0, 'Tax min 0').max(100, 'Tax max 100'),
});
export const shopnameSchema = z.object({
  storeName: z
    .string()
    .min(1, 'Store Name is Empty')
    .min(2, 'Store Name min 2 characters'),
});
export const restockSchema = z.object({
  stock: z
    .number()
    .positive('stock must be a positive number')
    .min(1, 'stock min 1'),
});
