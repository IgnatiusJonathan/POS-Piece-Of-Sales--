"use client";

export default function PrintPage() {
  return (
    <div className="container mt-5" style={{ maxWidth: 400, textAlign: "center" }}>
      <h2>TARUMART</h2>

      <div className="text-start mt-3 mb-3">
        <p>Tanggal: <span>-</span></p>
        <p>Kasir: <span>-</span></p>
        <p>Customer: <span>-</span></p>
      </div>

      <hr />

      <div className="text-start mb-3">
        <p>(Daftar barang muncul di sini)</p>
      </div>

      <hr />

      <div className="text-start mb-3">
        <p>Total: Rp 0</p>
        <p>Tunai: Rp 0</p>
        <p>Kembalian: Rp 0</p>
      </div>

      <hr />

      <p>Terima kasih atas kunjungan Anda</p>
      <p>Silakan datang kembali</p>

      <div className="mt-4">
        <button className="btn btn-primary me-2" onClick={() => window.print()}>
          Print Struk
        </button>
        <button className="btn btn-secondary" onClick={() => window.location.href = "/checkout"}>
          Kembali ke Checkout
        </button>
      </div>
    </div>
  );
}
