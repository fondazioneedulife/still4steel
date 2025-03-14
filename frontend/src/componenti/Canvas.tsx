import React, { useState, useEffect } from "react";
import { Offcanvas, Button, Form } from "react-bootstrap";

function OpenCanvas({ show, handleClose, onAddFornitore, onEditFornitore, fornitoreToEdit }) {
  const [fornitore, setFornitore] = useState({
    nome: "",
    telefono: "",
    email: "",
  });

  // Effettua il pre-popolamento del modulo se c'è un fornitore da modificare
  useEffect(() => {
    if (fornitoreToEdit) {
      setFornitore(fornitoreToEdit);
    }
  }, [fornitoreToEdit]);

  // Aggiorna lo stato quando l'utente scrive nei campi
  const handleChange = (e) => {
    setFornitore({ ...fornitore, [e.target.name]: e.target.value });
  };

  // Gestione del form al submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fornitore.nome.trim() !== "" && fornitore.telefono.trim() !== "" && fornitore.email.trim() !== "") {
      if (fornitoreToEdit) {
        // Se stiamo modificando un fornitore esistente, usiamo onEditFornitore
        onEditFornitore(fornitore);
      } else {
        // Altrimenti, aggiungiamo un nuovo fornitore
        onAddFornitore(fornitore);
      }
      setFornitore({ nome: "", telefono: "", email: "" });
      handleClose(); 
    }
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>{fornitoreToEdit ? "Modifica Fornitore" : "Aggiungi Fornitore"}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nome Fornitore</Form.Label>
            <Form.Control
              type="text"
              name="nome"
              placeholder="Inserisci nome"
              value={fornitore.nome}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Telefono</Form.Label>
            <Form.Control
              type="text"
              name="telefono"
              placeholder="Inserisci numero di telefono"
              value={fornitore.telefono}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Inserisci email"
              value={fornitore.email}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            {fornitoreToEdit ? "Salva Modifiche" : "Salva Fornitore"}
          </Button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OpenCanvas;
