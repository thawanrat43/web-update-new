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
import { useContext } from "react";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const Adminupdate = () => {
    const { userid }  =useParams();
    const [user ,setUser] = useState([]);
    const handleClick = async (e) => {

    };
    const getdata = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/profile/${userid}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
            
        getdata();
       
    }, []);
    console.log(user);
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
            <Container className='pl-5'>
                <div className='mb-4 mt-5'>
                    <span>รายละเอีอดผู้ใช้</span>
                </div>
                {user.map((users,key1)=>          
                    <div key={key1}>
                        <Row>
                            <Col>
                                
                                <Form.Control
                                    type="text"
                                    placeholder={users.username}
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
                                    placeholder={users.fname}
                                    aria-label="Disabled input example"
                                    disabled
                                    readOnly
                                                        
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={users.lname}
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
                                    placeholder={users.phonenum}
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
                                    placeholder={users.email}
                                    aria-label="Disabled input example"
                                    disabled
                                    readOnly
                                />
                                                
                            </Col>
                        </Row>
                        
                        <br/>
                        <div className=" m-2 d-flex justify-content-end">
                            <Row  className='d-flex m-4'>
                                
                                <Col>
                                    <Link to={`/adminhistoryuser/${users.id}`}>
                                        <Button className='bg-secondary' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} onClick={handleClick} style={{width : 150 }}>
                                            <p className='m-1'>เพิ่มประวัติผู้ใช้</p> 
                                        </Button>
                                    </Link>
                                </Col>    
                            </Row>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Adminupdate
