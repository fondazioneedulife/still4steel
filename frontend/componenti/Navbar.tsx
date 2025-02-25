import React from 'react';
import './Navbar.css';
import { Gear } from 'react-bootstrap-icons';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo centrato */}
      <div className="navbar-logo">
        <img src="/path/to/logo.png" alt="Logo" />
      </div>

      {/* Icona dell'ingranaggio a destra */}
      <div className="navbar-icon">
        <Gear size={24} />
      </div>
    </nav>
  );
};

export default Navbar;
