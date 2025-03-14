import { Button } from "react-bootstrap";
import Navbar from "../src/componenti/Navbar";
import FooterNavbar from '../src/componenti/NavFooter';
import React, { useState } from "react";
import OpenCanvas from "../src/componenti/Canvas";
import Fornitore from "../src/componenti/Fornitore";
import LeftNavbar from "../src/componenti/NavbarDesktop";
import NavFooter from "../src/componenti/NavFooter";
import { BsPlusCircleFill } from "react-icons/bs";

function Fornitori() {
  const [showCanvas, setShowCanvas] = useState(false);
  const [fornitori, setFornitori] = useState([
    { nome: "Fornitore 1", telefono: "123456789", email: "forn1@email.com", imgSrc:'../public/fornitore1.png' },
    { nome: "Fornitore 2", telefono: "987654321", email: "forn2@email.com", imgSrc:'../public/fornitore2.png'  },
  ]);
  const [fornitoreToEdit, setFornitoreToEdit] = useState(null);

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
