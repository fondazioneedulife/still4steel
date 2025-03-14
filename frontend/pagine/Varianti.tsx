import { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, PlusCircle, Trash, Pencil } from 'react-bootstrap-icons';
import Stepper from '../componenti2/Stepper';
import { useNavigate, useLocation } from 'react-router-dom';
import './Varianti.css'

const VariantiProdotto: React.FC = () => {
  const [step] = useState<number>(2); // Step 2 nel flusso
  const steps = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const location = useLocation();

  // Recupera i dati passati dalla pagina precedente
  const { datiProdotto } = location.state || {};

  // Varianti base predefinite
  const [variantiBase, setVariantiBase] = useState<{ id: number; nome: string; tipo: string }[]>([
    { id: 1, nome: 'Materiale', tipo: '' },
    { id: 2, nome: 'Colore', tipo: '' },
    { id: 3, nome: 'Taglia', tipo: '' },
    { id: 4, nome: 'Stampa', tipo: '' },
    { id: 5, nome: 'Finitura', tipo: '' },
  ]);

  // Varianti personalizzate aggiunte dall'utente
  const [variantiPersonalizzate, setVariantiPersonalizzate] = useState<{ id: number; nome: string; tipo: string }[]>([]);

  // Stato per il form di aggiunta varianti
  const [nomeVariante, setNomeVariante] = useState<string>('');
  const [tipoVariante, setTipoVariante] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Aggiungi o modifica una variante personalizzata
  const handleAggiungiVariante = () => {
    if (nomeVariante && tipoVariante) {
      const nuovaVariante = {
        id: Date.now(),
        nome: nomeVariante,
        tipo: tipoVariante,
      };

      if (editIndex !== null) {
        // Modifica una variante esistente
        const nuoveVarianti = [...variantiPersonalizzate];
        nuoveVarianti[editIndex] = nuovaVariante;
        setVariantiPersonalizzate(nuoveVarianti);
        setEditIndex(null);
      } else {
        // Aggiungi una nuova variante
        setVariantiPersonalizzate([...variantiPersonalizzate, nuovaVariante]);
      }

      // Resetta i campi del form
      setNomeVariante('');
      setTipoVariante('');
      setShowModal(false);
    }
  };

  // Rimuovi una variante personalizzata
  const handleRimuoviVariante = (id: number) => {
    setVariantiPersonalizzate(variantiPersonalizzate.filter((variante) => variante.id !== id));
  };

  // Modifica una variante personalizzata
  const handleModificaVariante = (index: number) => {
    const variante = variantiPersonalizzate[index];
    setNomeVariante(variante.nome);
    setTipoVariante(variante.tipo);
    setEditIndex(index);
    setShowModal(true);
  };

  // Passa alla pagina successiva
  const handleNext = () => {
    // Create an object with all variants data
    const variantiData = {
      variantiBase: variantiBase.reduce((acc, variante) => ({
        ...acc,
        [variante.nome.toLowerCase()]: variante.tipo
      }), {}),
      variantiPersonalizzate: variantiPersonalizzate.reduce((acc, variante) => ({
        ...acc,
        [variante.nome.toLowerCase()]: variante.tipo
      }), {})
    };

    // Save to sessionStorage
    sessionStorage.setItem('variantiData', JSON.stringify(variantiData));
    navigate('/seconda-sottopagina');
  };

  // Torna alla pagina precedente
  const handlePrev = () => {
    navigate('/aggiungi-prodotti', { state: { datiProdotto } });
  };

  return (
    <Container className="mt-4 varianti-prodotto-page">
      <Stepper steps={steps} currentStep={step} />
      <Card className="mb-3 form-card">
        <Card.Body>
          <h3 className="mb-4">Varianti del Prodotto</h3>

          {/* Varianti Base */}
          <h5 className="mb-3">Varianti Base</h5>
          <Row className="mb-4">
            {variantiBase.map((variante, index) => (
              <Col md={6} key={variante.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{variante.nome}</Card.Title>
                    <Form.Group className="mb-3">
                      <Form.Label>Tipo</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder={`Es: ${variante.nome === 'Materiale' ? 'Cotone' : variante.nome === 'Colore' ? 'Rosso' : '...'}`}
                        value={variante.tipo}
                        onChange={(e) => {
                          const nuoveVarianti = [...variantiBase];
                          nuoveVarianti[index].tipo = e.target.value;
                          setVariantiBase(nuoveVarianti);
                        }}
                      />
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Varianti Personalizzate */}
          <h5 className="mb-3">Varianti Personalizzate</h5>
          <Button variant="primary" onClick={() => setShowModal(true)} className="mb-4">
            <PlusCircle size={20} className="me-2" /> Aggiungi Variante
          </Button>

          <Row>
            {variantiPersonalizzate.map((variante, index) => (
              <Col md={4} key={variante.id} className="mb-3">
                <Card>
                  <Card.Body>
                    <Card.Title>{variante.nome}</Card.Title>
                    <Card.Text>
                      <strong>Tipo:</strong> {variante.tipo}
                    </Card.Text>
                    <div className="d-flex gap-2">
                      <Button variant="link" onClick={() => handleModificaVariante(index)}>
                        <Pencil size={16} />
                      </Button>
                      <Button variant="link" onClick={() => handleRimuoviVariante(variante.id)}>
                        <Trash size={16} />
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Card.Body>
      </Card>

      {/* Modal per aggiungere/modificare una variante personalizzata */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Modifica Variante' : 'Aggiungi Variante'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome Variante</Form.Label>
              <Form.Control
                type="text"
                placeholder="Es: Trama, Design"
                value={nomeVariante}
                onChange={(e) => setNomeVariante(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Es: Rigato, Floreale"
                value={tipoVariante}
                onChange={(e) => setTipoVariante(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Chiudi
          </Button>
          <Button variant="primary" onClick={handleAggiungiVariante}>
            {editIndex !== null ? 'Salva Modifiche' : 'Aggiungi'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Pulsanti di navigazione */}
      <div className="navigation-buttons">
        <Button 
          variant="outline-dark" 
          onClick={handlePrev} 
          className="nav-button btn-prev"
        >
          <ArrowLeft size={24} /> Precedente
        </Button>
        <Button 
          variant="dark" 
          onClick={handleNext} 
          className="nav-button btn-next"
        >
          Succesivo <ArrowRight size={24} />
        </Button>
      </div>
    </Container>
  );
};

export default VariantiProdotto;