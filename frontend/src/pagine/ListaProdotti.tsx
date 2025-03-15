import { useState, useMemo } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import { X } from 'react-bootstrap-icons';  // Add this import
import "./ListaProdotti.css";
import LeftNavbar from "../componenti/NavbarDesktop";
import NavFooter from "../componenti/NavFooter";
import { useProductData } from './ContestoProdotto';
import ProductModal from "../componenti/SingleProduct";

const STATUS_LABELS = {
  available: "Disponibile",
  low_stock: "Scorte limitate",
  out_of_stock: "Non disponibile",
};

const ListaProdotti = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { products, deleteProduct } = useProductData();  // Update this line

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((product: { name: string; sku: string; status: string; }) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || product.status === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, products]);

  const handleDelete = (productId: number) => {
    if (window.confirm('Sei sicuro di voler eliminare questo prodotto?')) {
      deleteProduct(productId);
    }
  };

  return (
    <>
      <LeftNavbar>
  <Container fluid className="visualizza-prodotti-page p-3 poppins-regular">
    <Row className="mb-4">
      <Col md={6} className="mb-2">
        <Form.Control
          type="text"
          placeholder="Cerca per nome o codice SKU..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Col>
      <Col md={6}>
        <Form.Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">Tutti i prodotti</option>
          {Object.entries(STATUS_LABELS).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </Form.Select>
      </Col>
    </Row>

    <Row>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <Col key={product.id} md={6} lg={4} className="mb-3">
            <Card className="product-card" style={{ position: 'relative' }}>
              <Button
                onClick={() => handleDelete(product.id)}
                variant="link"
                className="delete-icon"
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '10px',
                  padding: '4px',
                  color: '#dc3545',
                  backgroundColor: 'transparent',
                  border: 'none',
                  zIndex: 2
                }}
              >
                <X size={20} />
              </Button>
              <div
                className={`product-tab ${product.status}`}
                style={{
                  backgroundColor:
                    product.status === "out_of_stock"
                      ? "#dc3545"
                      : product.status === "low_stock"
                      ? "#ffc107"
                      : "green",
                }}
              >
                {STATUS_LABELS[product.status]}
              </div>
              <Card.Body className="text-center">
                <img src={product.image} alt={product.name} className="product-image mb-3" />
                <div className="product-sku">{product.sku}</div>
                <div className="product-name mb-3">{product.name}</div>
                <Button
                  onClick={() => handleShowModal(product)}
                  variant={
                    product.status === "out_of_stock"
                      ? "danger"
                      : product.status === "low_stock"
                      ? "warning"
                      : "success"
                  }
                >
                  Visualizza
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))
      ) : (
        <Col className="text-center">
          <p>Nessun prodotto trovato.</p>
        </Col>
      )}
    </Row>

    {/* Modale per il prodotto selezionato */}
    <ProductModal show={showModal} handleClose={handleCloseModal} product={selectedProduct} />
  </Container>
</LeftNavbar>


      {/* Footer Navbar visibile solo su dispositivi mobili */}
      <div className="d-md-none">
        <NavFooter />
      </div>
    </>
  );
};

export default ListaProdotti;