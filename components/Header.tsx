"use client"
<<<<<<< HEAD
import Image from "next/image";

export default function Header(){
    return(
        <header className="header">
            <div className="header-left">
                <h1><span className="brand">TARUMART</span> <span className="tagline">Kasir</span></h1>
            </div>
        <div className="header-right">
            <div className="employee-login" id="profileMenu">
                <span className="cashier-name">Cashier Name ▼</span>
                <div className="profile-icon">👤</div>
        </div>

        {/* Dropdown logout*/}
        <div className="dropdown" id="dropdownMenu">
            <a href="../login.html">
                <Image src="/images/test" alt="logout"></Image>
                Logout
            </a>
        </div>
        </div>
    </header>
    )
=======
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
>>>>>>> b1378d8e560ea5b22bff11c7ec2761d10003aaff
}