"use client";
import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";

import Link from "next/link"; 

interface FormData {
    name: string;
    category: string;
    stock: number;
    price: number;
    image: File | null;
}

export default function AddItemPage() {
    
    const [formData, setFormData] = useState<FormData>({
        name: '',
        category: 'makanan',
        stock: 0,
        price: 0,
        image: null,
    });

    const categories = ["Makanan", "Minuman", "Snack", "Lainnya"];

   
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting data:', formData);
        
    };

   
    const itemLabelShape = {
        clipPath: 'polygon(0% 100%, 100% 100%, 85% 0%, 0% 0%)',
    };

    return (
        <>
            <Header />
            <div className="flex">
                
                <div className="fixed top-0 left-0 h-full z-30">
                    <Navbar />
                </div>

                <div className="flex-1 ml-[220px] min-h-screen bg-white transition-all duration-300">
                    
                 
                    <div className="pt-[80px] px-8 pb-4 bg-white sticky top-0 z-20">
                        
                        <h1 className="text-2xl font-bold text-[#800000]">
                            Tambah Item Baru 📦
                        </h1>
                        <p className="text-sm text-gray-500">
                            Masukkan detail produk baru ke dalam inventaris.
                        </p>
                    </div>

                    <div className="px-6 mb-10">
                      
                        <div className="bg-[#800000] rounded-t-lg px-6 flex items-center h-[50px] shadow-sm">
                            <span className="text-white font-bold text-sm tracking-wide">
                                FORMULIR PRODUK
                            </span>
                            
                             <Link href="/inventory" className="ml-auto text-white text-xs px-3 py-1 bg-red-800/80 rounded hover:bg-red-700 transition">
                                Kembali ke Inventaris
                            </Link>
                        </div>

                      
                        <div className="border border-t-0 border-[#800000] rounded-b-lg p-8 bg-white relative z-0 shadow-lg">
                            
                            <form onSubmit={handleSubmit} className="space-y-6">

                             
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Nama Barang
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        required
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#800000] focus:border-[#800000]"
                                        placeholder="Contoh: Kopi Bubuk 250gr"
                                    />
                                </div>

                            
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                                        Kategori
                                    </label>
                                    <select
                                        id="category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 bg-white focus:ring-[#800000] focus:border-[#800000]"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat.toLowerCase()}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                               
                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                                            Stok Awal
                                        </label>
                                        <input
                                            type="number"
                                            id="stock"
                                            value={formData.stock}
                                            onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                                            required
                                            min="0"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#800000] focus:border-[#800000]"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                                            Harga Jual (Rp)
                                        </label>
                                        <input
                                            type="number"
                                            id="price"
                                            value={formData.price}
                                            onChange={(e) => setFormData({...formData, price: parseInt(e.target.value)})}
                                            required
                                            min="0"
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-[#800000] focus:border-[#800000]"
                                        />
                                    </div>
                                </div>

                              
                                <div>
                                    <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                                        Gambar Produk (Opsional)
                                    </label>
                                    <input
                                        type="file"
                                        id="image"
                                        accept="image/*"
                                        onChange={(e) => setFormData({...formData, image: e.target.files ? e.target.files[0] : null})}
                                        className="mt-1 block w-full text-sm text-gray-500
                                                    file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
                                                    file:text-sm file:font-semibold
                                                    file:bg-red-50 file:text-[#800000]
                                                    hover:file:bg-red-100"
                                    />
                                </div>


                    
                                <div className="pt-4 flex justify-end">
                                     <button 
                                        type="submit"
                                        className="button_add_item bg-[#800000] text-white py-3 px-6 rounded-lg text-md font-semibold transition duration-150 hover:bg-red-900 shadow-md w-full sm:w-auto"
                                    >
                                        Simpan Item Baru
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
}