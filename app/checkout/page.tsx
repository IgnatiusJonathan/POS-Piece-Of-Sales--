"use client";
import { useState, useEffect } from 'react';


interface Barang {
  barangID: string;
  nama: string;
  harga: number;
  gambar: string;
  stok?: number;
}

const sampleBarang: Barang[] = [
  {
    barangID: "1",
    nama: "chitato",
    harga: 10000,
    gambar: "/images/chitato.jpg",
    stok: 50,
  },
  {
    barangID: "2", 
    nama: "Indomie Goreng",
    harga: 3000,
    gambar: "/images/indomieGoreng.jpg",
    stok: 100
  },
  {
    barangID: "3",
    nama: "Aqua 600ml", 
    harga: 5000,
    gambar: "/images/aqua600.jpg",
    stok: 80
  }
];

export default function CheckoutPage() {
  const [barangs, setBarangs] = useState<Barang[]>([]);

  useEffect(() => {
    const dataInventory = localStorage.getItem('ProductID');
    
    if (!dataInventory) {
      localStorage.setItem('ProductID', JSON.stringify(sampleBarang));
      setBarangs(sampleBarang);
    } else {
      const inventory = JSON.parse(dataInventory);
      setBarangs(inventory);
    }
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-danger">Checkout Page</h1>
        <a href="/inventory" className="btn btn-outline-danger">
          Ke Inventory
        </a>
      </div>

      <p className="text-muted">Ada {barangs.length} barang yang ada pada inventory</p>

      <div className="row">
        {barangs.length === 0 ? (
          <div className="col-12 text-center py-5">
            <p className="text-muted">Belum ada barang di inventory</p>
          </div>
        ) : (
          barangs.map(barang => (
            <div key={barang.barangID} className="col-md-4 mb-3">
              <div className="card h-100">
                <img 
                  src={barang.gambar} 
                  alt={barang.nama}
                  className="card-img-top"
                  style={{ height: '150px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h6>{barang.nama}</h6>
                  <p className="text-danger fw-bold">Rp {barang.harga.toLocaleString()}</p>
                  {barang.stok !== undefined && (
                    <small className={`badge ${barang.stok > 0 ? 'bg-success' : 'bg-danger'}`}>
                      Stok: {barang.stok}
                    </small>
                  )}
                </div>
                <div className="card-footer">
                  <button className="btn btn-danger btn-sm w-100" disabled>
                    Tambah ke Keranjang
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
