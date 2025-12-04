'use server'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getWorkers() {
  const workers = await prisma.worker.findMany()
  return workers
}

export async function createWorker(data: { id: string; nama: string; email: string; password?: string }) {
  const existing = await prisma.worker.findUnique({
    where: { id: data.id }
  })

  if (existing) {
    throw new Error("Worker ID already exists")
  }

  const newWorker = await prisma.worker.create({
    data: {
      id: data.id,
      nama: data.nama,
      email: data.email,
      password: "####",
      produkTerjual: 0,
      absensi: "0/30",
      jamKerja: 0,
      gaji: 0,
      performa: 0.0,
    },
  })
  return newWorker
}

export async function deleteWorker(id: string) {
  await prisma.worker.delete({
    where: {
      id: id,
    },
  })
}