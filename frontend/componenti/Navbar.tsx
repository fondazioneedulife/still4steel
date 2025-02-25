import './Navbar.css';
import { Gear, Bell } from 'react-bootstrap-icons';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Icona notifiche */}
        <div className="navbar-icon left">
          <Bell size={28} className="bell-icon" />
        </div>

        {/* Logo centrato */}
        <div className="navbar-logo">
          <img src="/path/to/logo.png" alt="Logo" />
        </div>

        {/* Icona impostazioni */}
        <div className="navbar-icon right">
          <Gear size={28} className="gear-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;