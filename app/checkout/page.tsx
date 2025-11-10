"use client";
import { useState } from "react";

export default function CheckoutPage() {
  const [tunai, setTunai] = useState(0);
  const total = 50000;
  const kembalian = tunai - total;

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h3 className="text-center mb-4">TARUMART Checkout</h3>

      <p>Total Harga: Rp {total}</p>

      <label className="form-label">Tunai: Rp </label>
      <input
        type="number"
        className="form-control mb-3"
        placeholder="Masukkan nominal"
        value={tunai}
        onChange={(e) => setTunai(Number(e.target.value))}
      />

      <p>Kembalian: Rp {kembalian > 0 ? kembalian : 0}</p>

      <button
        className="btn btn-primary w-100 mt-3"
        onClick={() => alert("Checkout Berhasil!")}
      >
        Checkout
      </button>
    </div>
  );
}
