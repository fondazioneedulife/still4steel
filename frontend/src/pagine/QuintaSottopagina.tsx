import { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useProductData } from './ContestoProdotto';
import './QuintaSottopagina.css';
import LeftNavbar from '../componenti/NavbarDesktop';

const QuintaSottopagina: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { addProduct } = useProductData();

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        // Get form data from sessionStorage
        const datiProdotto = JSON.parse(sessionStorage.getItem('aggiungiProdottoData') || '{}');
        const datiMagazzino = JSON.parse(sessionStorage.getItem('secondaSottopaginaData') || '{}');
        const datiFornitore = JSON.parse(sessionStorage.getItem('terzaSottopaginaData') || '{}');

        // Create form data structure that matches ProductData interface
        const formData = {
          prodotto: {
            nomeProdotto: datiProdotto.nomeProdotto || '',
            sku: datiProdotto.sku || `SKU${Math.floor(Math.random() * 1000)}`,
            categoria: datiProdotto.categoria || '',
            descrizione: datiProdotto.descrizione || '',
            prezzoAcquisto: datiMagazzino.prezzoAcquisto || '0',
            prezzoVendita: datiMagazzino.prezzoVendita || '0',
            iva: datiMagazzino.iva || '0'
          },
          magazzino: {
            quantita: datiMagazzino.quantita || '0',
            quantitaMinima: datiMagazzino.quantitaMinima || '0'
          },
          fornitore: {
            nomeFornitore: datiFornitore.nomeFornitore || '',
            codiceFornitore: datiFornitore.codiceFornitore || '',
            data: datiFornitore.data || '',
            emailFornitore: datiFornitore.emailFornitore || '',
            telefonoFornitore: datiFornitore.telefonoFornitore || ''
          }
        };

        // Add product to context
        addProduct(formData);
        
        // Clear session storage
        sessionStorage.removeItem('aggiungiProdottoData');
        sessionStorage.removeItem('variantiData');
        sessionStorage.removeItem('secondaSottopaginaData');
        sessionStorage.removeItem('terzaSottopaginaData');

        setIsSuccess(true);
      } catch (error) {
        console.error('Error adding product:', error);
        setIsSuccess(false);
      }

      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [addProduct]);

  const handleBackToHome = () => {
    navigate('/magazzino');
  };

  const handlePrev = () => {
    navigate('/magazzino/riepilogo');
  };

  return (
    <LeftNavbar>
    <Container className="quinta-sottopagina-page text-center">
      {isLoading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p className="loading-message">Stiamo aggiungendo il prodotto...</p>
        </div>
      ) : (
        <div className="animation-container">
          {isSuccess ? (
            <>
              <CheckCircleFill className="success-icon animate" />
              <p className="message success-message">Il prodotto è stato aggiunto correttamente!</p>
              <p className="sub-message">Ora puoi visualizzarlo nel tuo magazzino.</p>
            </>
          ) : (
            <>
              <XCircleFill className="error-icon animate" />
              <p className="message error-message">Si è verificato un errore durante l'aggiunta del prodotto.</p>
              <p className="sub-message">Riprova più tardi o contatta il supporto.</p>
            </>
          )}
        </div>
      )}

      <div className="button-container">
        <Button variant='outline-dark' onClick={handlePrev} className="nav-button btn-prev">
          Torna al Riepilogo
        </Button>
        <Button variant='dark' onClick={handleBackToHome} className="nav-button btn-next">
          Torna al Magazzino
        </Button>
      </div>
    </Container>
  </LeftNavbar>
  );
};

export default QuintaSottopagina;