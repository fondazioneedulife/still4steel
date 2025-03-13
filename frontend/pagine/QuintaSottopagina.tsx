import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useProductData } from './ContestoProdotto';
import './QuintaSottopagina.css';

const QuintaSottopagina: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { addProduct } = useProductData();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Logica per determinare se il prodotto è stato aggiunto correttamente
      const success = Math.random() > 0.5;
      setIsSuccess(success);

      if (success) {
        // Aggiungi il prodotto alla lista
        const newProduct = {
          id: Date.now(),
          sku: 'SKU' + Math.floor(Math.random() * 1000),
          name: 'Nuovo Prodotto',
          image: 'https://placehold.co/100x100',
          quantity: 10,
          status: 'available',
        };
        addProduct(newProduct);
      }

      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [addProduct]);

  const handleBackToHome = () => {
    navigate('/magazzino');
  };

  const handlePrev = () => {
    navigate('/riepilogo');
  };

  return (
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
  );
};

export default QuintaSottopagina;