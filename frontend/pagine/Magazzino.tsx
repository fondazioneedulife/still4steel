import './Magazzino.css';
import { useNavigate } from 'react-router-dom';
import Navbar from '../src/componenti/Navbar';
import NavFooter from '../src/componenti/NavFooter';
import Rectangle from '../src/componenti/rectangle';
import LeftNavbar from '../src/componenti/NavbarDesktop';
import React from 'react';

const Magazzino = () => {
  const navigate = useNavigate();

  return (
    <>
    <div className="d-none d-md-flex flex-md-column">
      <LeftNavbar>
        <Navbar />
        <div className="rectangles mb-1 d-flex ">
          <Rectangle titolo="AGGIUNGI PRODOTTO" imgSrc="/addIcon.png" imgHoverSrc="/addIconWhite.png" link='/magazzino/aggiungi-prodotti' />
          <Rectangle titolo="VISUALIZZA PRODOTTI" imgSrc="/productsIcon.png" imgHoverSrc="/productsIconWhite.png" link='/magazzino/visualizza-prodotti'/>
        </div>
        <div className="rectangles  ">
          <Rectangle titolo="SPEDIZIONI" imgSrc="/shipmentIcon.png" imgHoverSrc="/shipmentIconWhite.png" link='/magazzino/spedizioni'/>
          </div>
      </LeftNavbar>
    </div>

      {/* Layout per Mobile */}
      <div className="d-md-none text-center p-3">
        <div className="rectangles d-flex flex-column">
            <Rectangle titolo="AGGIUNGI PRODOTTO" imgSrc="/addIcon.png" imgHoverSrc="/addIconWhite.png" link='/magazzino/aggiungi-prodotti' />
            <Rectangle titolo="VISUALIZZA PRODOTTI" imgSrc="/productsIcon.png" imgHoverSrc="/productsIconWhite.png" link='/magazzino/visualizza-prodotti'/>
            <Rectangle titolo="SPEDIZIONI" imgSrc="/shipmentIcon.png" imgHoverSrc="/shipmentIconWhite.png" link='/magazzino/spedizioni'/>
        </div>
      </div>

      <div className="d-md-none">
                <NavFooter />
      </div>
      </>
  );
};

export default Magazzino;