import './Navbar.css';
import { Gear, Bell } from 'react-bootstrap-icons';
import { useState } from 'react';

const Navbar = () => {
  const [hasNotification, setHasNotification] = useState(true);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Icona notifiche con badge */}
        <div className="navbar-icon left">
          <div className="notification-wrapper">
            <Bell size={28} className="bell-icon" />
            {hasNotification && <span className="notification-badge"></span>}
          </div>
        </div>
        <div className="navbar-logo logo">
          <img src="/media/img/MEMO-LOGO.svg" alt="Logo" />
        </div>
        <div className="navbar-icon right">
          <Gear size={28} className="gear-icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
