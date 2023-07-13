import React from 'react'
import Bar from '../compament/Bar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Barprofile from '../compament/Barprofile';
const Finish = () => {
  return (
    <div>
        <Barprofile/>
        <Container>
            <p>ชำระเงินเสร็จสิ้น</p>
            <Row className="align-items-center m-5">
                <Col xs lg="4">
                    <Button variant="secondary" size="lg">
                        <p>ไปหน้าตรวจประวัติ</p>
                    </Button>{' '}
                </Col>
                <Col xs lg="4">
                    <Button variant="secondary" size="lg">
                        <p>ไปหน้าสถานะการตรวจสอบ</p>
                    </Button>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default Finish