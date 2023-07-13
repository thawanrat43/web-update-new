import React from 'react'
import Bar from '../compament/Bar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
const Pay = () => {
  return (
    <div>
        <Bar/>
        <Container className='m-5 p-5'>
            <p>ช่องทางการชำระเงิน</p>
            <div>
                <Button className=''  variant="primary" size="lg">
                  <div className='mt-1 d-flex'>
                    <i class="bi bi-qr-code-scan"></i>
                    <p className='ml-3 mt-1'>QRcode</p>
                  </div>
                  
                </Button>{' '}
            </div>
        </Container>
    </div>
  )
}

export default Pay
