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
const Code = () => {
  return (
    <div>
        <Barprofile/>
        <Container>
            <div className='d-flex p-5'>
                <Card style={{ width: '18rem'  }} className='m-5'>
                    <Card.Body>
                        <Row>
                        <Col xs={6} md={4}> 
                            <Image src="./public/10.webp" roundedCircle style={{width : '16rem'}} />
                        </Col>
                        </Row>
                        <Row className='p-3'>
                            <Button variant="secondary" size="lg">
                                ประวัติส่วนตัว
                            </Button>
                          
                        </Row>
                        <Row className='p-3'>
                            <Button variant="secondary" size="lg">
                                เปลี่ยนรหัสผ่าน
                            </Button>
                          
                        </Row>
                        
                    </Card.Body>
                </Card>
                <div className='pl-5'>
                    <div className='mb-4 mt-5'>
                        <p1 >เปลี่ยนรหัสผ่าน</p1>
                    </div>        
                    <div>
                        <FloatingLabel controlId="floatingTextarea" label="รหัสผ่านเดิม" className="mb-3">
                            <Form.Control as="textarea" placeholder="Leave a comment here" />
                        </FloatingLabel>            
                       
                        <FloatingLabel controlId="floatingTextarea" label="รหัสผ่านใหม่" className="mb-3">
                            <Form.Control as="textarea" placeholder="Leave a comment here" />
                        </FloatingLabel>   
                        
                        <FloatingLabel controlId="floatingTextarea" label="ยืนยันรหัสผ่าน" className="mb-3">
                            <Form.Control as="textarea" placeholder="Leave a comment here" />
                        </FloatingLabel> 
                    </div>
                </div>
            </div>
        </Container> 
            
    </div>
  )
}

export default Code
