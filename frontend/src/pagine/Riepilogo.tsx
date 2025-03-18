import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Box, Tag, Percent, Person, Calendar } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import { useLocation, useNavigate } from 'react-router-dom';
import LeftNavbar from '../componenti/NavbarDesktop';
import { useState, useEffect } from 'react';
import './Riepilogo.css'
const Riepilogo: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    datiProdotto: null,
    datiVarianti: null,
    datiMagazzino: null,
    datiFornitore: null
  });

  useEffect(() => {
    try {
      const aggiungiProdottoData = JSON.parse(sessionStorage.getItem('aggiungiProdottoData') || '{}');
      const variantiData = JSON.parse(sessionStorage.getItem('variantiData') || '{}');
      const secondaSottopaginaData = JSON.parse(sessionStorage.getItem('secondaSottopaginaData') || '{}');
      const terzaSottopaginaData = JSON.parse(sessionStorage.getItem('terzaSottopaginaData') || '{}');
  
      setFormData({
        datiProdotto: aggiungiProdottoData,
        datiVarianti: variantiData,
        datiMagazzino: secondaSottopaginaData,
        datiFornitore: terzaSottopaginaData
      });
    } catch (error) {
      console.error('Error parsing form data:', error);
      setFormData({
        datiProdotto: {},
        datiVarianti: {},
        datiMagazzino: {},
        datiFornitore: {}
      });
    }
  }, []);

  // Update the productData structure in handleNext
  const handleNext = async() => {
    const productData = {
      prodotto: {
        nomeProdotto: formData.datiProdotto?.nomeProdotto || '',
        sku: formData.datiProdotto?.sku || '',
        categoria: formData.datiProdotto?.categoria || '',
        brand: formData.datiProdotto?.brand || '',  // Added brand
        descrizione: formData.datiProdotto?.descrizione || '',
        prezzoAcquisto: formData.datiMagazzino?.prezzoAcquisto || '',
        prezzoVendita: formData.datiMagazzino?.prezzoVendita || '',
        iva: formData.datiMagazzino?.iva || '',
        varianti: formData.datiVarianti || []
      },
      magazzino: {
        quantita: formData.datiMagazzino?.quantita || '',
        quantitaMinima: formData.datiMagazzino?.quantitaMinima || ''
      },
      fornitore: {
        nomeFornitore: formData.datiFornitore?.nomeFornitore || '',
        codiceFornitore: formData.datiFornitore?.codiceFornitore || '',
        data: formData.datiFornitore?.data || '',
        emailFornitore: formData.datiFornitore?.emailFornitore || '',
        telefonoFornitore: formData.datiFornitore?.telefonoFornitore || ''
      }
    };

    const VariableData = {
      type: formData.datiMagazzino?.iva || '',
      product_id: formData.datiProdotto?.sku || ''
    };

    try {
      const response = await fetch('http://localhost:3001/api/prodotti', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData)
      });

      if (response.ok) {
      console.log('Dati inviati con successo');

      // Send VariableData to the backend
      const variableResponse = await fetch('http://localhost:3001/api/variables', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(VariableData)
      });

      if (variableResponse.ok) {
        console.log('Variable data inviati con successo');
        navigate('/magazzino/quinta-sottopagina', { 
        state: { productData } 
        });
      } else {
        console.error('Errore nell invio dei dati della variabile:', variableResponse.statusText);
      }
      } else {
      console.error('Errore nell invio dei dati:', response.statusText);
      }
    } catch (error) {
      console.error('Errore di rete:', error);
    }
  };

  const handlePrev = () => {
    navigate('/magazzino/terza-sottopagina');
  };

  return (
    <LeftNavbar>
      <Container className="riepilogo-container">
        <Stepper steps={[1, 2, 3, 4, 5]} currentStep={4} />
        <h2 className="riepilogo-title">Riepilogo Dati</h2>
        <div className="riepilogo-grid">
          {/* Dati Prodotto */}
          <div className="riepilogo-col">
            <Card className="riepilogo-card">
              <Card.Header className="riepilogo-card-header">
                <Card.Title>
                  <Box className="me-2" /> Dati Prodotto
                </Card.Title>
              </Card.Header>
              <Card.Body>
                {formData.datiProdotto && (
                  <>
                    <div className="riepilogo-field">
                      <strong>Nome Prodotto</strong>
                      <p>{formData.datiProdotto.nomeProdotto || 'Non specificato'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>Brand</strong>
                      <p>{formData.datiProdotto.brand || 'Non specificato'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>SKU</strong>
                      <p>{formData.datiProdotto.sku || 'Non specificato'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>Categoria</strong>
                      <p>{formData.datiProdotto.categoria || 'Non specificata'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>Descrizione</strong>
                      <p>{formData.datiProdotto.descrizione || 'Non specificata'}</p>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </div>

          {/* Varianti */}
          <div className="riepilogo-col">
            <Card className="riepilogo-card">
              <Card.Header className="riepilogo-card-header">
                <Card.Title>
                  <Box className="me-2" /> Varianti
                </Card.Title>
              </Card.Header>
              <Card.Body>
                {Array.isArray(formData.datiVarianti) && formData.datiVarianti.map((variante, index) => (
                  <div key={index} className="riepilogo-field">
                    <strong>{variante.label}</strong>
                    <p>{variante.types.join(', ')}</p>
                  </div>
                ))}
                {!Array.isArray(formData.datiVarianti) && (
                  <p>Nessuna variante specificata</p>
                )}
              </Card.Body>
            </Card>
          </div>

          {/* Magazzino */}
          <div className="riepilogo-col">
            <Card className="riepilogo-card">
              <Card.Header className="riepilogo-card-header">
                <Card.Title>
                  <Tag className="me-2" /> Dati Magazzino
                </Card.Title>
              </Card.Header>
              <Card.Body>
                {formData.datiMagazzino && (
                  <>
                    <div className="riepilogo-field">
                      <strong>Prezzo Acquisto</strong>
                      <p>€ {formData.datiMagazzino.prezzoAcquisto || 'Non specificato'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>Prezzo Vendita</strong>
                      <p>€ {formData.datiMagazzino.prezzoVendita || 'Non specificato'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>IVA</strong>
                      <p>{formData.datiMagazzino.iva || 'Non specificato'}%</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>Quantità</strong>
                      <p>{formData.datiMagazzino.quantita || 'Non specificato'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>Quantità Minima</strong>
                      <p>{formData.datiMagazzino.quantitaMinima || 'Non specificato'}</p>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </div>

          {/* Fornitore */}
          <div className="riepilogo-col">
            <Card className="riepilogo-card">
              <Card.Header className="riepilogo-card-header">
                <Card.Title>
                  <Person className="me-2" /> Dati Fornitore
                </Card.Title>
              </Card.Header>
              <Card.Body>
                {formData.datiFornitore && (
                  <>
                    <div className="riepilogo-field">
                      <strong>Nome Fornitore</strong>
                      <p>{formData.datiFornitore.nomeFornitore || 'Non specificato'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>Codice Fornitore</strong>
                      <p>{formData.datiFornitore.codiceFornitore || 'Non specificato'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>Data</strong>
                      <p>{formData.datiFornitore.data || 'Non specificata'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>Email</strong>
                      <p>{formData.datiFornitore.emailFornitore || 'Non specificata'}</p>
                    </div>
                    <div className="riepilogo-field">
                      <strong>Telefono</strong>
                      <p>{formData.datiFornitore.telefonoFornitore || 'Non specificato'}</p>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="d-flex justify-content-between navigation-buttons">
          <Button variant="outline-dark" onClick={handlePrev} className="nav-button btn-prev">
            <ArrowLeft size={24} /> Precedente
          </Button>
          <Button variant="dark" onClick={handleNext} className="nav-button btn-next">
            <ArrowRight size={24} /> Successivo
          </Button>
        </div>
      </Container>
    </LeftNavbar>
  );
};

export default Riepilogo;