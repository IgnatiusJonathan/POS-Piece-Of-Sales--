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

  console.log('menambahkan produk');
  const products = [
    // Makanan
    { nama: 'Nasi Goreng Instan', jenis: 'Makanan', stok: 50, harga: 15000, image: 'https://images.unsplash.com/photo-1603133872878-684f208fb74b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bmFzaSUyMGdvcmVuZ3xlbnwwfHwwfHx8MA%3D%3D' },
    { nama: 'Mie Ayam Spesial', jenis: 'Makanan', stok: 30, harga: 12000, image: 'https://images.unsplash.com/photo-1599639932453-e96a630559d2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWllJTIwYXlhbXxlbnwwfHwwfHx8MA%3D%3D' },
    { nama: 'Bakso Sapi', jenis: 'Makanan', stok: 40, harga: 18000, image: 'https://images.unsplash.com/photo-1626804475297-411d863b37f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFra3NvfGVufDB8fDB8fHww' },

    // Minuman
    { nama: 'Teh Botol Sosro', jenis: 'Minuman', stok: 100, harga: 5000, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhJTIwYm90dGxlfGVufDB8fDB8fHww' },
    { nama: 'Coca Cola 390ml', jenis: 'Minuman', stok: 80, harga: 6000, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29jYSUyMGNvbGF8ZW58MHx8MHx8fDA%3D' },
    { nama: 'Air Mineral 600ml', jenis: 'Minuman', stok: 150, harga: 3000, image: 'https://images.unsplash.com/photo-1560363214-96963a3d8872?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWluZXJhbCUyMHdhdGVyfGVufDB8fDB8fHww' },

    // Snack
    { nama: 'Chitato Sapi Panggang', jenis: 'Snack', stok: 60, harga: 10000, image: 'https://images.unsplash.com/photo-1621447504864-d8686e12698c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90YXRvJTIwY2hpcHN8ZW58MHx8MHx8fDA%3D' },
    { nama: 'Oreo Original', jenis: 'Snack', stok: 70, harga: 8000, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3Jlb3xlbnwwfHwwfHx8MA%3D%3D' },
    { nama: 'Silverqueen Chunky Bar', jenis: 'Snack', stok: 45, harga: 15000, image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hvY29sYXRlJTIwYmFyfGVufDB8fDB8fHww' },

    // Susu
    { nama: 'Ultra Milk Coklat 250ml', jenis: 'Susu', stok: 80, harga: 6000, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsa3xlbnwwfHwwfHx8MA%3D%3D' },
    { nama: 'Bear Brand', jenis: 'Susu', stok: 60, harga: 10000, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsa3xlbnwwfHwwfHx8MA%3D%3D' },
    { nama: 'Indomilk Strawberry', jenis: 'Susu', stok: 50, harga: 5500, image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bWlsa3xlbnwwfHwwfHx8MA%3D%3D' },

    // Bahan Pembersih
    { nama: 'Rinso Anti Noda', jenis: 'Bahan Pembersih', stok: 30, harga: 25000, image: 'https://images.unsplash.com/photo-1585837137577-bc49d7d97761?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV0ZXJnZW50fGVufDB8fDB8fHww' },
    { nama: 'Sunlight Jeruk Nipis', jenis: 'Bahan Pembersih', stok: 40, harga: 15000, image: 'https://images.unsplash.com/photo-1584625321579-3d941e23033d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGlzaCUyMHNvYXB8ZW58MHx8MHx8fDA%3D' },
    { nama: 'Wipol Karbol', jenis: 'Bahan Pembersih', stok: 35, harga: 18000, image: 'https://images.unsplash.com/photo-1585837137577-bc49d7d97761?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGV0ZXJnZW50fGVufDB8fDB8fHww' },

    // Fresh Food
    { nama: 'Apel Fuji', jenis: 'Fresh Food', stok: 40, harga: 8000, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGV8ZW58MHx8MHx8fDA%3D' },
    { nama: 'Jeruk Medan', jenis: 'Fresh Food', stok: 50, harga: 5000, image: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b3JhbmdlfGVufDB8fDB8fHww' },
    { nama: 'Sayur Bayam', jenis: 'Fresh Food', stok: 30, harga: 3000, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D' },

    // Rumah Tangga
    { nama: 'Sapu Ijuk', jenis: 'Rumah Tangga', stok: 20, harga: 25000, image: 'https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvb218ZW58MHx8MHx8fDA%3D' },
    { nama: 'Ember Plastik', jenis: 'Rumah Tangga', stok: 25, harga: 20000, image: 'https://images.unsplash.com/photo-1596450514735-373165383ef3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVja2V0fGVufDB8fDB8fHww' },
    { nama: 'Spons Cuci Piring', jenis: 'Rumah Tangga', stok: 50, harga: 5000, image: 'https://images.unsplash.com/photo-1584625321579-3d941e23033d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvbmdlfGVufDB8fDB8fHww' },

    // Pangan
    { nama: 'Beras Pandan Wangi 5kg', jenis: 'Pangan', stok: 20, harga: 70000, image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmljZXxlbnwwfHwwfHx8MA%3D%3D' },
    { nama: 'Gula Pasir 1kg', jenis: 'Pangan', stok: 40, harga: 14000, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3VnYXJ8ZW58MHx8MHx8fDA%3D' },
    { nama: 'Minyak Goreng 2L', jenis: 'Pangan', stok: 30, harga: 35000, image: 'https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2lsfGVufDB8fDB8fHww' },

    // Lainnya
    { nama: 'Pulsa 10k', jenis: 'Lainnya', stok: 999, harga: 12000, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvbmV8ZW58MHx8MHx8fDA%3D' },
    { nama: 'Token Listrik 20k', jenis: 'Lainnya', stok: 999, harga: 22000, image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZWxlY3RyaWNpdHl8ZW58MHx8MHx8fDA%3D' },
    { nama: 'Kantong Plastik Besar', jenis: 'Lainnya', stok: 100, harga: 1000, image: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGxhc3RpYyUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D' },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

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
