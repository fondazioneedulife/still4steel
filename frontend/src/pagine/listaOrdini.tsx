import Navbar from '../componenti/Navbar';
import NavFooter from '../componenti/NavFooter';
import Ordine from '../componenti/Ordine';
import SearchBar from '../componenti/SearchBar';
import LeftNavbar from '../componenti/NavbarDesktop';
import { BsPlusCircleFill } from "react-icons/bs";
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Accordion, AccordionItem } from 'react-bootstrap';

interface OrdineData {
    id:number;
    nrOrdine: string;
    dataOrdine: string;
    importo: string;
    fornitore: string;
}
function ListaOrdini(){
    const navigate=useNavigate();
    const [ordini, setOrdini]=useState([]);


    return(
        <div className=''>
            <LeftNavbar>
            <Navbar/>
            <div className='mt-4'>
                <div className="mx-4 poppins-regular">
                    <h3 className='poppins-semibold'>STORICO ORDINI</h3>
                        <div className="d-flex flex-row justify-content-between align-items-center w-100 mb-3">
                            <SearchBar className="w-50"/>
                            <div onClick={()=> navigate('/ordini/nuovo-ordine')} style={{cursor:'pointer'}}>
                                <BsPlusCircleFill size={50}/>
                            </div>
                        </div>
                </div>
                <Ordine nrOrdine={'12345'} fornitore='fornitore1' dataOrdine={'02/20/2023'} importo={'123'} id={0}/>
                <Ordine nrOrdine={'99999'} fornitore='fornitore2' dataOrdine={'02/20/2023'} importo={'123'} id={1}/>
                <Ordine nrOrdine={'00000'} fornitore='fornitore3' dataOrdine={'02/20/2023'} importo={'123'} id={2}/>
                <Ordine nrOrdine={'55555'} fornitore='fornitore4' dataOrdine={'02/20/2023'} importo={'123'} id={3}/>

            </div>
            </LeftNavbar>
            

            {/*VISTA DA MOBILE*/}
            {/* <div className="d-md-none text-center p-3 poppins-regular">
                <h3 className='poppins-semibold'>STORICO ORDINI</h3>
                        <div className="d-flex flex-row justify-content-between align-items-center w-100 mb-3">
                            <SearchBar className="w-50"/>
                            <BsPlusCircleFill size={50}/>
                        </div>
                <div className="rectangles d-flex flex-column">
                <Ordine nrOrdine={'12345'} fornitore='fornitore1' dataOrdine={'02/20/2023'} importo={'123'}/>
                <Ordine nrOrdine={'12345'} fornitore='fornitore1' dataOrdine={'02/20/2023'} importo={'123'}/>
                <Ordine nrOrdine={'12345'} fornitore='fornitore1' dataOrdine={'02/20/2023'} importo={'123'}/>

                </div>
            </div> */}

            {/* Footer Navbar solo su Mobile */}
            <div className="d-md-none">
                <NavFooter />
            </div>
        </div>


        
    )
}

export default ListaOrdini;