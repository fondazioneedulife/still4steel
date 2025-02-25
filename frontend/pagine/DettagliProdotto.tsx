import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Card, Container } from 'react-bootstrap';
import './DettagliProdotti.css';
import jsPDF from 'jspdf';

const DettagliProdotto: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product; 
  // Funzione per scaricare i dettagli come PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Titolo del PDF
    doc.setFontSize(18);
    doc.text('Dettagli Prodotto', 10, 10);

    // Dettagli del prodotto
    doc.setFontSize(12);
    doc.text(`SKU: ${product.sku}`, 10, 20);
    doc.text(`Nome: ${product.name}`, 10, 30);
    doc.text(`Stato: ${product.status}`, 10, 40);
    doc.text(`Quantità: ${product.quantity}`, 10, 50);
    doc.text(`Immagine: ${product.image}`, 10, 60);

    // Salva il PDF
    doc.save(`prodotto_${product.sku}.pdf`);
  };

  return (
    <Container className="dettagli-prodotto-page">
      <h1 className="page-title">Dettagli Prodotto</h1>
      <Card className="product-details-card">
        <Card.Body>
          <div className="product-sku">SKU: {product.sku}</div>
          <div className="product-name">Nome: {product.name}</div>
          <div className="product-status">Stato: {product.status}</div>
          <div className="product-quantity">Quantità: {product.quantity}</div>
          <div className="product-image">
            <img src={product.image} alt={product.name} className="product-image" />
          </div>
          <Button variant="outline-dark" onClick={downloadPDF} className="download-button">
            Scarica PDF
          </Button>
          <Button variant="dark" onClick={() => navigate('/visualizza-prodotti')} className="back-button">
            Torna ai Prodotti
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DettagliProdotto;