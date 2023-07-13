import React from 'react'
import Bar from '../compament/Bar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import './Style.css';

const History = () => {
  return (
    <div>
        <Bar/>
        <Container className='mt-5 pt-5'>
            <p>ประวัติ</p>
            <div className='mt-4' style={{
                backgroundColor: 'lightgrey',
                width: '70rem',
                height: '20rem'
            }} >
                <div className='pt-5 pl-5 ml-5'>
                    <Row>
                        <Col>
                            <p2>
                                ชื่อ-นามสกุล
                            </p2>
                        </Col>
                        <Col>
                            <p2>
                                หมายเลขบัตรประจำตัวประชาชน
                            </p2>
                        </Col>
                        <Col>
                            <p2>
                                วันเดือนปีเกืด
                            </p2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p3>
                                นาย เอก วรรณยุกต์
                            </p3>
                        </Col>
                        <Col>
                            <p3>
                                xxxxxxxxxxxxx
                            </p3>
                        </Col>
                        <Col>
                            <p3>
                                xx-xx-xxxx
                            </p3>
                        </Col>
                    </Row>
                </div>

                <div className='pt-3 pl-5 ml-5'>
                    <Row>
                        <Col>
                            <p2>
                                บิดา
                            </p2>
                        </Col>
                        <Col>
                            <p2>
                                มารดา
                            </p2>
                        </Col>
                        <Col>
                            <p2>
                                ศาสนา
                            </p2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p3>
                                xxxxxxxxxxxxx
                            </p3>
                        </Col>
                        <Col>
                            <p3>
                                xxxxxxxxxxxxx
                            </p3>
                        </Col>
                        <Col>
                            <p3>
                                xxxxxxxxxxxxx
                            </p3>
                        </Col>
                    </Row>
                </div> 

                <div className='pt-3 pl-5 ml-5'>
                    <Row>
                        <Col>
                            <p2>
                                ประวัติอาชญากร
                            </p2>
                        </Col>
                        <Col>
                            <p2>
                                เครดิตบูโร
                            </p2>
                        </Col>
                        <Col>
                            <p2>
                                คดีล้มละลาย
                            </p2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p3>
                                ไม่มี
                            </p3>
                        </Col>
                        <Col>
                            <p3>
                                -
                            </p3>
                        </Col>
                        <Col>
                            <p3>
                                -
                            </p3>
                        </Col>
                    </Row>
                </div>

                <div className='pt-3 pl-5 ml-5'>
                    <Row>
                        <Col>
                            <p2>
                                คดีอาญา
                            </p2>
                        </Col>
                        <Col>
                            <p2>
                                global sanction
                            </p2>
                        </Col>
                        <Col>
                            <p2>
                                อื่นๆ
                            </p2>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p3>
                                -
                            </p3>
                        </Col>
                        <Col>
                            <p3>
                                -
                            </p3>
                        </Col>
                        <Col>
                            <p3>
                                -
                            </p3>
                        </Col>
                    </Row>
                </div>    
            </div>
        </Container>
    </div>
  )
}

export default History