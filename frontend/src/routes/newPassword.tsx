
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import './login.css'
import { Link } from 'react-router-dom';


function NewPasswordForm() {
  return (
    <Container fluid="sm" className='d-flex justify-content-center align-items-center vh-100'>
    <Form>
      <img src="/logoRemoveNero.png" className='pb-5' alt="" />
      <Form.Group className="mb-3" controlId="formBasicNome">
        <Form.Control className='custom-control-bg' type="text" placeholder="Username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPsw">
        <Form.Control className='custom-control-bg' type="password" placeholder="Nuova Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRepeatPsw">
        <Form.Control className='custom-control-bg' type="password" placeholder="Ripeti Password" />
      </Form.Group>
      
      <div className="d-flex justify-content-center align-items-center flex-column pt-4 ">
        <Button className='custom-submit-bg w-75' type="submit">
          CAMBIA PASSWORD
        </Button>
        {/* <div className="font-small">Hai già un account?<a className="link-opacity-75-hover " href="#">Accedi</a></div> */}
        <Link to="/login" className='font-small'>Hai già un account? Accedi</Link>
      </div>
    </Form>
    </Container>
  );
}

export default NewPasswordForm;