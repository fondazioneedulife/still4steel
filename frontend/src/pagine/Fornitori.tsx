import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import Navbar from "../componenti/Navbar";
import FooterNavbar from "../componenti/NavFooter";
import OpenCanvas from "../componenti/Canvas";
import Fornitore from "../componenti/Fornitore";
import LeftNavbar from "../componenti/NavbarDesktop";
import NavFooter from "../componenti/NavFooter";

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
  

  const handleAddFornitore = async (nuovoFornitore) => {
    try {
      const response = await fetch("http://localhost:3001/api/suppliers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuovoFornitore),
      });
  
      if (!response.ok) {
        throw new Error("Errore durante la creazione del fornitore");
      }
  
      const createdFornitore = await response.json();
      setFornitori([...fornitori, createdFornitore]); // Aggiorna la lista con il nuovo fornitore
      setShowCanvas(false); // Chiudi il form
    } catch (error) {
      console.error("Errore nell'aggiunta del fornitore:", error);
    }
  };
  
  // Funzione per modificare un fornitore
  const handleEditFornitore = async (modificatoFornitore) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/suppliers/${modificatoFornitore.supplier_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(modificatoFornitore),
        }
      );
  
      if (!response.ok) {
        throw new Error("Errore durante la modifica del fornitore");
      }
  
      const updatedFornitore = await response.json();
      setFornitori(
        fornitori.map((fornitore) =>
          fornitore.supplier_id === updatedFornitore.supplier_id
            ? updatedFornitore
            : fornitore
        )
      );
      setShowCanvas(false); // Chiudi il form
      setFornitoreToEdit(null);
    } catch (error) {
      console.error("Errore nell'aggiornamento del fornitore:", error);
    }
  };
  

  const handleDeleteFornitore = async (fornitoreId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/suppliers/${fornitoreId}`,
        {
          method: "DELETE",
        }
      );
  
      if (!response.ok) {
        throw new Error("Errore durante l'eliminazione del fornitore");
      }
  
      setFornitori(fornitori.filter((fornitore) => fornitore.supplier_id !== fornitoreId));
    } catch (error) {
      console.error("Errore nell'eliminazione del fornitore:", error);
    }
  };
  

  // Funzione per aprire il form di modifica
  const handleEditButtonClick = (fornitore) => {
    setFornitoreToEdit(fornitore);
    setShowCanvas(true);
  };

  return (
    <div>
      <LeftNavbar>
        <Navbar />
        <div className="d-flex justify-content-between p-4">
          <h3 className="poppins-semibold">FORNITORI</h3>
          <Button onClick={() => setShowCanvas(true)}>Aggiungi Fornitore</Button>
        </div>

        <OpenCanvas
          show={showCanvas}
          handleClose={() => {
            setShowCanvas(false);
            setFornitoreToEdit(null);
          }}
          onAddFornitore={handleAddFornitore}
          onEditFornitore={handleEditFornitore}
          fornitoreToEdit={fornitoreToEdit}
        />

        <div className="list-group">
        {fornitori.map((fornitore, index) => (
          <div key={index} className="list-group-item">
            <Fornitore
              nome={fornitore.first_name}  // Cambia `nome` in `first_name`
              cognome={fornitore.last_name}  // Cambia `cognome` in `last_name`
              email={fornitore.email}
              telefono={fornitore.phone}
              onDelete={() => handleDeleteFornitore(index)}
              onEdit={() => handleEditButtonClick(index)}
            />
          </div>
        ))}
        </div>
      </LeftNavbar>

      <div className="d-md-none">
        <NavFooter />
      </div>
    </div>
  );
}

export default Fornitori;