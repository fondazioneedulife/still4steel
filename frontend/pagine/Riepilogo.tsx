import { useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { ArrowLeft, ArrowRight } from 'react-bootstrap-icons';
import Stepper from '../componenti/Steppper';
import { useNavigate } from 'react-router-dom';

const Riepilogo: React.FC = () => {
  const [step] = useState<number>(4);
  const steps = [1, 2, 3, 4, 5];
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/quinta-sottopagina');
  };

  const handlePrev = () => {
    navigate('/terza-sottopagina');
  };

  return (
    <Container className="mt-4 riepilogo-page">
      <Stepper steps={steps} currentStep={step} />
      <Card className="mb-3 form-card">
        <Card.Body>
          <Card.Title className="text-center mb-4">Riepilogo Dati</Card.Title>
          <Row>
            <Col md={6}>
              <Card className="mb-3 riepilogo-section">
                <Card.Body>
                  <Card.Title className="section-title">Dati Prodotto</Card.Title>
                  <Card.Text>
                    <strong>Nome Prodotto:</strong> Prodotto XYZ
                  </Card.Text>
                  <Card.Text>
                    <strong>Categoria:</strong> Elettronica
                  </Card.Text>
                  <Card.Text>
                    <strong>Descrizione:</strong> Descrizione del prodotto
                  </Card.Text>
                  <Card.Text>
                    <strong>Prezzo di Acquisto:</strong> 50 €
                  </Card.Text>
                  <Card.Text>
                    <strong>Prezzo di Vendita:</strong> 80 €
                  </Card.Text>
                  <Card.Text>
                    <strong>IVA:</strong> 22%
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3 riepilogo-section">
                <Card.Body>
                  <Card.Title className="section-title">Dati Magazzino</Card.Title>
                  <Card.Text>
                    <strong>Quantità Prodotto:</strong> 100
                  </Card.Text>
                  <Card.Text>
                    <strong>Quantità Minima:</strong> 10
                  </Card.Text>
                </Card.Body>
              </Card>
              <Card className="mb-3 riepilogo-section">
                <Card.Body>
                  <Card.Title className="section-title">Dati Fornitore</Card.Title>
                  <Card.Text>
                    <strong>Nome Fornitore:</strong> Fornitore ABC
                  </Card.Text>
                  <Card.Text>
                    <strong>Codice Fornitore:</strong> 12345
                  </Card.Text>
                  <Card.Text>
                    <strong>Data:</strong> 2023-10-15
                  </Card.Text>
                  <Card.Text>
                    <strong>Email Fornitore:</strong> fornitore@example.com
                  </Card.Text>
                  <Card.Text>
                    <strong>Telefono Fornitore:</strong> +39 123 456 7890
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-between navigation-buttons">
        <Button variant="outline-dark" onClick={handlePrev} className="nav-button btn-prev">
          <ArrowLeft size={24} /> Precedente
        </Button>
        <Button variant="dark" onClick={handleNext} className="nav-button btn-next">
          <ArrowRight size={24} /> Successivo
        </Button>
      </div>
    </Container>
  );
};

export default Riepilogo;