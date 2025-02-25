import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AggiungiProdotti from '../pagine/AggiungiProdotti';
import Magazzino from '../pagine/Magazzino'; 
import SecondaSottopagina from '../pagine/SecondaSottopagina';
import TerzaSottopagina from '../pagine/TerzaSottopagina';
import Riepilogo from '../pagine/Riepilogo'
import Navbar from '../componenti/Navbar';
import QuintaSottopagina from '../pagine/QuintaSottopagina';
import NavFooter from '../componenti/NavFooter'
import VisualizaProdotti from '../pagine/VisuaizzaProdotti'
import DettagliSpedizioni from '../pagine/DettagliSpedizione'
import Spedzioni from '../pagine/Spedizioni'
import './App.css';
function App() {
    return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" />
          <Route path="/magazzino" element= {<Magazzino/>}/>
          <Route path="/aggiungi-prodotti" element={<AggiungiProdotti />} />
          <Route path="/seconda-sottopagina" element={<SecondaSottopagina />} />
          <Route path="/terza-sottopagina" element={<TerzaSottopagina />} />
          <Route path="/riepilogo" element={<Riepilogo />} />
          <Route path="/quinta-sottopagina" element={<QuintaSottopagina />} />
          <Route path='/visualizza-prodotti' element={<VisualizaProdotti/>} />
          <Route path="/spedizioni" element={<Spedzioni />} />
          <Route path="/dettagli-spedizione" element={<DettagliSpedizioni />}/>
        </Routes>
        <NavFooter/>
      </Router>
    );
  }
  
  


export default App;