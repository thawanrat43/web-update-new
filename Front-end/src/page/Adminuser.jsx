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
    const [data ,setData] = useState([]);
    const getdata = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/adminuser`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const getadmin = async ()=>{
        const token = localStorage.getItem('token');
        try{
            const response = await axios.get(`http://localhost:3333/profileid`, {
                headers: {
                  Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })
            setData(response.data);
        } catch (err) {
            console.log(err);
            window.location='/login'
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
        getadmin();
    }, []);
    const headlineStyle = {
        backgroundColor: "#D9D9D9",
        lineHeight: "1.5",
        border: "none",
        color: "black"
    }
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    console.log(data)
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-wh" style={{fontFamily:"Athiti"}}>
                    <Container>

                    <Navbar.Brand href='/adminuser'  className='fs-1'>CHECK</Navbar.Brand>

                            
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3 fs-5" variant="underline" activeKey="1">
                        <Nav.Link eventKey={1} href="/adminuser">รายชื่อผู้ใช้</Nav.Link>
                        
                    <Nav.Link onClick={logout}  >logout</Nav.Link>    
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>   
            <Container fluid  className='' style={{fontFamily:"Athiti",width:'70%'}}>
                {data.map((dataadmin,key)=>
                <div key={key}>
                    <Row  className='d-flex m-4'>
                        <Col>
                            <p className="fs-2 mt-5" >ผู้ใช้</p>
                        </Col>
                        <Col>
                        <Link to={`/adminregister/${dataadmin.id}`} style={{ textDecoration: 'none' }}>
                            <Button href='/adminregister' className='bg-secondary text-white fs-5' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} style={{fontFamily:"Athiti"}}>
                                <p>เพิ่มผู้ใช้</p> 
                            </Button>
                        </Link>
                            
                        </Col>
                        <Col>
                        <Link to={`/adminudelete/${dataadmin.id}`} style={{ textDecoration: 'none' }}>
                            <Button className='bg-secondary text-white fs-5 ' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} style={{fontFamily:"Athiti"}}>
                                <p>ระงับผู้ใช้</p> 
                            </Button>
                        </Link>
                            
                            
                        </Col>    
                    </Row>
                </div>
                )}    
                {user.map((users,key)=>
                    <div key={key} style={{fontFamily:"Athiti"}}>
                        <Link to={`/adminupdate/${users.id}`} style={{ textDecoration: 'none' }}>
                            <Row className='m-3 mt-2 p-1 '  >
                                <div style= { headlineStyle } className='p-1 rounded'>
                                    <Row className='mt-3 ml-5 fs-6' style={{color:"#708090"}}>
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
                                    <Row className='ml-5 fs-6'>
                                        <Col>
                                            <p>{users.fname}  {users.lname}</p>
                                        </Col>
                                        <Col>
                                            <p>{users.email}</p>
                                        </Col>
                                        <Col>
                                            {users.status === '' ? (
                                                <p>แอดมิน</p>
                                            ) : (      
                                                <p>ผู้ใช้ทั่วไป</p>   
                                            )}
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
