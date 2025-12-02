"use client";

import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/SearchBar";
import { Product } from "@prisma/client";


export default function InventoryPage() {
  const [selectedCategory, setSelectedCategory] = useState("makanan");
  const [products, setProducts] = useState<Product[]>([]);

  const categories = ["Makanan", "Minuman", "Snack", "Lainnya"];

  const tabShape = {
    clipPath: "polygon(0% 100%, 100% 100%, 90% 0%, 0% 0%)",
  };

  const itemLabelShape = {
    clipPath: "polygon(0% 100%, 100% 100%, 85% 0%, 0% 0%)",
  };

  
  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProducts(data); 
    }
    fetchProducts();
  }, []);

  return (
    <>
      <Header />
      <div className="flex">
        <div className="fixed top-0 left-0 h-full z-30">
          <Navbar />
        </div>

        <div className="flex-1 ml-[220px] min-h-screen bg-white transition-all duration-300">
          <div className="pt-[80px] px-8 pb-4 bg-white sticky top-0 z-20">
            <SearchBar
              data={products} 
              onSearch={() => {}}
              keySearch="nama"
              placeholder="Cari barang..."
            />
          </div>

          <div className="px-6 mb-10">
            <div className="bg-[#800000] rounded-t-lg px-6 flex items-end h-[50px]">
              <span className="text-white/70 font-bold text-xs mr-4 mb-2 tracking-wide">
                KATEGORI:
              </span>

              <div className="flex items-end h-full -mb-[1px]">
                {categories.map((category, index) => {
                  const isActive = selectedCategory === category.toLowerCase();
                  return (
                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(category.toLowerCase())
                      }
                      style={tabShape}
                      className={`
                        px-8 py-2 font-bold text-xs tracking-wide relative transition-all duration-200
                        ${index !== 0 ? "-ml-4" : ""} 
                        ${
                          isActive
                            ? "bg-white text-[#800000] z-20 h-[40px]"
                            : "bg-[#600000] text-gray-300 hover:bg-[#700000] hover:text-white z-0 h-[35px]"
                        }
                      `}
                    >
                      {category.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border border-t-0 border-[#800000] rounded-b-lg p-8 bg-white relative z-0 shadow-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {products.length === 0 && (
                  <p className="text-gray-500 text-sm">Tidak ada produk.</p>
                )}

                {products.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-[#800000] rounded shadow-sm overflow-hidden group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-full h-32 flex items-center justify-center bg-gray-50 relative">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.nama}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-gray-300 text-xs font-medium">
                          No Image
                        </span>
                      )}
                    </div>

                    <div className="bg-[#800000] p-3 relative h-auto min-h-[60px]">
                      <div
                        className="absolute top-0 left-0 bg-[#800000] text-white text-[10px] px-4 py-1 font-bold tracking-wider shadow-sm"
                        style={{ ...itemLabelShape, transform: "translateY(-100%)" }}
                      >
                        ITEM
                      </div>

                      <div className="mt-1">
                        <p className="text-white text-xs font-bold">
                          {item.nama}
                        </p>
                        <p className="text-gray-200 text-[10px]">
                          Rp {item.harga.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
