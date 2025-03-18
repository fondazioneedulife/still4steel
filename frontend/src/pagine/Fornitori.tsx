import { Button } from "react-bootstrap";
import Navbar from "../componenti/Navbar";
import FooterNavbar from '../componenti/NavFooter';
import React, { useState, useEffect } from "react";
import OpenCanvas from "../componenti/Canvas";
import Fornitore from "../componenti/Fornitore";
import LeftNavbar from "../componenti/NavbarDesktop";
import NavFooter from "../componenti/NavFooter";
import { BsPlusCircleFill } from "react-icons/bs";

function Fornitori() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [fornitori, setFornitori] = useState([]);
  const [fornitoreToEdit, setFornitoreToEdit] = useState(null);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/suppliers");
        const data = await response.json();
        console.log("Dati ricevuti:", data); // 🔥 Debug per vedere se ricevi tutti i campi
        setFornitori(data); // Memorizza l'intero oggetto, non solo il nome!
      } catch (error) {
        console.error("Errore nel recupero dei fornitori:", error);
      }
    };
  
    fetchSuppliers();
  }, []);

  // Funzione per aggiungere un nuovo fornitore
  const handleAddFornitore = (nuovoFornitore) => {
    setFornitori([...fornitori, nuovoFornitore]);
    setShowCanvas(false);
  };

  // Funzione per modificare un fornitore
  const handleEditFornitore = (modificatoFornitore) => {
    const updatedFornitori = fornitori.map((fornitore) =>
      fornitore === fornitoreToEdit ? modificatoFornitore : fornitore
    );
    setFornitori(updatedFornitori);
    setShowCanvas(false);
    setFornitoreToEdit(null);
  };

  // Funzione per eliminare un fornitore
  const handleDeleteFornitore = (index) => {
    setFornitori(fornitori.filter((_, i) => i !== index));
  };

  // Funzione per avviare la modifica di un fornitore
  const handleEditButtonClick = (index) => {
    setFornitoreToEdit(fornitori[index]);
    setShowCanvas(true);
  };

  return (
    <div>
      <LeftNavbar>
        <Navbar />
        <div className="d-flex justify-content-between p-4">
          <h3 className='poppins-semibold'>FORNITORI</h3>
          <Button onClick={() => setShowCanvas(true)}>Aggiungi Fornitore</Button>
        </div>
        <OpenCanvas
          show={showCanvas}
          handleClose={() => {
            setShowCanvas(false);
            setFornitoreToEdit(null); // Reset dello stato quando chiudi il canvas
          }}
          onAddFornitore={handleAddFornitore}
          onEditFornitore={handleEditFornitore}
          fornitoreToEdit={fornitoreToEdit}
        />
        {fornitori.map((fornitore, index) => (
          <div key={index} className="list-group-item">
            <Fornitore
              nome={fornitore.nome}
              email={fornitore.email}
              telefono={fornitore.telefono}
              imgSrc={fornitore.imgSrc}
              onDelete={() => handleDeleteFornitore(index)}
              onEdit={() => handleEditButtonClick(index)} 
            />
          </div>
        ))}
      </LeftNavbar>

      <div className="d-md-none">
        <NavFooter />
      </div>
    </div>
  );
}

export default Fornitori;