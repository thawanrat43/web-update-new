import React from 'react'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Barprofile from '../compament/Barprofile';
import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
const Image = () => {
    const { userid }  = useParams();
    const [user ,setUser] = useState([]);
    const getdata = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/image/${userid}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
            
        getdata();
       
    }, []);  
    return (
        <div>
            <Card style={{ width: '18rem'  }} className='m-5'>
                            
                <Card.Body>
                    <Row>
                        <Col xs={6} md={4}> 
                            {user.map((data)=>(
                                <Image  src={data.profilepic}roundedCircle style={{width : '16rem'}} />
                                ))}
                        </Col>
                    </Row>
                    <Row className='p-3'>
                        <Button href='/proflie' className='bg-secondary'  type="submit" fullWidth variant="contained"  sx={{ mt: 3 }}>
                                    ประวัติส่วนตัว
                        </Button>
                                
                    </Row>
                    <Row className='p-3'>
                        <Button href='/code' className='bg-secondary' type="submit" fullWidth variant="contained"  sx={{  mb: 2 }}>
                                    เปลี่ยนรหัสผ่าน
                        </Button>
                                
                    </Row>
                                
                </Card.Body>
                        
            </Card>
        </div>
    )
}

export default Image
