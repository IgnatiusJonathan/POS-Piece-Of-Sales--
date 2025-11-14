"use client";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";




export default function InventoryPage() {

  return (
    <> 
      <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', fontSize: 50 }}>
        <h1 style={{  
            paddingBottom: '70px', 
            color: '#800000',
           
            display: 'flex', 
            alignItems: 'center' 
        }}>
            
            
            <Image 
                src="/images/untar.png" 
                alt="Logo Untarmart" 
                width={90}          
                height={90}          
                style={{ 
                    marginRight: '20px',                   
                    marginTop: '-10px' 
                }}
            />
            UNTARMART
        </h1>

        <div className="grid grid-cols-6 gap-x-8">
  {/* Kolom 1 */}
  <div className="bg-gray-100 p-4 border rounded shadow">
    Kolom 1 
  </div>
  
  {/* Kolom 2 */}
  <div className="bg-gray-100 p-4 border rounded shadow">
    Kolom 2 
  </div>
  
  {/* Kolom 3 */}
  <div className="bg-gray-100 p-4 border rounded shadow">
    Kolom 3 
  </div>
  
  {/* Kolom 4 */}
  <div className="bg-gray-100 p-4 border rounded shadow">
    Kolom 4 
  </div>
  
  {/* Kolom 5 */}
  <div className="bg-gray-100 p-4 border rounded shadow">
    Kolom 5 
  </div>
  
</div>
      
        

       
      </div>
      <Footer /> 
    </> 
  );
}