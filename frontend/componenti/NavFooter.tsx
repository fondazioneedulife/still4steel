import { Nav } from 'react-bootstrap';
import { House, Box, Cart, Calendar, CurrencyDollar } from 'react-bootstrap-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import './NavFooter.css';
import React from 'react';
const NavFooter: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Lista delle voci del footer
  const footerItems = [
    { path: '/vendite', icon: <CurrencyDollar size={24} />, label: 'Vendite' },
    { path: '/magazzino', icon: <Box size={24} />, label: 'Magazzino' },
    { path: '/', icon: <House size={24} />, label: 'Home' },
    { path: '/ordini', icon: <Cart size={24} />, label: 'Ordini' },
    { path: '/calendario', icon: <Calendar size={24} />, label: 'Calendario' },
  ];

  return (
    <footer className="footer">
      <Nav className="footer-nav">
        {footerItems.map((item, index) => (
          <Nav.Item key={index} className="footer-item">
            <Nav.Link
              onClick={() => navigate(item.path)}
              className={`footer-link ${location.pathname === item.path ? 'active' : ''}`}
            >
              <div className="footer-icon">{item.icon}</div>
              <div className="footer-label">{item.label}</div>
            </Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
    </footer>
  );
};

export default NavFooter;