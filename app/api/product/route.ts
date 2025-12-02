import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.product.findMany();
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newItem = await prisma.product.create({
    data: body,
  });

  return Response.json(newItem);
}
    
