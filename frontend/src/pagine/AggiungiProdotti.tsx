import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Modal } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, Tag, List, FileText, InfoCircle, PlusCircle, Image } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import { useNavigate } from 'react-router-dom';
import { useProductData } from './ContestoProdotto';
import LeftNavbar from '../componenti/NavbarDesktop';

const AggiungiProdotti: React.FC = () => {
  const { productData, setProductData } = useProductData();
  const [step] = useState<number>(1);
  const steps = [1, 2, 3, 4, 5];
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories'); // Verifica che l'endpoint sia corretto
        const data = await response.json();
  
        // Estrarre solo i nomi
        const categoryNames = data.map((cat: { name: string }) => cat.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  }, []);  

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  // Add brand to the validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!productData.nomeProdotto.trim()) newErrors.nomeProdotto = 'Il nome del prodotto è obbligatorio';
    if (!productData.sku.trim()) newErrors.sku = 'Il codice SKU è obbligatorio';
    if (!productData.categoria.trim()) newErrors.categoria = 'La categoria è obbligatoria';
    if (!productData.descrizione.trim()) newErrors.descrizione = 'La descrizione è obbligatoria';
    if (!productData.brand.trim()) newErrors.brand = 'Il brand è obbligatorio';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      const prodottoData = {
        nomeProdotto: productData.nomeProdotto,
        sku: productData.sku,
        categoria: productData.categoria,
        descrizione: productData.descrizione,
        immagine: previewImage
      };
      sessionStorage.setItem('aggiungiProdottoData', JSON.stringify(prodottoData));
      navigate('/varianti');
    }
  };

  const handlePrev = () => {
    navigate('/magazzino');
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      try {
        const response = await fetch('http://localhost:3001/api/categories', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newCategory }),
        });

        if (response.ok) {
          setCategories([...categories, newCategory]);
          setNewCategory('');
          setShowModal(false);
        } else {
          console.error('Failed to add category');
        }
      } catch (error) {
        console.error('Error adding category:', error);
      }
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
      <Card className="mb-4 form-card shadow-sm">
        <Card.Body className="p-4">
          <Row className="g-4">
            <Col md={6}>
              <Form.Group className="input-container">
                <Form.Label className="form-label d-flex align-items-center">
                  <Tag size={18} className="me-2 text-primary" />
                  <span className="fw-medium">Nome prodotto</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il nome del prodotto..."
                  value={productData.nomeProdotto}
                  onChange={(e) => setProductData({ ...productData, nomeProdotto: e.target.value })}
                  isInvalid={!!errors.nomeProdotto}
                  className="form-input py-2"
                />
                <Form.Control.Feedback type="invalid">{errors.nomeProdotto}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="input-container mt-4">
                <Form.Label className="form-label d-flex align-items-center">
                  <List size={18} className="me-2 text-primary" />
                  <span className="fw-medium">Codice SKU</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il codice SKU..."
                  value={productData.sku}
                  onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                  isInvalid={!!errors.sku}
                  className="form-input py-2"
                />
                <Form.Control.Feedback type="invalid">{errors.sku}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="input-container">
                <Form.Label className="form-label d-flex align-items-center">
                  <InfoCircle size={18} className="me-2 text-primary" />
                  <span className="fw-medium">Categoria</span>
                </Form.Label>
                <div className="d-flex gap-2">
                  <Form.Select
                    value={productData.categoria}
                    onChange={(e) => setProductData({ ...productData, categoria: e.target.value })}
                    isInvalid={!!errors.categoria}
                    className="form-input py-2"
                  >
                    <option value="">Seleziona una categoria</option>
                    {categories.map((categoryName, index) => (
                      <option key={index} value={categoryName}>{categoryName}</option>
                    ))}
                  </Form.Select>
                  <Button 
                    variant="outline-primary" 
                    className="d-flex align-items-center justify-content-center"
                    style={{ width: '42px', height: '42px' }}
                    onClick={() => setShowModal(true)}
                  >
                    <PlusCircle size={20} />
                  </Button>
                </div>
                <Form.Control.Feedback type="invalid">{errors.categoria}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="input-container mt-4">
                <Form.Label className="form-label d-flex align-items-center">
                  <FileText size={18} className="me-2 text-primary" />
                  <span className="fw-medium">Descrizione</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Inserisci una descrizione..."
                  value={productData.descrizione}
                  onChange={(e) => setProductData({ ...productData, descrizione: e.target.value })}
                  isInvalid={!!errors.descrizione}
                  className="form-input"
                  style={{ resize: 'none' }}
                />
                <Form.Control.Feedback type="invalid">{errors.descrizione}</Form.Control.Feedback>
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group className="input-container mb-4">
                <Form.Label className="form-label d-flex align-items-center">
                  <Tag size={18} className="me-2 text-primary" />
                  <span className="fw-medium">Brand</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Inserisci il brand..."
                  value={productData.brand}
                  onChange={(e) => setProductData({ ...productData, brand: e.target.value })}
                  isInvalid={!!errors.brand}
                  className="form-input py-2"
                />
                <Form.Control.Feedback type="invalid">{errors.brand}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="input-container">
                <Form.Label className="form-label d-flex align-items-center">
                  <Image size={18} className="me-2 text-primary" />
                  <span className="fw-medium">Immagine Prodotto</span>
                </Form.Label>
                <div className="d-flex align-items-center gap-3">
                  <div className="flex-grow-1">
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="form-input py-2"
                    />
                  </div>
                  {previewImage && (
                    <div className="preview-image-container">
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="preview-image"
                        style={{
                          width: '120px',
                          height: '120px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
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

      <div className="d-flex justify-content-between w-100 mt-4">
        <Button variant="outline-dark" onClick={handlePrev} className="nav-button px-4 py-2">
          <ArrowLeft size={20} className="me-2" /> Precedente
        </Button>
        <Button variant="dark" onClick={handleNext} className="nav-button px-4 py-2">
          Successivo <ArrowRight size={20} className="ms-2" />
        </Button>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} className="category-modal">
        <Modal.Header closeButton>
          <Modal.Title className="h5 m-0">Aggiungi Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Nome categoria"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="form-input"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>
            Aggiungi
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  </LeftNavbar>
);
};

export default AggiungiProdotti;