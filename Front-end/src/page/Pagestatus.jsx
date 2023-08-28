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
import LinkContainer from 'react-router-bootstrap/LinkContainer';
const Pagestatus = () => {
    const { id }  =useParams();
    const [user ,setUser] = useState([]);
    const [profile,setProfile] =useState([]);
    const getdata = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/pagestatus/${id}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const getprofile = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/profile/${id}`);
            setProfile(response.data);
            
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
            
        getdata();
        getprofile();
    }, []);
    
    console.log(user);
    console.log(id);
    const headlineStyle = {
        backgroundColor: "#D9D9D9",
        lineHeight: "1.5",
        border: "none",
        color: "black"
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
        <div>
            
            <div>
                {profile.map((profiles,key15)=>
                <Navbar key={key15} collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                            <Link to={`/`}>
                                <Navbar.Brand >CHECK</Navbar.Brand>
                            </Link>
                            
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="3" >
                            
                                <LinkContainer to={`/`} className='mr-3 mt-4' style={{ textDecoration: 'none' }} >
                                    <Nav.Link eventKey="1">ตรวจประวัติ</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={`/pagestatus/${id}`} className='mr-3 mt-4' style={{ textDecoration: 'none' }}>
                                    <Nav.Link  eventKey="3" >สถานะการตรวจประวัติ</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={`/profile/${id}`}  >
                                        <Nav.Link eventKey="4" className='ml-2 mr-3 '>
                                            <Image src={"http://localhost:3333/"+profiles.profilepic}roundedCircle style={{width : '3rem'}} />
                                    </Nav.Link>
                                </LinkContainer>
                                        
                                    
                                <Nav.Link eventKey="2" onClick={logout} className='mt-4'>logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                )}
                <Container >
                    <p className='fs-3 m-4 mt-5'>สถานะการตรวจประวัติ</p>
            
                        {user.map((users,key4)=>
                            
                            <div key={key4} className=' m-4 p-1' style= { headlineStyle }>
                                <Container className='m-2 fs-6' >
                                    {users.pay === 'เสร็จสิ้น' ? (
                                         <Link to={`/history/${users.idhistory}`} style={{color: "#708090" ,textDecoration: 'none'}}>
                                            <Row className='mt-3 ml-3'>
                                                <Col>
                                                    <p>ชื่อ-นามสกุล</p>
                                                </Col>
                                                <Col>
                                                    <p>หมายเลขประจำตัวประชาชน</p>
                                                </Col>
                                                <Col>
                                                    <p>สถานะ</p>
                                                </Col>
                                            </Row>
                                            <Row className='m ml-3 mb-3 text-black'>
                                                <Col>
                                                    <p>{users.type_id} {users.fname} {users.lname} </p>
                                                </Col>
                                                <Col>
                                                    <p>{users.idcard}</p>
                                                </Col>
                                                <Col >
                                                    <p>{users.pay}</p>
                                                </Col>
                                            </Row>
                                        </Link>        

                                    ) : (
                                        <Link to={`/qrcode/${users.idhistory}`} style={{color: "#708090" ,textDecoration: 'none'}}>
                                        <Row className='mt-3 ml-3'>
                                            <Col>
                                                <p>ชื่อ-นามสกุล</p>
                                            </Col>
                                            <Col>
                                                <p>หมายเลขประจำตัวประชาชน</p>
                                            </Col>
                                            <Col>
                                                <p>สถานะ</p>
                                            </Col>
                                        </Row>
                                        <Row className='m ml-3 mb-3 text-black'>
                                            <Col>
                                                <p>{users.type_id} {users.fname} {users.lname} </p>
                                            </Col>
                                            <Col>
                                                <p>{users.idcard}</p>
                                            </Col>
                                            <Col >
                                                <p>{users.pay}</p>
                                            </Col>
                                        </Row>
                                    </Link>
                                    )}
                                   
                                    
                                </Container>
                                
                            </div> 
                        )}
                    
                    
                    
                </Container>
            </div>
        </div>
        
    )
}

export default Pagestatus