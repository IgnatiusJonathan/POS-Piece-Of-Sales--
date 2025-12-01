'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Employee {
  id: string;
  nama: string;
  email?: string;
  produkTerjual: number | null;
  absensi: string | null;
  img: string;
  jamKerja: number | null;
  gaji: number | null;
  performa: number | null;
}

export default function WorkerManagementPage() {
  const [mounted, setMounted] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const defaultImage = "/img/account.jpg";
  const [imagePreview, setImagePreview] = useState<string>(defaultImage);
  const [formData, setFormData] = useState({ name: '', id: '', email: '', password: '' });
  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem('users');
    if (savedData) {
      setEmployees(JSON.parse(savedData));
    } else {
      const defaultData: Employee[] = [
        { id: 'KSR-01', nama: 'Chika Yumayu', produkTerjual: 173, absensi: '27/30', img: "/img/mygurl.jpg", jamKerja: 40, gaji: 5500000, performa: 4.8 },
        { id: 'KSR-02', nama: 'Ji-An', produkTerjual: 121, absensi: '29/30', img: "/img/wonjian.jpg", jamKerja: 38, gaji: 4800000, performa: 4.5 },
        { id: 'KSR-03', nama: 'Lisa ', produkTerjual: 155, absensi: '25/30', img: "/img/lisa.jpg", jamKerja: 40, gaji: 4800000, performa: 3.2 },
        { id: 'KSR-04', nama: 'Vanesa', produkTerjual: 198, absensi: '30/30', img: "/img/Vanesa.jpg", jamKerja: 42, gaji: 5200000, performa: 5.0 },
        { id: 'KSR-05', nama: 'Yunita Feriana', produkTerjual: 98, absensi: '28/30', img: "/img/kasir1.jpg", jamKerja: 35, gaji: 4500000, performa: 3.9 }
      ];
      setEmployees(defaultData);
      localStorage.setItem('users', JSON.stringify(defaultData));
    }
  }, []);
  useEffect(() => {
    if (mounted) localStorage.setItem('users', JSON.stringify(employees));
  }, [employees, mounted]);
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmp: Employee = {
      id: formData.id,
      nama: formData.name,
      produkTerjual: 0,
      absensi: '0/30',
      jamKerja: 0,
      gaji: 0,
      performa: 0,
      img: imagePreview
    };
    setEmployees([...employees, newEmp]);
    setFormData({ name: '', id: '', email: '', password: '' });
    setImagePreview(defaultImage);
    alert('Akun berhasil dibuat!');
  };
  const removeEmployee = (id: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus karyawan dengan ID ${id}?`)) {
      setEmployees(employees.filter(e => e.id !== id));
    }
  };
  const filteredEmployees = employees.filter(e => 
    e.nama.toLowerCase().includes(searchTerm.toLowerCase()) || 
    e.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const calculateAttendance = (absensi: string | null) => {
    if (!absensi) return 'N/A';
    const [attended, total] = absensi.split('/').map(Number);
    if (!total) return 'N/A';
    return `${Math.round((attended / total) * 100)}%`;
  };
  const renderStars = (rating: number | null) => {
    if (!rating) return <span className="text-zinc-400">N/A</span>;
    return <span className="text-yellow-500">{'★'.repeat(Math.floor(rating))} <span className="text-zinc-500 text-xs">({rating})</span></span>;
  };
  if (!mounted) return null;
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 font-sans flex">
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 fixed h-full z-20">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
          <h1 className="text-xl font-bold tracking-tight">TARUMART <span className="text-sm text-zinc-500 font-normal">Kasir</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {['Dashboard', 'Inventory', 'Membership', 'History', 'Checkouts', 'Tambah Item'].map((item) => (
            <button key={item} className="w-full text-left px-4 py-2.5 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all">
              {item}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
          <Link href="/" className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors">
            Logout
          </Link>
        </div>
      </aside>
      <main className="flex-1 md:ml-64 p-4 md:p-10 max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">Team Overview</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">Manage staff, track performance, and create accounts.</p>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-zinc-900 p-2 pr-6 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm">👤</div>
            <div>
              <p className="text-sm font-semibold">Cashier Name</p>
              <p className="text-xs text-zinc-500">Admin</p>
            </div>
          </div>
        </header>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard label="Jumlah Karyawan" value={employees.length} sub="Active Staff" />
          <StatCard label="Barang Terjual" value="1240" sub="Total Items" />
          <StatCard label="Total Produk" value="312" sub="In Stock" />
          <StatCard label="Last Update" value="07 Okt 2025" sub="14:32" />
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          <section className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Staff Roster</h3>
              <input 
                type="text" 
                placeholder="Cari Nama atau ID..." 
                className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-sm focus:ring-2 focus:ring-zinc-500 outline-none w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              {filteredEmployees.map((emp, index) => (
                <div key={index} className="group relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-5 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="h-20 w-20 flex-shrink-0 rounded-xl overflow-hidden bg-zinc-100">
                      <img src={emp.img || defaultImage} alt={emp.nama} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 text-sm">
                        <div className="col-span-2 sm:col-span-3 mb-2 flex justify-between">
                            <div>
                                <h4 className="font-bold text-lg text-zinc-900 dark:text-zinc-100">{emp.nama}</h4>
                                <span className="text-xs font-mono text-zinc-500 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">{emp.id}</span>
                            </div>
                             <button onClick={() => removeEmployee(emp.id)} className="text-xs text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition-colors h-fit">REMOVE</button>
                        </div>
                        <div><p className="text-xs text-zinc-500">Produk Terjual</p><p className="font-medium">{emp.produkTerjual || 'N/A'}</p></div>
                        <div><p className="text-xs text-zinc-500">Absensi</p><p className="font-medium">{calculateAttendance(emp.absensi)}</p></div>
                        <div><p className="text-xs text-zinc-500">Jam Kerja/Mg</p><p className="font-medium">{emp.jamKerja ? `${emp.jamKerja} jam` : 'N/A'}</p></div>
                        <div><p className="text-xs text-zinc-500">Gaji</p><p className="font-medium">{emp.gaji ? `Rp ${emp.gaji.toLocaleString('id-ID')}` : 'N/A'}</p></div>
                        <div className="col-span-2"><p className="text-xs text-zinc-500">Performa</p><p>{renderStars(emp.performa)}</p></div>
                    </div>
                  </div>
                </div>
              ))}
              {filteredEmployees.length === 0 && <div className="py-12 text-center text-zinc-400 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">Karyawan tidak ditemukan.</div>}
            </div>
          </section>
          <aside className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 sticky top-10">
              <h3 className="text-xl font-semibold mb-6">Create Account</h3>
              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-full h-48 mb-3 bg-zinc-100 dark:bg-zinc-800 rounded-lg overflow-hidden group">
                    <img src={imagePreview} alt="Avatar Preview" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="cursor-pointer text-white text-xs font-bold border border-white px-3 py-1 rounded-full hover:bg-white hover:text-black transition-colors">
                        Change Photo
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                      </label>
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500">Hover image to upload</span>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-zinc-500">Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded p-2 text-sm outline-none focus:border-zinc-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-zinc-500">ID</label>
                  <input required type="text" value={formData.id} onChange={e => setFormData({...formData, id: e.target.value})} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded p-2 text-sm outline-none focus:border-zinc-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-zinc-500">Email</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded p-2 text-sm outline-none focus:border-zinc-500" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase text-zinc-500">Password</label>
                  <input required type="password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full bg-zinc-50 dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded p-2 text-sm outline-none focus:border-zinc-500" />
                </div>
                <button type="submit" className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 font-bold py-3 rounded-lg hover:opacity-90 transition-opacity mt-2">Submit</button>
              </form>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value, sub }: { label: string, value: string | number, sub: string }) {
  return (
    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-xl">
      <h4 className="text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</h4>
      <p className="text-2xl font-bold mt-2 text-zinc-900 dark:text-white">{value}</p>
      <p className="text-xs text-zinc-400 mt-2">{sub}</p>
    </div>
  );
}