import React, { useState, useMemo } from "react";
import { Container, Row, Col, Button, Form, Card } from "react-bootstrap";
import "./VisualizzaProdotti.css";
import LeftNavbar from "../src/componenti/NavbarDesktop";
import NavFooter from "../src/componenti/NavFooter";
import Navbar from "../src/componenti/Navbar";
import ProductModal from "../src/componenti/SingleProduct";

const products = [
  { id: 1, sku: "SKU123", name: "Prodotto A", image: "https://placehold.co/100x100", quantity: 10, status: "available" },
  { id: 2, sku: "SKU456", name: "Prodotto B", image: "https://placehold.co/100x100", quantity: 0, status: "out_of_stock" },
  { id: 3, sku: "SKU789", name: "Prodotto C", image: "https://placehold.co/100x100", quantity: 2, status: "low_stock" },
  { id: 4, sku: "SKU101", name: "Prodotto D", image: "https://placehold.co/100x100", quantity: 5, status: "available" },
  { id: 5, sku: "SKU112", name: "Prodotto E", image: "https://placehold.co/100x100", quantity: 0, status: "out_of_stock" },
  { id: 6, sku: "SKU113", name: "Prodotto F", image: "https://placehold.co/100x100", quantity: 3, status: "low_stock" },
];

const STATUS_LABELS = {
  available: "Disponibile",
  low_stock: "Scorte limitate",
  out_of_stock: "Non disponibile",
};

const VisualizzaProdotti = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Funzioni per gestire la modale
  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  // Filtraggio ottimizzato con useMemo
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product: { name: string; sku: string; status: string; }) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "" || product.status === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, allProducts]);

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
            <Card className="product-card">
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