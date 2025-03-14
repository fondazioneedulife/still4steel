import Navbar from '../src/componenti/Navbar';
import NavFooter from '../src/componenti/NavFooter';
import Rectangle from '../src/componenti/rectangle';
import LeftNavbar from '../src/componenti/NavbarDesktop';
import React  from 'react';
function Ordini() {
    return (
        <div>
                <LeftNavbar>
                    <Navbar />
                    <div className="rectangles mb-1 d-flex flex-column flex-md-row ">
                        <Rectangle titolo="NUOVO ORDINE" imgSrc="/iconOrdini.png" imgHoverSrc="/iconOrdiniWhite.png" link='/ordini/nuovo-ordine' />
                        <Rectangle titolo="ORDINI" imgSrc="/iconLista.png" imgHoverSrc="/iconListaWhite.png" link='lista-ordini'/>
                    </div>
                    <div className="rectangles mb-5 d-flex flex-column flex-md-row">
                        <Rectangle titolo="FATTURE" imgSrc="/iconFatture.png" imgHoverSrc="/iconFattureWhite.png" link='#'/>
                        <Rectangle titolo="FORNITORI" imgSrc="/iconFornitori.png" imgHoverSrc="/iconFornitoriWhite.png" link='fornitori'/>
                    </div>
                </LeftNavbar>

            {/* Layout per Mobile */}
            {/* <div className="d-md-none text-center p-3">
                <div className="rectangles d-flex flex-column">
                    <Rectangle titolo="NUOVO ORDINE" imgSrc="/iconOrdini.png" imgHoverSrc="/iconOrdiniWhite.png" link='/ordini/nuovo-ordine' />
                    <Rectangle titolo="ORDINI" imgSrc="/iconLista.png" imgHoverSrc="/iconListaWhite.png" link='/ordini/lista-ordini'/>
                    <Rectangle titolo="FATTURE" imgSrc="/iconFatture.png" imgHoverSrc="/iconFattureWhite.png" link='#'/>
                    <Rectangle titolo="FORNITORI" imgSrc="/iconFornitori.png" imgHoverSrc="/iconFornitoriWhite.png" link='/ordini/fornitori'/>
                </div>
            </div> */}

            {/* Footer Navbar solo su Mobile */}
            <div className="d-md-none">
                <NavFooter />
            </div>
        </div>
    );
}

export default Ordini;
