import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AggiungiProdotti from '../src/pagine/AggiungiProdotti';
import Magazzino from '../src/pagine/Magazzino'; 
import SecondaSottopagina from '../src/pagine/SecondaSottopagina';
import TerzaSottopagina from '../src/pagine/TerzaSottopagina';
import Riepilogo from '../src/pagine/Riepilogo'
import Navbar from '../src/componenti/Navbar';
import QuintaSottopagina from '../src/pagine/QuintaSottopagina';
import NavFooter from '../src/componenti/NavFooter'
import DettagliSpedizioni from '../src/pagine/DettagliSpedizione'
import Spedzioni from '../src/pagine/Spedizioni'
import Login from '../src/routes/login'
import Register from '../src/routes/register'
import NewPsw from '../src/routes/newPassword'
import { Root } from '../src/routes/root';
import BeforeLogin from '../src/pagine/LoadingPage';
import Ordini from '../src/pagine/Ordini';
import Fornitori from '../src/pagine/Fornitori';
import ListaOrdini from '../src/pagine/listaOrdini';
import NuovoOrdine from '../src/pagine/nuovoOrdine';
import ListaProdotti from '../src/pagine/ListaProdotti';
import Home from '../src/pagine/Home';
import '../src/App.css';
import ImportaSpedizioni from '../src/pagine/ImportaSpedizioni';
import Varianti from '../src/pagine/Varianti';
import { ProductProvider } from '../src/pagine/ContestoProdotto';
function App() {
    return (
      <ProductProvider>
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
          <Route path='/magazzino/lista-prodotti' element={<ListaProdotti/>} />
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
          <Route path='/home' element={<Home/>} />
          <Route path='/importa-spedizioni' element={<ImportaSpedizioni/>} />
          <Route path='/varianti' element={<Varianti/>} />
          

          
        </Routes>
      </Router>
      </ProductProvider>
    );
  }
  
  


export default App;