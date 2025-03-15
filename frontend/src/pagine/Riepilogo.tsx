import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import { useLocation, useNavigate } from 'react-router-dom';
import LeftNavbar from '../componenti/NavbarDesktop';
import { useState, useEffect } from 'react';


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

  const handleNext = () => {
    navigate('/magazzino/quinta-sottopagina');
  };

  const handlePrev = () => {
    navigate('/magazzino/terza-sottopagina');
  };

  return (
    <Container className="riepilogo-container">
      <Stepper steps={[1, 2, 3, 4, 5]} currentStep={5} />
      <h2 className="riepilogo-title">Riepilogo Dati</h2>
      <Row className="riepilogo-grid">
        {/* Dati Prodotto */}
        <Col md={6} className="riepilogo-col">
          <Card className="riepilogo-card">
            <Card.Header className="riepilogo-card-header">
              <Card.Title>Dati Prodotto</Card.Title>
            </Card.Header>
            <Card.Body>
              {formData.datiProdotto && (
                <>
                  <div className="riepilogo-field">
                    <strong>Nome Prodotto:</strong>
                    <p>{formData.datiProdotto.nomeProdotto || 'Non specificato'}</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>SKU:</strong>
                    <p>{formData.datiProdotto.sku || 'Non specificato'}</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>Categoria:</strong>
                    <p>{formData.datiProdotto.categoria || 'Non specificata'}</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>Descrizione:</strong>
                    <p>{formData.datiProdotto.descrizione || 'Non specificata'}</p>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Varianti */}
        <Col md={6} className="riepilogo-col">
          <Card className="riepilogo-card">
            <Card.Header className="riepilogo-card-header">
              <Card.Title>Varianti</Card.Title>
            </Card.Header>
            <Card.Body>
              {formData.datiVarianti && (
                <>
                  {/* Varianti Base */}
                  <div className="riepilogo-field">
                    <strong>Varianti Base:</strong>
                    {formData.datiVarianti.variantiBase && Object.entries(formData.datiVarianti.variantiBase).map(([nome, tipo]) => (
                      <p key={nome}>{nome}: {tipo || 'Non specificato'}</p>
                    ))}
                  </div>

                  {/* Varianti Personalizzate */}
                  <div className="riepilogo-field">
                    <strong>Varianti Personalizzate:</strong>
                    {formData.datiVarianti.variantiPersonalizzate && Object.entries(formData.datiVarianti.variantiPersonalizzate).map(([nome, tipo]) => (
                      <p key={nome}>{nome}: {tipo || 'Non specificato'}</p>
                    ))}
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Magazzino */}
        <Col md={6} className="riepilogo-col">
          <Card className="riepilogo-card">
            <Card.Header className="riepilogo-card-header">
              <Card.Title>Dati Magazzino</Card.Title>
            </Card.Header>
            <Card.Body>
              {formData.datiMagazzino && (
                <>
                  <div className="riepilogo-field">
                    <strong>Prezzo Acquisto:</strong>
                    <p>{formData.datiMagazzino.prezzoAcquisto || 'Non specificato'}</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>Prezzo Vendita:</strong>
                    <p>{formData.datiMagazzino.prezzoVendita || 'Non specificato'}</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>IVA:</strong>
                    <p>{formData.datiMagazzino.iva || 'Non specificato'}%</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>Quantità:</strong>
                    <p>{formData.datiMagazzino.quantita || 'Non specificato'}</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>Quantità Minima:</strong>
                    <p>{formData.datiMagazzino.quantitaMinima || 'Non specificato'}</p>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Fornitore */}
        <Col md={6} className="riepilogo-col">
          <Card className="riepilogo-card">
            <Card.Header className="riepilogo-card-header">
              <Card.Title>Dati Fornitore</Card.Title>
            </Card.Header>
            <Card.Body>
              {formData.datiFornitore && (
                <>
                  <div className="riepilogo-field">
                    <strong>Nome Fornitore:</strong>
                    <p>{formData.datiFornitore.nomeFornitore || 'Non specificato'}</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>Codice Fornitore:</strong>
                    <p>{formData.datiFornitore.codiceFornitore || 'Non specificato'}</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>Data:</strong>
                    <p>{formData.datiFornitore.data || 'Non specificata'}</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>Email:</strong>
                    <p>{formData.datiFornitore.emailFornitore || 'Non specificata'}</p>
                  </div>
                  <div className="riepilogo-field">
                    <strong>Telefono:</strong>
                    <p>{formData.datiFornitore.telefonoFornitore || 'Non specificato'}</p>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <div className="d-flex justify-content-between mt-4 mb-4">
        <Button 
          variant="outline-dark" 
          onClick={handlePrev}
          className="d-flex align-items-center gap-2"
        >
          <ArrowLeft /> Precedente
        </Button>
        <Button 
          variant="dark" 
          onClick={handleNext}
          className="d-flex align-items-center gap-2"
        >
          Conferma <ArrowRight />
        </Button>
      </div>
    </Container>
    
  );
};

export default Riepilogo;