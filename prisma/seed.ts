import { PrismaClient } from '@prisma/client';
import { fakeTransactionComplete, fakeProductStockComplete } from './fake-data';

const prisma = new PrismaClient();

// A `main` function so that we can use async/await
async function main() {
  await prisma.productStock.deleteMany({});
  const fakerRounds = 40;
  for (let i = 0; i < fakerRounds; i++) {
    const product = await prisma.productStock.create({
      data: {
        ...fakeProductStockComplete(),
      },
    });
    console.log(`Created transactions with id ${product.id} and name`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
