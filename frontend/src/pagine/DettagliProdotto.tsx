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
    doc.setFontSize(20);
    doc.text('Dettagli Prodotto', 105, 15, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`SKU: ${product.sku}`, 10, 30);
    doc.text(`Nome: ${product.name}`, 10, 40);
    doc.text(`Stato: ${product.status}`, 10, 50);
    doc.text(`Quantità: ${product.quantity}`, 10, 60);

    // Aggiunta immagine prodotto nel PDF (se disponibile)
    if (product.image) {
      const img = new Image();
      img.src = product.image;
      img.onload = () => {
        doc.addImage(img, 'JPEG', 10, 70, 50, 50);
        doc.save(`prodotto_${product.sku}.pdf`);
      };
    } else {
      doc.save(`prodotto_${product.sku}.pdf`);
    }
  };

  return (
    <Container className="dettagli-prodotto-page text-center">
      <h1 className="page-title">Dettagli Prodotto</h1>
      <Card className="product-details-card shadow-lg border-0">
        <Card.Body>
          <div className="product-info">
            <h5 className="product-sku">SKU: {product.sku}</h5>
            <h4 className="product-name">Nome: {product.name}</h4>
            <p className="product-status">Stato: <strong>{product.status}</strong></p>
            <p className="product-quantity">Quantità: <strong>{product.quantity}</strong></p>
          </div>
          {product.image && (
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
            </div>
          )}
          <div className="button-group mt-3">
            <Button variant="outline-dark" onClick={downloadPDF} className="download-button me-2">
              Scarica PDF
            </Button>
            <Button variant="dark" onClick={() => navigate('/lista-prodotti')} className="back-button">
              Torna ai Prodotti
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DettagliProdotto;
