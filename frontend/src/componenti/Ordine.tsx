import { useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
import { Offcanvas } from "react-bootstrap";

interface OrdineProps {
    id: number;
    nrOrdine: string;
    dataOrdine: string;
    importo: string;
    fornitore: string;
    dettagli: string;
}

const Ordine: React.FC<OrdineProps> = ({ id, nrOrdine, fornitore, dataOrdine, importo, dettagli }) => {
    const [show, setShow] = useState(false);

    return (
        <div className="poppins-regular">
            <div 
                className="card mb-3 mt-2 mx-4" 
                style={{ borderRadius: "25px", border: "2px solid lightgrey", cursor: "pointer" }}
                onClick={() => setShow(true)}
            >
                <div className="card-body d-flex justify-content-between">
                    <div className="left">
                        <p><b>Ordine #{nrOrdine}</b></p>
                        <p style={{ color: "grey" }}>{fornitore}</p>
                        <p style={{ color: "grey" }}>{dataOrdine}</p>
                    </div>
                    <div className="right d-flex flex-column align-items-end justify-content-between">
                        <MdOutlineExpandMore size={30} style={{ transform: 'rotate(-90deg)' }} />
                        <p><b>Importo: €{importo} </b></p>
                    </div>
                </div>
            </div>

            <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Dettagli Ordine #{nrOrdine}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <p><b>Fornitore:</b> {fornitore}</p>
                    <p><b>Data Ordine:</b> {dataOrdine}</p>
                    <p><b>Importo:</b> €{importo}</p>
                    <p><b>Dettagli:</b> {dettagli}</p>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    );
};

export default Ordine;
