import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { Box, Calendar, Cart, CurrencyDollar, House } from "react-bootstrap-icons";
import { useNavigate, useLocation } from "react-router-dom";
import './NavFooter.css';

function FooterNavbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const location = useLocation(); // Ottieni il percorso attuale

  const footerItems = [
    { path: '/home', icon: House, label: "Home" },
    { path: '/magazzino', icon: Box, label: "Magazz." },
    { path: '/ordini', icon: Cart, label: "Ordini" },
    { path: '/vendite', icon: CurrencyDollar, label: "Vendite" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <footer className={`fixed-bottom bg-white border-top border-3 border-black text-center transition ${isVisible ? "visible" : "invisible"}`}>
      <Nav className="footer-nav d-flex justify-content-evenly flex-nowrap">
        {footerItems.map((item, index) => {
          const isActive = item.path === '/' ? location.pathname === '/' : location.pathname.startsWith(item.path);
          return (
            <Nav.Item key={index} className="footer-item">
              <Nav.Link
                onClick={() => navigate(item.path)}
                className={`d-flex flex-column px-1 footer-link ${isActive ? 'active' : ''}`}>
                <div className="footer-icon">
                  <item.icon size={24} color={isActive ? "white" : "black"} />  {/* Icona con colore dinamico */}
                </div>
                <div className="footer-label poppins-regular" style={{ color: isActive ? "white" : "black" }}>
                  {item.label}
                </div>
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </footer>
  );
}

export default FooterNavbar;
