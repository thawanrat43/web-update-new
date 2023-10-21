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
    const token = async () =>{
        const token = localStorage.getItem('token');
        try{
            const response = await axios.get(`https://back-end-nr6u.onrender.com/token`,{
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }})
            .then((response) => {
                if (response.data.error) {
                    window.location='/login'
                }
                });
        } catch (err) {
            console.log(err);
            window.location='/login'
        }
    }
    useEffect(() => {
        token();    
        getdata();
       
    }, []);
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-wh" style={{fontFamily:"Athiti"}}>
                    <Container>

                    <Navbar.Brand href='/adminuser' className='fs-1'>CHECK</Navbar.Brand>

                            
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3 fs-5" variant="underline" activeKey="1">
                        <Nav.Link eventKey={1} href="/adminuser">รายชื่อผู้ใช้</Nav.Link>
                        
                    <Nav.Link onClick={logout}  >logout</Nav.Link>    
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>   
            <Container className='pl-5' style={{fontFamily:"Athiti",width:'60%'}}>
                <div className='mb-4 mt-5 mb-2' >
                    <span className='fs-3'>รายละเอียดผู้ใช้</span>
                </div>
                {user.map((users,key1)=>          
                    <div key={key1}>
                        <Row>
                            <Col xs lg="2" className=' pt-1 fs-5 '>
                                ชื่อผู้ใช้
                            </Col>
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
                            <Col xs lg="2" className=' pt-1 fs-5 '>
                                ชื่อ-นามสกุล
                            </Col>
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
                            <Col xs lg="2" className=' pt-1 fs-5'>
                            เบอร์โทรศัพท์
                            </Col>
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
                            <Col xs lg="2" className=' pt-1 fs-5'>
                                E-mail
                            </Col>
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
                                        <Button className='bg-secondary' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} onClick={handleClick} style={{width : "100%" }} >
                                            <p className='m-1 ' style={{fontFamily:"Athiti",fontSize:"120%"}}>รายละเอียดผู้ที่ตรวจสอบประวัติ</p> 
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
