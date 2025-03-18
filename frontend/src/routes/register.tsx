import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './login.css';
import { Link } from 'react-router-dom';

function RegisterForm() {
  const [name, setName] = useState('');
  const [vat, setVat] = useState('');
  const [tax_code, setTax_code] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dati, setDati] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, vat, tax_code, phone, email, address, password, dati }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Salva il token di autenticazione
        window.location.href = '/login'; // Reindirizza dopo la registrazione
      } else {
        setError(data.message || 'Registrazione non valida');
      }
    } catch (err) {
      setError('Errore di connessione al server');
    }
  };

  return (
    <Container fluid="sm" className='d-flex justify-content-center align-items-center vh-100'>
      <Form onSubmit={handleRegister}>
        <img src="/logoRemoveNero.png" className='pb-5' alt="" />
        <Form.Group className="mb-3" controlId="formBasicNome">
          <Form.Control
            className='custom-control-bg'
            type="text"
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className='custom-control-bg'
            type="text"
            placeholder="VAT"
            value={vat}
            onChange={(e) => setVat(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className='custom-control-bg'
            type="text"
            placeholder="tax_code"
            value={tax_code}
            onChange={(e) => setTax_code(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className='custom-control-bg'
            type="text"
            placeholder="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className='custom-control-bg'
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className='custom-control-bg'
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="" controlId="formBasicPassword">
          <Form.Control
            className='custom-control-bg'
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Check
            type="checkbox"
            label="Ho letto, compreso e accettato la privacy policy e i termini e condizioni (obbligatorio)"
            checked={dati}
            onChange={(e) => setDati(e.target.checked)}
            required
          />
          <Form.Control.Feedback type="invalid">Devi accettare i termini e le condizioni</Form.Control.Feedback>
        </Form.Group>

        {error && <p className="text-danger">{error}</p>}

        <div className="d-flex justify-content-center align-items-center flex-column pt-4 ">
          <Button className='custom-submit-bg w-75' type="submit">
            REGISTRATI
          </Button>
          <Link to="/login" className='font-small'>Hai già un account? Accedi</Link>
        </div>
      </Form>
    </Container>
  );
}

export default RegisterForm;