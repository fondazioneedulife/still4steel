import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AggiungiProdotti from '../pagine/AggiungiProdotti';
import Magazzino from '../pagine/Magazzino'; 
import SecondaSottopagina from '../pagine/SecondaSottopagina';
import TerzaSottopagina from '../pagine/TerzaSottopagina';
import Riepilogo from '../pagine/Riepilogo'
import QuintaSottopagina from '../pagine/QuintaSottopagina';
import NavFooter from '../componenti/NavFooter';
import DettagliSpedizioni from '../pagine/DettagliSpedizione';
import Spedzioni from '../pagine/Spedizioni';
import ListaProdotti from '../pagine/ListaProdotti';
import DettagliProdotto from '../pagine/DettagliProdotto';
import Home from '../pagine/Home';
import './App.css';
import CustomNavbar from '../componenti/Navbar';
import ImportaSpedizioni from '../pagine/ImportaSpedizioni';
import Varianti from '../pagine/Varianti';
import { ProductProvider } from '../pagine/ContestoProdotto';
function App() {
    return (
      <ProductProvider>
      <Router>
        <CustomNavbar/>
        <Routes>
        <Route path="/" element={<Home />}  />
          <Route path="/home" element={<Home />} />
          <Route path="/magazzino" element= {<Magazzino/>}/>
          <Route path="/aggiungi-prodotti" element={<AggiungiProdotti />} />
          <Route path="/seconda-sottopagina" element={<SecondaSottopagina />} />
          <Route path="/terza-sottopagina" element={<TerzaSottopagina />} />
          <Route path="/riepilogo" element={<Riepilogo />} />
          <Route path="/quinta-sottopagina" element={<QuintaSottopagina />} />
          <Route path='/lista-prodotti' element={<ListaProdotti />} />
          <Route path="/spedizioni" element={<Spedzioni />} />
          <Route path="/dettagli-spedizione" element={<DettagliSpedizioni />}/>
          <Route path="/dettagli-prodotto" element={<DettagliProdotto />} />
          <Route path='/importa-spedizioni' element={<ImportaSpedizioni />} />
          <Route path='/varianti' element={<Varianti />} />
        </Routes>
        <NavFooter/>
      </Router>
      </ProductProvider>
    );
  }
  
  


export default App;