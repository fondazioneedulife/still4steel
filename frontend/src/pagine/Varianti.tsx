import { useState } from 'react';
import { Container, Form, Button, Card, Modal } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, PlusCircle, Trash, Pencil } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import { useNavigate } from 'react-router-dom';
import './Varianti.css';
import { useProductData } from './ContestoProdotto';

const VariantiProdotto: React.FC = () => {
  const [step] = useState<number>(2);
  const steps = [1, 2, 3, 4, 5];
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  // Initialize form state with empty strings
  const [variantLabel, setVariantLabel] = useState<string>('');
  const [variantTypes, setVariantTypes] = useState<string>('');
  // Update the initial state to load from localStorage
  const [savedVariants, setSavedVariants] = useState<Array<{ label: string; types: string[] }>>(() => {
    // Try to load existing variants from localStorage
    const saved = localStorage.getItem('savedVariants');
    return saved ? JSON.parse(saved) : [];
  });
  const { productData, setProductData } = useProductData();

  // Update handleAddVariant to save to localStorage
  const handleAddVariant = () => {
    if (variantLabel && variantTypes) {
      const types = variantTypes.split(',').map(type => type.trim().toUpperCase());
      const newVariants = editingIndex !== null
        ? savedVariants.map((v, i) => i === editingIndex 
            ? { label: variantLabel.toUpperCase(), types }
            : v)
        : [...savedVariants, { label: variantLabel.toUpperCase(), types }];
      
      setSavedVariants(newVariants);
      setProductData({
        ...productData,
        varianti: newVariants
      });
      localStorage.setItem('savedVariants', JSON.stringify(newVariants));
      
      setVariantLabel('');
      setVariantTypes('');
      setShowModal(false);
      setEditingIndex(null);
    }
  };

  // Update handleRemoveVariant to also update localStorage
  // Keep only the first implementation with localStorage handling
  const handleRemoveVariant = (index: number) => {
    const newVariants = savedVariants.filter((_, i) => i !== index);
    setSavedVariants(newVariants);
    localStorage.setItem('savedVariants', JSON.stringify(newVariants));
    sessionStorage.setItem('variantiData', JSON.stringify(newVariants));
  };


  // Remove these duplicate declarations:
  /* const handleRemoveVariant = (index: number) => {
    const newVariants = savedVariants.filter((_, i) => i !== index);
    setSavedVariants(newVariants);
  };

  const handleNext = () => {
    sessionStorage.setItem('variantiData', JSON.stringify(savedVariants));
    navigate('/magazzino/seconda-sottopagina');
  }; */

  // Update handleNext to save current selection
  const handleNext = () => {
    sessionStorage.setItem('variantiData', JSON.stringify(savedVariants));
    navigate('/magazzino/seconda-sottopagina');
  };
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariantLabel(e.target.value ? e.target.value.toUpperCase() : '');
  };

  const handleTypesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVariantTypes(e.target.value ? e.target.value.toUpperCase() : '');
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingIndex(null);
    setVariantLabel('');
    setVariantTypes('');
  };

  // Add after the handleModalClose function
  // Remove this duplicate function
  /* const handleAddVariant = () => {
    if (variantLabel && variantTypes) {
      const types = variantTypes.split(',').map(type => type.trim().toUpperCase());
      if (editingIndex !== null) {
        const newVariants = [...savedVariants];
        newVariants[editingIndex] = { label: variantLabel.toUpperCase(), types };
        setSavedVariants(newVariants);
        setEditingIndex(null);
      } else {
        setSavedVariants([...savedVariants, { label: variantLabel.toUpperCase(), types }]);
      }
      setVariantLabel('');
      setVariantTypes('');
      setShowModal(false);
    }
  }; */

  const handleEditVariant = (index: number) => {
    const variant = savedVariants[index];
    setVariantLabel(variant.label);
    setVariantTypes(variant.types.join(', '));
    setEditingIndex(index);
    setShowModal(true);
  };




  // Remove all other declarations of handleNext
  const handlePrev = () => {
    navigate('/magazzino/aggiungi-prodotti');
  };

  // Update the Modal form inputs
  return (
    <Container className="mt-4" style={{ 
      maxWidth: '1200px',
      background: 'linear-gradient(145deg, #ffffff, #f8f9fa)',
      borderRadius: '16px',
      padding: '2.5rem',
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)'
    }}>
      <Stepper steps={steps} currentStep={step} />
      
      <div style={{
        textAlign: 'center',
        margin: '2.5rem 0 3rem'
      }}>
        <h2 style={{ 
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '0.5rem'
        }}>Varianti</h2>
      </div>

      <div className="text-center mb-5">
        <Button 
          variant="dark" 
          onClick={() => setShowModal(true)}
          style={{
            padding: '1rem 2rem',
            borderRadius: '12px',
            fontSize: '1.1rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          <PlusCircle size={22} /> Aggiungi Variante
        </Button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
        marginBottom: '3rem'
      }}>
        {savedVariants.map((variant, index) => (
          <Card key={index} style={{
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            transition: 'all 0.3s ease'
          }}>
            <Card.Body style={{ padding: '1.5rem' }}>
              <div className="d-flex justify-content-between align-items-start">
                <div style={{ flex: 1 }}>
                  <h5 style={{
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    marginBottom: '1rem'
                  }}>{variant.label}</h5>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem'
                  }}>
                    {variant.types.map((type, i) => (
                      <span key={i} style={{
                        background: '#f8f9fa',
                        padding: '0.5rem 1rem',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        color: '#333333'
                      }}>
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <div style={{
                  display: 'flex',
                  gap: '0.75rem'
                }}>
                  <Button 
                    variant="link" 
                    onClick={() => handleEditVariant(index)}
                    style={{ color: '#666666', padding: '0.5rem' }}
                  >
                    <Pencil size={18} />
                  </Button>
                  <Button 
                    variant="link" 
                    onClick={() => handleRemoveVariant(index)}
                    style={{ color: '#dc3545', padding: '0.5rem' }}
                  >
                    <Trash size={18} />
                  </Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      <div className="d-flex justify-content-between mt-5" style={{
        borderTop: '1px solid #e0e0e0',
        paddingTop: '2rem'
      }}>
        <Button variant="outline-dark" onClick={handlePrev} style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontWeight: 500
        }}>
          <ArrowLeft size={20} className="me-2" /> Precedente
        </Button>
        <Button variant="dark" onClick={handleNext} style={{
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          fontWeight: 500
        }}>
          Successivo <ArrowRight size={20} className="ms-2" />
        </Button>
      </div>
      
      <Modal show={showModal} onHide={handleModalClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex !== null ? 'Modifica Variante' : 'Nuova Variante'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nome Variante</Form.Label>
              <Form.Control
                type="text"
                placeholder="Es: Colore, Taglia, Materiale"
                value={variantLabel || ''}
                onChange={handleLabelChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Tipi (separati da virgola)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Es: Rosso, Verde, Blu"
                value={variantTypes || ''}
                onChange={handleTypesChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Annulla
          </Button>
          <Button variant="primary" onClick={handleAddVariant}>
            {editingIndex !== null ? 'Salva Modifiche' : 'Aggiungi'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Remove these duplicate buttons */}
      {/* <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-dark" onClick={handlePrev}>
          <ArrowLeft size={20} className="me-2" /> Precedente
        </Button>
        <Button variant="dark" onClick={handleNext}>
          Successivo <ArrowRight size={20} className="ms-2" />
        </Button>
      </div> */}
    </Container>
  );
};

export default VariantiProdotto;