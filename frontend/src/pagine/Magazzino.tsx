import './Magazzino.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componenti/Navbar';
import NavFooter from '../componenti/NavFooter';
import Rectangle from '../componenti/rectangle';
import LeftNavbar from '../componenti/NavbarDesktop';

const Magazzino = () => {
  const navigate = useNavigate();

  return (
    <>
      <LeftNavbar>
        <Navbar />
        <div className="rectangles mb-1 d-flex ">
          <Rectangle titolo="AGGIUNGI PRODOTTO" imgSrc="/addIcon.png" imgHoverSrc="/addIconWhite.png" link='/magazzino/aggiungi-prodotti' />
          <Rectangle titolo="VISUALIZZA PRODOTTI" imgSrc="/productsIcon.png" imgHoverSrc="/productsIconWhite.png" link='/magazzino/lista-prodotti'/>
        </div>
        <div className="rectangles  ">
          <Rectangle titolo="SPEDIZIONI" imgSrc="/shipmentIcon.png" imgHoverSrc="/shipmentIconWhite.png" link='/magazzino/spedizioni'/>
          </div>
      </LeftNavbar>

      {/* Layout per Mobile */}
      {/* <div className="d-md-none text-center p-3">
        <div className="rectangles d-flex flex-column">
            <Rectangle titolo="AGGIUNGI PRODOTTO" imgSrc="/addIcon.png" imgHoverSrc="/addIconWhite.png" link='/magazzino/aggiungi-prodotti' />
            <Rectangle titolo="VISUALIZZA PRODOTTI" imgSrc="/productsIcon.png" imgHoverSrc="/productsIconWhite.png" link='/magazzino/visualizza-prodotti'/>
            <Rectangle titolo="SPEDIZIONI" imgSrc="/shipmentIcon.png" imgHoverSrc="/shipmentIconWhite.png" link='/magazzino/spedizioni'/>
        </div>
      </div> */}

      <div className="d-md-none">
                <NavFooter />
      </div>
      </>
  );
};

export default Magazzino;