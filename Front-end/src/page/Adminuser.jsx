import React,{useEffect, useState} from 'react'
import Bar from '../compament/Bar'
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
import { useLocation, useParams,Link } from "react-router-dom";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Button from '@mui/material/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const Adminuser = () => {
    const [user ,setUser] = useState([]);
    const getdata = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/adminuser`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(user);
    useEffect(() => {
            
        getdata();
       
    }, []);
    const handleClick = async (e) => {

    };
    const headlineStyle = {
        backgroundColor: "#D9D9D9",
        lineHeight: "1.5",
        border: "none",
        color: "black"
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>

                    <Navbar.Brand href='/' >CHECK</Navbar.Brand>

                            
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="1">
                        <Nav.Link eventKey={1} href="/adminuser">รายชื่อผู้ใช้</Nav.Link>
                        
                    <Nav.Link  >logout</Nav.Link>    
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>   
            <Container fluid  className=' p-5 ' >
                <Row  className='d-flex m-4'>
                    <Col>
                        <p className="fs-1" >ผู้ใช้</p>
                    </Col>
                    <Col>
                        <Button href='/adminregister' className='bg-secondary text-white' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} onClick={handleClick}>
                            <p>เพิ่มผู้ใช้</p> 
                        </Button>
                    </Col>
                    <Col>
                        <Button href='/adminudelete' className='bg-secondary text-white' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} onClick={handleClick}>
                            <p>ระงับผู้ใช้</p> 
                        </Button>
                    </Col>    
                </Row>
                {user.map((users,key)=>
                    <div key={key} >
                        <Link to={`/adminupdate/${users.id}`} style={{ textDecoration: 'none' }}>
                            <Row className='m-3 mt-3 p-3'  >
                                <div style= { headlineStyle }>
                                    <Row className='mt-3 ml-5 '>
                                        <Col>
                                            <p>ชื่อผู้ใช้</p>
                                        </Col>
                                        <Col>
                                            <p>E-mail</p>
                                        </Col>
                                        <Col>
                                            <p>สถานะ</p>
                                        </Col>
                                    </Row>
                                    <Row className='ml-5 fs-5'>
                                        <Col>
                                            <p>{users.fname}  {users.lname}</p>
                                        </Col>
                                        <Col>
                                            <p>{users.email}</p>
                                        </Col>
                                        <Col>
                                            <p>ผู้ใช้ทั่วไป</p>
                                        </Col>
                                    </Row>
                                </div>

                            </Row>
                        </Link>
                        
                    </div>
                    
                )}
                    
            </Container>
        </div>
    )
}

export default Adminuser
