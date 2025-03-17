import { useNavigate } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { Box, Cart, CurrencyDollar, House } from "react-bootstrap-icons";
import { useState, useEffect } from "react";

export default function LeftNavbar({ children }) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const footerItems = [
    { path: "/home", icon: House, label: "Home" },
    { path: "/magazzino", icon: Box, label: "Magazzino" },
    { path: "/ordini", icon: Cart, label: "Ordini" },
  ];

  return (
    <div className="d-flex">
      {/* Navbar laterale visibile solo su desktop */}
      {!isMobile && (
        <div className="leftNavbar col-2 d-flex flex-column border-end p-3 bg-left vh-100">
          <img src="\logoRemoveNero.png" alt="" />
          <hr className="mb-4" />
          {footerItems.map((item, index) => {
            const isActive = item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path);
            return (
              <Nav.Item key={index} className="footer-item">
                <Nav.Link
                  onClick={() => navigate(item.path)}
                  className={`d-flex footer-link flex-row mb-2 p-2 ${isActive ? "active" : ""}`}
                >
                  <div className="icon pe-2">
                    <item.icon size={24} color={isActive ? "white" : "black"} />
                  </div>
                  <div className="label poppins-regular" style={{ color: isActive ? "white" : "black" }}>
                    {item.label}
                  </div>
                </Nav.Link>
              </Nav.Item>
            );
          })}
        </div>
      )}

      {/* Contenuto principale */}
      <div className="col p-3 vh-100" style={{ overflowY: "auto", height: "100vh" }}>
        {children}
      </div>
    </div>
  );
}
