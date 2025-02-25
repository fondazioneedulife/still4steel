import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import './QuintaSottopagina.css';

const QuintaSottopagina: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false); // Per vedere le 2 animazioni
  const [isLoading, setIsLoading] = useState<boolean>(true); // Stato di caricamento
  const navigate = useNavigate();

  // Simula un caricamento con un timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      // Logica per determinare se il prodotto è stato aggiunto correttamente
      setIsSuccess(Math.random() > 0.5);
      setIsLoading(false); // Fine del caricamento
    }, 2000); // Simula un caricamento di 2 secondi

    return () => clearTimeout(timer);
  }, []);

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
          Torna alla Home
        </Button>
      </div>
    </Container>
  );
};

export default QuintaSottopagina;