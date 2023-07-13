import React from 'react'
import Status from '../compament/Status'
import Bar from '../compament/Bar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
const Pagestatus = () => {
  return (
    <div>
        <Bar/>
        <Container className='m-5 '>
            <p>สถานะการตรวจประวัติ</p>
            <Row>
                <Status/>
            </Row>
            <br/>
            <Row>
                <Status/>
            </Row>
            <br/>
            <Row>
                <Status/>
            </Row>
        </Container>
    </div>
  )
}

export default Pagestatus