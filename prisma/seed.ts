import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  await prisma.worker.create({
    data: {
      nama: "admin",
      email: "admin@gmail.com",
      password: "admin123"
    }
  });

  await prisma.worker.create({
    data: {
      nama: "John Doe",
      email: "john@gmail.com",
      password: "password123"
    }
  });

  console.log('Seed completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
