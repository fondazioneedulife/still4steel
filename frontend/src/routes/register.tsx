import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './login.css'
import { Link } from 'react-router-dom';


function RegisterForm() {
  return (
    <Container fluid="sm" className='d-flex justify-content-center align-items-center vh-100'>
    <Form>
      <img src="/logoRemoveNero.png" className='pb-5' alt="" />
      <Form.Group className="mb-3" controlId="formBasicNome">
        <Form.Control className='custom-control-bg' type="text" placeholder="Nome" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCognome">
        <Form.Control className='custom-control-bg' type="text" placeholder="Cognome" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control className='custom-control-bg' type="email" placeholder="Email" />
      </Form.Group>

      <Form.Group className="" controlId="formBasicPassword">
        <Form.Control className='custom-control-bg' type="password" placeholder="Password" />
      </Form.Group>

      
      <div className="d-flex justify-content-center align-items-center flex-column pt-4 ">
        <Button className='custom-submit-bg w-75' type="submit">
          REGISTRATI
        </Button>
        {/* <div className="font-small">Hai già un account?<a className="link-opacity-75-hover " href="#">Accedi</a></div> */}
        <Link to="/login" className='font-small'>Hai già un account? Accedi</Link>
      </div>
    </Form>
    </Container>
  );
}

export default RegisterForm;