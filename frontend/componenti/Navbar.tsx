import React, { useState } from "react";
import { Container, Navbar, Nav, Dropdown, Form } from "react-bootstrap";
import {
  Bell,
  Person,
  Gear,
  Envelope,
  Moon,
  Sun,
  Lock,
  BoxArrowRight,
  Palette,
  TextLeft,
  Globe,
  ShieldLock,
} from "react-bootstrap-icons";
import "./Navbar.css"; // File CSS personalizzato

const CustomNavbar = () => {
  const [hasNotification, setHasNotification] = useState(true);
  const [darkMode, setDarkMode] = useState(false); // Stato per il tema scuro
  const [notificationsEnabled, setNotificationsEnabled] = useState(true); // Stato per le notifiche

  // Funzione per cambiare il tema
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Applica il tema scuro/chiaro al corpo del documento
    document.body.classList.toggle("dark-mode", !darkMode);
  };

  // Funzione per attivare/disattivare le notifiche
  const handleNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // Qui puoi aggiungere la logica per attivare/disattivare le notifiche
    console.log("Notifiche:", notificationsEnabled ? "Disattivate" : "Attivate");
  };

  // Funzione per il logout
  const handleLogout = () => {
    // Qui puoi aggiungere la logica per il logout
    console.log("Logout effettuato");
  };

  return (
    <Navbar  className="custom-navbar">
      <Container fluid>
        {/* Icona Campanella (Sinistra) */}
        <Nav>
          <div className="notification-icon">
            <Bell size={24} className="icon" />
            {hasNotification && <span className="notification-badge"></span>}
          </div>
        </Nav>

        {/* Icona Centrale (Centro) */}
        <Navbar.Brand className="flex-grow-1 text-center">
          <img
            src="/media/img/MEMO-LOGO.svg" // Sostituisci con il percorso del tuo logo
            alt="Logo"
            className="navbar-logo"
          />
        </Navbar.Brand>

        {/* Icona Utente (Destra) */}
        <Nav>
          <Dropdown align="end">
            <Dropdown.Toggle variant="link" id="dropdown-user" className="p-0">
              <Person size={24} className="icon" />
            </Dropdown.Toggle>

            <Dropdown.Menu className="user-dropdown">
              {/* Sezione Account */}
              <Dropdown.Header>
                <Person className="me-2" />
                Account
              </Dropdown.Header>
              <Dropdown.Item>
                <Gear className="me-2" />
                Gestione Account
              </Dropdown.Item>
              <Dropdown.Item onClick={handleLogout}>
                <BoxArrowRight className="me-2" />
                Logout
              </Dropdown.Item>

              <Dropdown.Divider />

              {/* Sezione Notifiche */}
              <Dropdown.Header>
                <Bell className="me-2" />
                Notifiche
              </Dropdown.Header>
              <Dropdown.Item>
                <Form.Check
                  type="switch"
                  id="notification-switch"
                  label="Attiva Notifiche"
                  checked={notificationsEnabled}
                  onChange={handleNotificationsToggle}
                />
              </Dropdown.Item>
              <Dropdown.Item>
                <Envelope className="me-2" />
                Modalità di Ricezione
              </Dropdown.Item>
              <Dropdown.Item>
                <Bell className="me-2" />
                Silenzia Notifiche
              </Dropdown.Item>

              <Dropdown.Divider />

              {/* Sezione Preferenze */}
              <Dropdown.Header>
                <Palette className="me-2" />
                Preferenze
              </Dropdown.Header>
              <Dropdown.Item onClick={handleDarkModeToggle}>
                {darkMode ? (
                  <Moon className="me-2" />
                ) : (
                  <Sun className="me-2" />
                )}
                {darkMode ? "Tema Scuro" : "Tema Chiaro"}
              </Dropdown.Item>
              <Dropdown.Item>
                <TextLeft className="me-2" />
                Dimensione Testo
              </Dropdown.Item>
              <Dropdown.Item>
                <Globe className="me-2" />
                Lingua e Regione
              </Dropdown.Item>

              <Dropdown.Divider />

              {/* Sezione Sicurezza */}
              <Dropdown.Header>
                <ShieldLock className="me-2" />
                Sicurezza
              </Dropdown.Header>
              <Dropdown.Item>
                <Lock className="me-2" />
                Cambia Password
              </Dropdown.Item>
              <Dropdown.Item>
                <ShieldLock className="me-2" />
                Autenticazione a Due Fattori
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;