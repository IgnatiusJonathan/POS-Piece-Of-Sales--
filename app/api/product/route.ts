import prisma from "@/lib/prisma";

export async function GET() {
  const data = await prisma.product.findMany();
  return Response.json(data);
}

export async function POST(req: Request) {
  const body = await req.json();

  if (body.stok <= 0) {
    return new Response("Stok harus lebih dari 0", { status: 400 });
  }

  const newItem = await prisma.product.create({
    data: body,
  });

  return Response.json(newItem);
}

