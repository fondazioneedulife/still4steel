import React from 'react';
import { Row } from 'react-bootstrap';
import {Container} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
import {Button} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../routes/login.css';
function loadingPage(){
    const navigate = useNavigate();
    return (
        <Container fluid className="vh-100">
            <Row className='h-100'>
                <Col xs={12} md={4} className="bg-black d-flex justify-content-center align-items-center">
                    <img src="/logoDaColorare.png" alt="" />
                </Col>
                <Col xs={12} md={8} className="bg-white d-flex justify-content-center align-items-center flex-column">
                    <div className='w-75'>
                        <h2 className='mb-5 poppins-bold'>Benvenuti su MEMO,</h2>
                        <p className='poppins-loading' >il gestionale semplice, intuitivo e leggero che ti aiuta ad organizzare al meglio il tuo lavoro. Gestisci tutto con pochi clic, senza complicazioni.</p>
                    </div>
                    <div className="container-buttons w-100">
                        <div className="buttons mt-5 d-flex justify-content-around ">
                            <Button onClick={()=>navigate("/login")} variant='primary'>LOGIN</Button>
                            <Button onClick={()=>navigate("/register")} variant='primary'>REGISTRATI</Button>
                        </div>
                    </div>
                </Col>
            
            </Row>
        </Container>
    )
}

export default loadingPage;