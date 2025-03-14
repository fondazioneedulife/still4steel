import React from "react";
import { Modal, Button } from "react-bootstrap";

const ProductModal = ({ show, handleClose, product }) => {
  if (!product) return null;

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="poppins-regular">{product.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="poppins-regular">
        <img src={product.image} alt={product.name} className="img-fluid mb-3" />
        <p><strong>SKU:</strong> {product.sku}</p>
        <p><strong>Quantità:</strong> {product.quantity}</p>
        <p><strong>Stato:</strong> {product.status}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Chiudi</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;
