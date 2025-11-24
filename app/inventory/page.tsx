"use client";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function InventoryPage() {

  return (
    <>
      <Header />

       
        <div className=" box grid grid-cols-4 gap-6 mt-6">
          
        
          
         
          <div className="bg-white border-1 border-red-900 rounded shadow overflow-hidden">
            
        
            <div className="w-full h-48 flex items-center justify-center overflow-hidden"> 
              <Image 
                  src="/images/chitato.png" 
                  alt="Gambar Produk" 
                  width={130} 
                  height={130}
              />
            </div>

          
            <div className="column-desc bg-[#800000] p-3 relative">
           <a 
      href="#" 
      className="absolute top-0 left-0 text-white text-sm px-3 py-1 font-semibold"
      style={{
   
        clipPath: 'polygon(0% 100%, 100% 100%, 90% 0%, 0% 0%)', 
        backgroundColor: '#800000', 
        transform: 'translateY(-100%)'
      }}
    >
      ITEM
    </a>
          
              <h3 className="text-xl font-bold text-white mb-1">
                  chitato
              </h3>
              <p className="text-base text-white">
                  Stok: 50
              </p>
              <p className="text-lg font-semibold text-white">
                  Rp 10.000
              </p>

            
              <button 
  className="mt-3 w-full bg-white text-[#800000] py-3 rounded text-md transition duration-100 border-3 border-[#800000] hover:bg-[#800000] hover:text-white"
  style={{ 
    fontFamily: 'Roboto, sans-serif', 
    fontSize: '18px', 
    borderRadius:'7px',
    fontWeight: 300
  }}>
                  Lihat Detail
              </button>
            </div>
           </div>
        </div> 
      
      
      <Footer /> 
    </>
  );
}