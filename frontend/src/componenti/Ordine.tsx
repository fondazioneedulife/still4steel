import { BiBorderRadius } from "react-icons/bi";
import { MdOutlineExpandMore } from "react-icons/md";
import { Accordion } from "react-bootstrap";

interface OrdineProps {
    id:number;
    nrOrdine: string;
    dataOrdine: string;
    importo: string;
    fornitore: string;
}

const Ordine: React.FC<OrdineProps> = ({ id, nrOrdine, fornitore, dataOrdine, importo }) => {
    return(
        <div className="poppins-regular">
            {/* <div className="card mb-3 mt-2 mx-4" style={{borderRadius:"25px", border:"2px solid lightgrey"}}>
            <div className="card-body d-flex justify-content-between" >
                <div className="left">
                    
                    <p><b>Ordine #{nrOrdine}</b></p>
                    <p style={{color:"grey"}}>{fornitore}</p>
                    <p style={{color:"grey"}}>{dataOrdine}</p>
                </div>
                <div className="right d-flex flex-column align-items-end justify-content-between">
                    <MdOutlineExpandMore size={30} style={{ transform: 'rotate(-90deg)' }}/>
                    <p ><b>Importo: €{importo} </b></p>
                </div>
            </div>
            </div> */}

            <Accordion.Item eventKey={id.toString()}>  {/* eventKey identifica univocamente ogni item */}
            <Accordion.Header>
                <b>Ordine #{nrOrdine}</b> - {fornitore}
            </Accordion.Header>
            <Accordion.Body>
                <p><b>Data:</b> {dataOrdine}</p>
                <p><b>Importo:</b> €{importo}</p>
                {/* <p><b>Dettagli:</b> {dettagli}</p> */}
            </Accordion.Body>
            </Accordion.Item>
        </div>
    )
}

export default Ordine;