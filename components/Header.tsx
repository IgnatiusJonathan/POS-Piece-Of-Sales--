"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [role, setRole] = useState<string | null>(null);  // Define role as string or null

  useEffect(() => {
    const savedRole = localStorage.getItem('role');
    setRole(savedRole);
  }, []);

  const getRoleText = () => {
    if (role === 'admin') return 'Admin ▼';
    if (role) return `${role.charAt(0).toUpperCase() + role.slice(1)} ▼`;
    return 'Cashier ▼';
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1><span className="brand">TARUMART</span> <span className="tagline">Kasir</span></h1>
      </div>
      <div className="header-right">
        <div className="employee-login" id="profileMenu">
          <span className="cashier-name">{getRoleText()}</span>
          <div className="profile-icon">👤</div>
        </div>

        {/* Dropdown logout */}
        <div className="dropdown" id="dropdownMenu">
          <Link href="../login.html">
            <img src="../img/logout.png" alt="Logout" className="dropdown-icon" />
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;