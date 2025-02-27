import './Magazzino.css';
import { useNavigate } from 'react-router-dom';

const Magazzino = () => {
  const navigate = useNavigate();

  return (
    <div className="magazzino-page">
      <div className="rectangle-container">
        <div className="rectangle" onClick={() => navigate('/aggiungi-prodotti')}>
          <img src="/media/img/Agg-prodotti.svg" alt="Logo" className="rectangle-logo" />
          <h3 className="rectangle-title">Aggiungi Prodotti</h3>
        </div>
        <div className="rectangle" onClick={() => navigate('/lista-prodotti')}>
          <img src="/media/img/Lista-Prodotti.svg" alt="Logo" className="rectangle-logo" />
          <h3 className="rectangle-title">Visualizza Prodotti</h3>
        </div>
        <div className="rectangle" onClick={() => navigate('/spedizioni')}>
          <img src="/media/img/Spedizioni.svg" alt="Logo" className="rectangle-logo" />
          <h3 className="rectangle-title">Spedizioni</h3>
        </div>
      </div>
    </div>
  );
};

export default Magazzino;