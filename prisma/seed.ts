import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.worker.createMany({
    data: [
        {
          nama: "admin",
          email: "admin@gmail.com",
          password: "admin123"
        },
        {
          nama: "John Doe",
          email: "john@gmail.com",
          password: "password123"
        }
      ],
    });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
