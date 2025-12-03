"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [name, setName] = useState<string | null>(null);  // Define role as string or null
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const savedName = localStorage.getItem('nama');
    setName(savedName);
  }, []);

  const getNameText = () => {
    if (name === 'admin') return 'Admin ▼';
    if (name) return `${name.charAt(0).toUpperCase() + name.slice(1)} ▼`;
    return 'Cashier ▼';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1><span className="brand">TARUMART</span> <span className="tagline">Kasir</span></h1>
      </div>
      <div className="header-right">
        <div className="employee-login" id="profileMenu" onClick={toggleDropdown}>
          <span className="cashier-name">{getNameText()}</span>
          <div className="profile-icon">👤</div>
        </div>

        {/* Dropdown logout */}
        <div className={`dropdown ${isDropdownOpen ? 'show' : ''}`} id="dropdownMenu">
          <Link href="/login">
            <img src="../img/logout.png" alt="Logout" className="dropdown-icon" />
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
