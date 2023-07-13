import React,{useEffect, useState} from 'react'
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
import { key } from 'localforage';
import { SettingsRemoteSharp } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
const Profile = () => {
    const [user, setUser] = useState(null);
    const { userId } = useParams();
    const token = useSelector((state) => state.token);
    event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsondata = {
            email: data.get('email'),
            fname: data.get('firstName'),
            lname: data.get('lastName'),
            username : data.get('username'),
            phonenum : data.get('phonenum')
            

        };
    const getUser = async () => {
        const response = await fetch(`http://localhost:3333/profile/{userId}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setUser(data);
      };
    
    useEffect(() => {
        getUser();   
    },[])  
    if (!user) return null;
    return (
        <div>
            <Barprofile/>
            <Container >
                {attraction.map (attractions=> 
                    <p key={attraction.id}>{attraction.username}</p>
                )}
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
                            <p1 >ประวัติส่วนตัว</p1>
                        </div>
                        
                        <div>
                            <Row>
                                <Col>
                                    <Form.Control
                                            type="text"
                                            placeholder="ชื่อผู้ใช้"
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                    />
                                    
                                </Col>
                                
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <Form.Control
                                            type="text"
                                            placeholder="ชื่อ"
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                            
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                            type="text"
                                            placeholder="นามสกุล"
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                    />
                                </Col>
                                
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <Form.Control
                                            type="text"
                                            placeholder="หมายเลขโทศัพท์"
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                    />
                                    
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <Form.Control
                                            type="text"
                                            placeholder="E-mail"
                                            aria-label="Disabled input example"
                                            disabled
                                            readOnly
                                    />
                                    
                                </Col>
                            </Row>
                            <br/>
                            {/* {userlist.map((val,key) =>{
                                return(
                                    <div>
                                        <p> ชื่อผู้ใช้ : {val.username}</p>
                                    </div>
                                )
                            })} */}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Profile