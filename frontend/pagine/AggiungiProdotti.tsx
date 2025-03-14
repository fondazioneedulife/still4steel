import React, { useState } from 'react';
<<<<<<< HEAD
import { Container, Form, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Tag, List, FileText, InfoCircle, PlusCircle, Image } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import { useNavigate } from 'react-router-dom';
import { useProductData } from './ContestoProdotto';
=======
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Tag, List, FileText, InfoCircle } from 'react-bootstrap-icons';
import Stepper from '../src/componenti/Stepper';
import { useNavigate } from 'react-router-dom';
import LeftNavbar from '../src/componenti/NavbarDesktop';
>>>>>>> branch-filippo

const AggiungiProdotti: React.FC = () => {
  const { productData, setProductData } = useProductData();
  const [step] = useState<number>(1);
  const steps = [1, 2, 3, 4, 5];
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(['Categoria A', 'Categoria B', 'Categoria C']);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!productData.nomeProdotto.trim()) newErrors.nomeProdotto = 'Il nome del prodotto è obbligatorio';
    if (!productData.sku.trim()) newErrors.sku = 'Il codice SKU è obbligatorio';
    if (!productData.categoria.trim()) newErrors.categoria = 'La categoria è obbligatoria';
    if (!productData.descrizione.trim()) newErrors.descrizione = 'La descrizione è obbligatoria';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
<<<<<<< HEAD
      const prodottoData = {
        nomeProdotto: productData.nomeProdotto,
        sku: productData.sku,
        categoria: productData.categoria,
        descrizione: productData.descrizione,
        immagine: previewImage
      };
      sessionStorage.setItem('aggiungiProdottoData', JSON.stringify(prodottoData));
      navigate('/varianti');
=======
      navigate('/magazzino/seconda-sottopagina');
>>>>>>> branch-filippo
    }
  };

  const handlePrev = () => {
    navigate('/magazzino');
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory('');
      setShowModal(false);
    }
  };

  // Add to existing state and productData handling
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Add this function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setProductData({ ...productData, immagine: file });
      };
      reader.readAsDataURL(file);
    }
  };

  // In the return statement, add this inside the Row component, after the existing Col components
  return (
      <LeftNavbar>
    <Container className="mt-4 aggiungi-prodotti-page">
      <Stepper steps={steps} currentStep={step} />
      <Card className="mb-3 form-card">
        <Card.Body>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3 input-container">
                <Form.Label className="form-label">
                  <Tag size={16} className="me-2" /> Nome prodotto
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il nome del prodotto..."
                  value={productData.nomeProdotto}
                  onChange={(e) => setProductData({ ...productData, nomeProdotto: e.target.value })}
                  isInvalid={!!errors.nomeProdotto}
                  className="form-input"
                />
                <Form.Control.Feedback type="invalid">{errors.nomeProdotto}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 input-container">
                <Form.Label className="form-label">
                  <List size={16} className="me-2" /> Codice SKU
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il codice SKU..."
                  value={productData.sku}
                  onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                  isInvalid={!!errors.sku}
                  className="form-input"
                />
                <Form.Control.Feedback type="invalid">{errors.sku}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3 input-container">
                <Form.Label className="form-label">
                  <InfoCircle size={16} className="me-2" /> Categoria
                </Form.Label>
                <div className="d-flex">
                  <Form.Select
                    value={productData.categoria}
                    onChange={(e) => setProductData({ ...productData, categoria: e.target.value })}
                    isInvalid={!!errors.categoria}
                    className="form-input"
                  >
                    <option value="">Seleziona una categoria</option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                  <Button variant="outline-primary" className="ms-2" onClick={() => setShowModal(true)}>
                    <PlusCircle size={20} />
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">{errors.categoria}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3 input-container">
                <Form.Label className="form-label">
                  <FileText size={16} className="me-2" /> Descrizione
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Inserisci una descrizione..."
                  value={productData.descrizione}
                  onChange={(e) => setProductData({ ...productData, descrizione: e.target.value })}
                  isInvalid={!!errors.descrizione}
                  className="form-input"
                />
                <Form.Control.Feedback type="invalid">{errors.descrizione}</Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={12} className="mt-3">
              <Form.Group className="mb-3 input-container">
                <Form.Label className="form-label">
                  <Image size={16} className="me-2" /> Immagine Prodotto
                </Form.Label>
                <div className="d-flex align-items-center">
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="form-input"
                  />
                  {previewImage && (
                    <div className="ms-3" style={{ width: '100px', height: '100px' }}>
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  )}
                </div>
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-between navigation-buttons">
        <Button variant='outline-dark' onClick={handlePrev} className="nav-button">
          <ArrowLeft size={24} /> Precedente
        </Button>
        <Button variant='dark' onClick={handleNext} className="nav-button">
          <ArrowRight size={24} /> Sucessivo
        </Button>
      </div>

      {/* Modal per aggiungere categoria */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Aggiungi Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Nuova categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Chiudi</Button>
          <Button variant="primary" onClick={handleAddCategory}>Aggiungi</Button>
        </Modal.Footer>
      </Modal>
    </Container>
      </LeftNavbar>
  );
};

export default AggiungiProdotti;