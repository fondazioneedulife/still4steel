import { useState, useEffect } from "react";
import { Card, CardBody } from "react-bootstrap";
import { Button } from "react-bootstrap";
// import { useRouter } from "next/router";
import LeftNavbar from "../componenti/NavbarDesktop";
import NavFooter from "../componenti/NavFooter";
import NavBar from "../componenti/NavBar";
import React from "react";

export default function NuovoOrdine() {
  const [fornitori, setFornitori] = useState([]);
  const [prodotti, setProdotti] = useState([]);
  const [fornitoreSelezionato, setFornitoreSelezionato] = useState(null);
//   const router = useRouter();

  useEffect(() => {
    fetch("http://localhost:3000/api/fornitori")
      .then((res) => res.json())
      .then((data) => setFornitori(data));
  }, []);

  const selezionaFornitore = (id) => {
    setFornitoreSelezionato(id);
    fetch(`http://localhost:3000/api/fornitori/${id}/prodotti`)
      .then((res) => res.json())
      .then((data) => setProdotti(data));
  };

  return (
    <LeftNavbar>
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Seleziona un Fornitore</h1>
      {!fornitoreSelezionato ? (
        <div className="grid gap-4">
          {fornitori.map((fornitore) => (
            <Card
              key={fornitore.id}
              className="p-4 cursor-pointer"
              onClick={() => selezionaFornitore(fornitore.id)}
            >
              <CardBody>{fornitore.nome}</CardBody>
            </Card>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-2">Prodotti disponibili</h2>
          <div className="grid gap-4">
            {prodotti.map((prodotto) => (
              <Card key={prodotto.id} className="p-4">
                <CardBody>
                  {prodotto.nome} - €{prodotto.prezzo}
                </CardBody>
              </Card>
            ))}
          </div>
          <Button className="mt-4" onClick={() => setFornitoreSelezionato(null)}>
            Torna ai fornitori
          </Button>
        </div>
      )}
    </div>
    <div className="d-md-none">
                <NavFooter />
            </div>
    </LeftNavbar>
    
  );
}