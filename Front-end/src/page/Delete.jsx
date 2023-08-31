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
import { Margin, SettingsRemoteSharp } from '@mui/icons-material';
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
const Delete = () => {
    const { id }  = useParams();
    const [user ,setUser] = useState([]);
    const getdata = async ()=>{
        try{
            const response = await axios.get(`/api/profile/${id}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
        console.log(user);
        console.log(id);
    }
    useEffect(() => {
            
        getdata();
       
    }, []);
    const deletedata = async () => {
        try{
            await axios.post(`/api/admindelete/${id}`
            )
            .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
            });
        }catch (err) {
            console.log(err);
        }
    }
    const headlineStyle = {
        backgroundColor: "#F5F5F5",
        lineHeight: "1.5",
        border: "none",
        color: "#708090",
        fontFamily: "Arial",
        marginTop:"100",
        
    }
    const navStyle = {
        lineHeight: "1.5",
        border: "none",
        color: "#708090"
    
    }
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    return (
        <div >
            {user.map((users,key3)=>
            <div key={key3}>
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                            <Link to={`/adminuser/${id}`}>
                                <Navbar.Brand >CHECK</Navbar.Brand>
                            </Link>
                            
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="justify-content-end flex-grow-1 pe-3 ">
                            <Link to={`/adminuser/${id}`} className='mr-2' style={{ textDecoration: 'none' }}>
                                <Navbar style={navStyle} >ตรวจประวัติ</Navbar>
                            </Link>
                            <Link to={`/pagestatus/${id}`} style={{ textDecoration: 'none' }}>
                                <Navbar style={navStyle} >สถานะการตรวจประวัติ</Navbar>
                            </Link>
                            
                            {/* <Nav.Link href="/login">Login</Nav.Link>
                                <Nav.Link href="/register">Register</Nav.Link> */}
                            <Nav.Link onClick={logout}>logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            
                <Container className='p-5 '>
                
                    <div   style={headlineStyle} className='m-xl-5 p-xxl-5 fs-3'>
                        <div className=' d-flex justify-content-center mt-5 mb-3'>
                            <Row >
                                <Col>
                                    <p>คุณต้องการลบผู้ใช้</p>
                                </Col>
                            </Row>
                        </div>
                    
                        <div className=' d-flex justify-content-center mb-3 text-black'>
                            <Row>
                                <Col>
                                    <p>คุณ {users.fname} {users.lname}</p>
                                </Col>
                            </Row>
                        </div>
                        <div className=' d-flex justify-content-center mb-5 mt-5 text-black'>
                            <Row>
                                <Col>
                                    <Button href='/adminudelete' onClick={deletedata} className='fs-4 mr-3 text-black ' style={{backgroundColor:'#3CB371',width:90,height:60}}>
                                        <p className='px-2 mt-1'>ยืนยัน</p>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button href='/adminudelete' className='fs-4 ml-3 text-black'style={{backgroundColor:'#CD5C5C',width:90,height:60}}>
                                        <p>ยกเลิก</p>
                                    </Button>
                                </Col>
                                

                            </Row>
                        </div>
                    
                    </div>

                
                    
                </Container>
            </div>
            )}
        </div>
    )
}

export default Delete
