'use client';

import React, { useState, useEffect } from 'react';
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";
import { getWorkers, createWorker, deleteWorker } from './actions';

interface Worker {
  id: string;
  nama: string;
  email: string;
  produkTerjual: number;
  absensi: string;
  jamKerja: number;
  gaji: number;
  performa: number;
}

export default function WorkerManagementPage() {
  const [mounted, setMounted] = useState(false);
  const [workers, setWorkers] = useState<Worker[]>([]);
  
  const [formData, setFormData] = useState({ name: '', id: '', email: '', password: '' });

  useEffect(() => {
    setMounted(true);
    const fetchData = async () => {
      try {
        const data = await getWorkers();
        setWorkers(data);
      } catch (error) {
        console.error("Failed to fetch workers");
      }
    };
    fetchData();
  }, []);

  const handleAddWorker = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createWorker({
        id: formData.id,
        nama: formData.name,
        email: formData.email,
        password: formData.password
      });

      const updatedList = await getWorkers();
      setWorkers(updatedList);
      
      setFormData({ name: '', id: '', email: '', password: '' });
      alert('Akun berhasil dibuat!');
    } catch (error) {
      alert('Error: ID might already exist.');
    }
  };

  const removeWorker = async (id: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus karyawan dengan ID ${id}?`)) {
      try {
        await deleteWorker(id);
        setWorkers(workers.filter(w => w.id !== id));
      } catch (error) {
        alert("Failed to delete worker");
      }
    }
  };

  const filteredWorkers = workers;

  const calculateAttendance = (absensi: string | null) => {
    if (!absensi) return 'N/A';
    const parts = absensi.split('/');
    if (parts.length < 2) return 'N/A';
    const attended = Number(parts[0]);
    const total = Number(parts[1]);
    if (!total) return 'N/A';
    return `${Math.round((attended / total) * 100)}%`;
  };

  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-gray-400">N/A</span>;
    return <span className="text-yellow-500">{'★'.repeat(Math.floor(rating))} <span className="text-gray-500 text-xs">({rating})</span></span>;
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      
      <Header />

      <Navbar />

      <main className="content pt-20 p-6 ml-[200px] transition-all duration-300">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Team Overview</h2>
            <p className="text-gray-500 mt-1">Manage staff, track performance, and create accounts.</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard label="Jumlah Karyawan" value={workers.length} sub="Active Staff" />
          <StatCard label="Barang Terjual" value="1240" sub="Total Items" />
          <StatCard label="Total Produk" value="312" sub="In Stock" />
          <StatCard label="Last Update" value="07 Okt 2025" sub="14:32" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <section className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center gap-4">
              <h3 className="text-xl font-semibold whitespace-nowrap text-gray-900">Staff Roster</h3>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {filteredWorkers.map((worker, index) => (
                <div key={index} className="group relative bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
                  
                  <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-sm">
                      <div className="col-span-2 sm:col-span-3 mb-2 flex justify-between">
                          <div>
                              <h4 className="font-bold text-lg text-gray-900">{worker.nama}</h4>
                              <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{worker.id}</span>
                          </div>
                           <button onClick={() => removeWorker(worker.id)} className="text-xs text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition-colors h-fit">REMOVE</button>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Produk Terjual</p>
                        <p className="font-medium text-gray-900">{worker.produkTerjual ?? 0}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Absensi</p>
                        <p className="font-medium text-gray-900">{calculateAttendance(worker.absensi)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Jam Kerja/Mg</p>
                        <p className="font-medium text-gray-900">{worker.jamKerja ? `${worker.jamKerja} jam` : '0 jam'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Gaji</p>
                        <p className="font-medium text-gray-900">{worker.gaji ? `Rp ${worker.gaji.toLocaleString('id-ID')}` : '0'}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-xs text-gray-500">Performa</p>
                        <p className="text-gray-900">{renderStars(worker.performa)}</p>
                      </div>
                  </div>

                </div>
              ))}
              {filteredWorkers.length === 0 && <div className="py-12 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">No workers found in database.</div>}
            </div>
          </section>

          <aside className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24 shadow-sm">
              <h3 className="text-xl font-semibold mb-6 text-[var(--maroon)]">Create Account</h3>
              
              <form onSubmit={handleAddWorker} className="space-y-4">

                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">ID</label>
                  <input required type="text" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-gray-500">Password</label>
                  <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-white border border-gray-300 rounded p-2 text-sm text-gray-900 outline-none focus:border-[var(--maroon)]" />
                </div>

                <button type="submit" className="w-full bg-[var(--maroon)] text-white font-bold py-3 rounded-lg hover:bg-[var(--hover)] transition-opacity mt-4 shadow-md">Submit</button>
              </form>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string, value: string | number, sub: string }) {
  return (
    <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
      <h4 className="text-sm font-medium text-gray-500">{label}</h4>
      <p className="text-2xl font-bold mt-2 text-gray-900">{value}</p>
      <p className="text-xs text-gray-400 mt-2">{sub}</p>
    </div>
  );
}