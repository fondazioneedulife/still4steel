import { useState } from 'react';
import { Container, Form, Button, Card, Modal } from 'react-bootstrap';
import { ArrowLeft, ArrowRight, PlusCircle, Trash, Pencil } from 'react-bootstrap-icons';
import Stepper from '../componenti/Stepper';
import { useNavigate } from 'react-router-dom';
import './Varianti.css';

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
      localStorage.setItem('savedVariants', JSON.stringify(newVariants));
      sessionStorage.setItem('variantiData', JSON.stringify(newVariants));
      
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
    <Container className="mt-4 bg-white p-4">
      <Stepper steps={steps} currentStep={step} />
      <h2 className="text-center my-4">Varianti</h2>

      <div className="text-center mb-4">
        <Button 
          variant="primary" 
          onClick={() => setShowModal(true)}
          className="d-inline-flex align-items-center gap-2"
        >
          <PlusCircle size={18} /> Aggiungi Variante
        </Button>
      </div>

      <div className="variants-grid">
        {savedVariants.map((variant, index) => (
          <Card key={index} className="mb-3 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-3">{variant.label}</h5>
                  <div className="d-flex flex-wrap gap-2">
                    {variant.types.map((type, i) => (
                      <span key={i} className="badge bg-light text-dark border">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                <Button 
                  variant="link" 
                  className="text-primary p-0 me-2"
                  onClick={() => handleEditVariant(index)}
                >
                  <Pencil size={16} />
                </Button>
                <Button 
                  variant="link" 
                  className="text-danger p-0"
                  onClick={() => handleRemoveVariant(index)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </Card.Body>
          </Card>
        ))}
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

      <div className="d-flex justify-content-between mt-4">
        <Button variant="outline-dark" onClick={handlePrev}>
          <ArrowLeft size={20} className="me-2" /> Precedente
        </Button>
        <Button variant="dark" onClick={handleNext}>
          Successivo <ArrowRight size={20} className="ms-2" />
        </Button>
      </div>
    </Container>
  );
};

export default VariantiProdotto;