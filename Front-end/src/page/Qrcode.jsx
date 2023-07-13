import React from 'react'
import Bar from '../compament/Bar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
const Qrcode = () => {
  return (
    <div>
      <Bar/>
      <Container>
          <p>ชำระเงิน</p>
          <p1>จำนวนที่ต้องชำระ :</p1>
      </Container>
    </div>
  )
}

export default Qrcode
