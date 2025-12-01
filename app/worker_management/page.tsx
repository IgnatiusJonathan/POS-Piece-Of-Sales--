'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Employee {
  id: string;
  nama: string;
  email?: string;
  password?: string;
  produkTerjual: number | null;
  absensi: string | null;
  img: string;
  jamKerja: number | null;
  gaji: number | null;
  performa: number | null;
}
export default function WorkerManagement() {
  const [mounted, setMounted] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const accountImages = [
    "/img/byebye.jpg",
    "/img/peter.jpg",
    "/img/salim.jpg"
  ];
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    email: '',
    password: ''
  });
  useEffect(() => {
    setMounted(true);
    const savedData = localStorage.getItem('users');
    
    if (savedData) {
      setEmployees(JSON.parse(savedData));
    } else {
      //default dummy data if nothing is in local storage
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
    if (mounted) {
      localStorage.setItem('users', JSON.stringify(employees));
    }
  }, [employees, mounted]);
  const handlePrevImage = () => {
    setCurrentImgIndex((prev) => (prev - 1 + accountImages.length) % accountImages.length);
  };
  const handleNextImage = () => {
    setCurrentImgIndex((prev) => (prev + 1) % accountImages.length);
  };
  const calculateAttendance = (absensi: string | null) => {
    if (!absensi) return 'N/A';
    const [attended, total] = absensi.split('/').map(Number);
    if (!total) return 'N/A';
    return `${Math.round((attended / total) * 100)}%`;
  };
  const generateStars = (rating: number | null) => {
    if (!rating) return 'N/A';
    return '⭐'.repeat(Math.floor(rating)) + ` (${rating})`;
  };
  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee: Employee = {
      id: formData.id,
      nama: formData.name,
      email: formData.email,
      password: formData.password,
      produkTerjual: 0,
      absensi: '0/0',
      jamKerja: 0,
      gaji: 0,
      performa: 0,
      img: '/img/account.jpg'
    };
    setEmployees([...employees, newEmployee]);
    setFormData({ name: '', id: '', email: '', password: '' });
    alert('Akun berhasil dibuat!');
  };
  const removeEmployee = (id: string) => {
    if (window.confirm(`Hapus karyawan ID ${id}?`)) {
      setEmployees(employees.filter((emp) => emp.id !== id));
    }
  };
  const filteredEmployees = employees.filter((emp) =>
    emp.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (!mounted) return null;
  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-black font-sans text-zinc-900 dark:text-zinc-100">
      <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 border-b border-zinc-100 dark:border-zinc-800">
          <h1 className="text-xl font-bold tracking-tight">TARUMART <span className="text-sm font-normal text-zinc-500">Kasir</span></h1>
        </div>
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {['Dashboard', 'Inventory', 'Membership', 'History', 'Checkouts', 'Tambah Item'].map((item) => (
            <Link key={item} href="#" className="block px-4 py-3 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {item}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-zinc-100 dark:border-zinc-800">
             <Link href="/" className="flex items-center gap-2 text-red-500 text-sm font-medium px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                Logout
             </Link>
        </div>
      </aside>
      <main className="flex-1 md:ml-64 p-4 md:p-8 space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <nav className="flex gap-6 text-sm font-medium">
             <a href="#createAccount" className="hover:text-blue-600">Admin</a>
             <a href="#stats" className="hover:text-blue-600">Statistik</a>
             <a href="#employees" className="hover:text-blue-600">Karyawan</a>
          </nav>
          <div className="flex items-center gap-3">
             <span className="text-sm font-semibold">Cashier Name</span>
             <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center">👤</div>
          </div>
        </header>
        <section id="createAccount" className="grid md:grid-cols-2 gap-8 bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
          <div>
            <h2 className="text-xl font-semibold mb-6">Create Account</h2>
            <div className="relative w-full h-64 bg-zinc-100 dark:bg-zinc-800 rounded-xl overflow-hidden mb-4 group">
               <img 
                 src={accountImages[currentImgIndex]} 
                 alt="Avatar Preview" 
                 className="w-full h-full object-cover"
               />
               <button onClick={handlePrevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">❮</button>
               <button onClick={handleNextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70">❯</button>
            </div>
          </div>
          <form onSubmit={handleAddEmployee} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input required name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent" type="text" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ID</label>
              <input required name="id" value={formData.id} onChange={(e) => setFormData({...formData, id: e.target.value})} className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent" type="text" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input required name="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent" type="email" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Password</label>
              <input required name="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full p-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-transparent" type="password" />
            </div>
            <button type="submit" className="w-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
              Create Account
            </button>
          </form>
        </section>
        <section id="stats">
            <h3 className="text-lg font-bold mb-4">Statistik</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'Jumlah Karyawan', val: employees.length },
                    { label: 'Barang Terjual', val: '1240' },
                    { label: 'Total Produk', val: '312' },
                    { label: 'Last Update', val: 'Oct 07, 14:32' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 text-center">
                        <h4 className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{stat.label}</h4>
                        <p className="text-2xl font-bold">{stat.val}</p>
                    </div>
                ))}
            </div>
        </section>
        <section id="employees" className="pb-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold">EMPLOYEE MANAGEMENT</h1>
                <input 
                    type="search" 
                    placeholder="Search by Name or ID..." 
                    className="w-full md:w-64 p-2 px-4 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid gap-4">
                {filteredEmployees.length === 0 ? (
                    <div className="text-center py-10 text-zinc-500">Karyawan tidak ditemukan.</div>
                ) : (
                    filteredEmployees.map((emp) => (
                        <div key={emp.id} className="flex flex-col md:flex-row items-center gap-6 bg-white dark:bg-zinc-900 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm transition-transform hover:scale-[1.01]">
                            <div className="w-20 h-20 flex-shrink-0 rounded-full overflow-hidden bg-zinc-100">
                                <img src={emp.img || '/img/account.jpg'} alt={emp.nama} className="w-full h-full object-cover"/>
                            </div>
                            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full text-sm">
                                <div>
                                    <p className="font-bold text-zinc-500 text-xs uppercase">Nama</p>
                                    <p className="font-semibold">{emp.nama}</p>
                                    <p className="text-xs text-zinc-400">{emp.id}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-500 text-xs uppercase">Performa</p>
                                    <p>{generateStars(emp.performa)}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-500 text-xs uppercase">Absensi</p>
                                    <p>{calculateAttendance(emp.absensi)}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-zinc-500 text-xs uppercase">Gaji</p>
                                    <p>{emp.gaji ? `Rp ${emp.gaji.toLocaleString('id-ID')}` : 'N/A'}</p>
                                </div>
                            </div>
                            <button 
                                onClick={() => removeEmployee(emp.id)}
                                className="px-4 py-2 text-xs font-bold text-red-500 border border-red-500 rounded hover:bg-red-500 hover:text-white transition-colors"
                            >
                                REMOVE
                            </button>
                        </div>
                    ))
                )}
            </div>
        </section>
      </main>
    </div>
  );
}
