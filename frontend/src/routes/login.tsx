import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './login.css'


function LoginForm() {
  return (
    <Container fluid="sm" className='d-flex justify-content-center align-items-center vh-100'>
    <Form>
      <img src="/logoRemoveNero.png" className='pb-5' alt="" />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control className='custom-control-bg' type="email" placeholder="Username" />
      </Form.Group>

      <Form.Group className="" controlId="formBasicPassword">
        <Form.Control className='custom-control-bg' type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group>
        <p><a className="link-opacity-75-hover font-small " href="change-password">Password dimenticata?</a></p>
      </Form.Group>
      <div className="d-flex justify-content-center align-items-center flex-column pt-4 ">
        <Button className='custom-submit-bg w-75' type="submit">
          LOGIN
        </Button>
        <div className="font-small">Non hai un account? <a className="link-opacity-75-hover " href="register">Registrati</a></div>
      </div>
    </Form>
    </Container>
  );
}

export default LoginForm;