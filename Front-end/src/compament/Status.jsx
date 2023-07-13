import React from 'react'
import { Container } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Status = () => {
  return (
    <div style={{
        backgroundColor: 'lightgrey',
        width: '50rem',
        height: '8rem'
      }}>  
        <div className='d-flex'>
            <Container className='m-2'>
                <Row className='mt-3 ml-3'>
                    <Col>
                        <p2>ชื่อ-นามสกุล</p2>
                    </Col>
                    <Col>
                        <p2>หมายเลขประจำตัวประชาชน</p2>
                    </Col>
                    <Col>
                        <p2>สถานะ</p2>
                    </Col>
                </Row>
                <Row className='mt-3 ml-3'>
                    <Col>
                        <p3>นาย เอก วรรณยุกต์  </p3>
                    </Col>
                    <Col>
                        <p3>xxxxxxxxxxxxx</p3>
                    </Col>
                    <Col >
                        <p3>กำลังตรวจสอบ</p3>
                    </Col>
                </Row>
            </Container>
        </div> 
    </div>
  )
}

export default Status