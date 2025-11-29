"use client";
import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);  // Explicitly type as boolean

  const toggleNavbar = () => setIsCollapsed(!isCollapsed);

  return (
    <aside className={`navbar ${isCollapsed ? 'collapsed' : ''}`} id="navbar">
      <button className="toggle-btn" id="toggleBtn" onClick={toggleNavbar}></button>
      <ul>
        <li><Link href="../dashboard" data-title="Dashboard">Dashboard</Link></li>
        <li><Link href="../inventory" data-title="Inventory">Inventory</Link></li>
        <li><Link href="../membership" data-title="Membership">Membership</Link></li>
        <li><Link href="../history" data-title="History">History</Link></li>
        <li><Link href="../checkouts" data-title="Checkouts">Checkouts</Link></li>
      </ul>
    </aside>
  );
};

export default Navbar;
