"use client"
import React from "react";
import Image from "next/image";

export default function header(){
   return(
    
          <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', fontSize: '50px' }}> 
            
          
            <h1 style={{ 
                paddingBottom: '40px', 
                color: '#800000',
                borderBottom: '1px solid #800000',
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
    </div>

   );
}