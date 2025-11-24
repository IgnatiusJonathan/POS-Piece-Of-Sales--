"use client";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Header from "@/components/Header";


export default function addItemPage() {

  return (
    <>
< Header/>
 <button 
  className="button_add_item mt-1  bg-[#800000] py-3 rounded text-md transition duration-
  100  border-[#800000] hover:bg-[#800000] hover:text-white width:40px height:10px"
  style={{ 
    fontFamily: 'Roboto, sans-serif', 
    fontSize: '18px', 
    borderRadius:'7px',
    fontWeight: 300,
    width:'100px',
    color:'white'    
  }}>
                  tambah item
              </button>
 <Footer /> 
    </>
  );
}