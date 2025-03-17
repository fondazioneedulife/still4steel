import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './login.css';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token); // Salva il token di autenticazione
        window.location.href = '/home'; // Reindirizza dopo il login
      } else {
        setError(data.message || 'Credenziali non valide');
      }
    } catch (err) {
      setError('Errore di connessione al server');
    }
  };

  return (
    <Container fluid="sm" className="d-flex justify-content-center align-items-center vh-100">
      <Form onSubmit={handleLogin}>
        <img src="/logoRemoveNero.png" className="pb-5" alt="Logo" />
        
        {error && <p className="text-danger">{error}</p>}

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            className="custom-control-bg"
            type="email"
            placeholder="Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="" controlId="formBasicPassword">
          <Form.Control
            className="custom-control-bg"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group>
          <p><a className="link-opacity-75-hover font-small" href="change-password">Password dimenticata?</a></p>
        </Form.Group>

        <div className="d-flex justify-content-center align-items-center flex-column pt-4">
          <Button className="custom-submit-bg w-75" type="submit">
            LOGIN
          </Button>
          <div className="font-small">Non hai un account? <a className="link-opacity-75-hover" href="register">Registrati</a></div>
        </div>
      </Form>
    </Container>
  );
}

export default LoginForm;
