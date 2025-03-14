import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AggiungiProdotti from '../pagine/AggiungiProdotti';
import Magazzino from '../pagine/Magazzino'; 
import SecondaSottopagina from '../pagine/SecondaSottopagina';
import TerzaSottopagina from '../pagine/TerzaSottopagina';
import Riepilogo from '../pagine/Riepilogo'
import Navbar from './componenti/Navbar';
import QuintaSottopagina from '../pagine/QuintaSottopagina';
import NavFooter from './componenti/NavFooter'
import VisualizaProdotti from '../pagine/VisuaizzaProdotti'
import DettagliSpedizioni from '../pagine/DettagliSpedizione'
import Spedzioni from '../pagine/Spedizioni'
import Login from './routes/login'
import Register from './routes/register'
import NewPsw from './routes/newPassword'
import { Root } from './routes/root';
import BeforeLogin from '../pagine/LoadingPage';
import Ordini from '../pagine/Ordini';
import Fornitori from '../pagine/Fornitori';
import ListaOrdini from '../pagine/ListaOrdini';
import NuovoOrdine from '../pagine/NuovoOrdine';
import './App.css';
function App() {
    return (
      <Router>
        <Routes>
          <Route path="/" />
          <Route index element={<Root />}/>
          <Route path="/magazzino" element= {<Magazzino/>}/>
          <Route path="/magazzino/aggiungi-prodotti" element={<AggiungiProdotti />} />
          <Route path="/magazzino/seconda-sottopagina" element={<SecondaSottopagina />} />
          <Route path="/magazzino/terza-sottopagina" element={<TerzaSottopagina />} />
          <Route path="/magazzino/riepilogo" element={<Riepilogo />} />
          <Route path="/magazzino/quinta-sottopagina" element={<QuintaSottopagina />} />
          <Route path='/magazzino/visualizza-prodotti' element={<VisualizaProdotti/>} />
          <Route path="/magazzino/spedizioni" element={<Spedzioni />} />
          <Route path="/magazzino/dettagli-spedizione" element={<DettagliSpedizioni />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/change-password" element={<NewPsw />}/>
          <Route path="/loading-page" element={<BeforeLogin/>} />
          <Route path="/fornitori" element={<Fornitori/>} />
          <Route path="/lista-ordini" element={<ListaOrdini/>} />
          <Route path="/ordini" element={<Ordini/>} />
          <Route path="/ordini/fornitori" element={<Fornitori/>} />
          <Route path="/ordini/lista-ordini" element={<ListaOrdini/>} />
          <Route path='/ordini/nuovo-ordine' element={<NuovoOrdine/>} />
        </Routes>
      </Router>
    );
  }
  
  


export default App;