"use client"
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
}