import { UserRole, CatProduct } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: undefined,
    emailVerified: undefined,
    image: undefined,
    password: undefined,
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    username: faker.internet.userName(),
    email: undefined,
    emailVerified: undefined,
    image: undefined,
    password: undefined,
    role: UserRole.UNKNOW,
  };
}
export function fakeProductStock() {
  return {
    name: faker.person.fullName(),
    imageProduct: undefined,
    price: faker.number.float(),
    stock: faker.number.float(),
    cat: faker.helpers.arrayElement([CatProduct.ELECTRO, CatProduct.DRINK, CatProduct.FOOD, CatProduct.FASHION] as const),
  };
}
export function fakeProductStockComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    imageProduct: undefined,
    price: faker.number.float(),
    stock: faker.number.float(),
    cat: faker.helpers.arrayElement([CatProduct.ELECTRO, CatProduct.DRINK, CatProduct.FOOD, CatProduct.FASHION] as const),
  };
}
export function fakeProduct() {
  return {
    sellprice: faker.number.float(),
  };
}
export function fakeProductComplete() {
  return {
    id: faker.string.uuid(),
    productId: faker.string.uuid(),
    sellprice: faker.number.float(),
  };
}
export function fakeOnSaleProduct() {
  return {
    quantity: faker.number.int(),
  };
}
export function fakeOnSaleProductComplete() {
  return {
    id: faker.string.uuid(),
    productId: faker.string.uuid(),
    quantity: faker.number.int(),
    saledate: new Date(),
    transactionId: faker.string.uuid(),
  };
}
export function fakeTransaction() {
  return {
    totalAmount: undefined,
  };
}
export function fakeTransactionComplete() {
  return {
    id: faker.string.uuid(),
    totalAmount: undefined,
    createdAt: new Date(),
    isComplete: false,
  };
}
export function fakeShopData() {
  return {
    tax: undefined,
    name: undefined,
  };
}
export function fakeShopDataComplete() {
  return {
    id: faker.string.uuid(),
    tax: undefined,
    name: undefined,
  };
}
