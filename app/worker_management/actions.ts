'use server'

import prisma from '@/lib/prisma'

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
      nama: data.nama,
      email: data.email,
      password: data.password || "####",
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

export async function verifyWorkerLogin(id: number, passwordAttempt: string) {
  const worker = await prisma.worker.findUnique({
    where: { id: id }
  })

  if (worker && worker.password === passwordAttempt) {
    return {
      success: true,
      worker: {
        id: worker.id,
        nama: worker.nama,
        email: worker.email
      }
    }
  }

  return { success: false }
}