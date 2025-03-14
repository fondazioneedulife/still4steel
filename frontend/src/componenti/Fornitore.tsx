import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

interface FornitoreProps {
  nome: string;
  email: string;
  telefono: string;
  imgSrc: string;
  onDelete: () => void;
  onEdit: () => void;  // Nuovo prop per la funzione di modifica
}

const Fornitore: React.FC<FornitoreProps> = ({ nome, email, telefono, imgSrc, onDelete, onEdit }) => {
  return (
    <div className="card mb-3 mt-2 mx-4 poppins-regular">
      
      <div className="card-body d-flex">
        <img src={imgSrc} alt="" style={{width:'82px', height:'82px'}}/>
        <div className="info ms-5">
          <p>{nome}</p>
          <p>✉️ {email}</p>
          <p>📞 {telefono}</p>
        </div>
      </div>
      <div className="card-footer d-flex g-5">
        <Button variant="danger" onClick={onDelete}>Elimina</Button>
        <Button variant="primary" className="ms-2" onClick={onEdit}><FaEdit size={22}/> Modifica</Button> {/* Bottone Modifica */}
      </div>
    </div>
  );
}

export default Fornitore;
