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
import Modal from '../compament/Modal';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Swal from 'sweetalert2';
const admindelete = () => {
    const { userid }  = useParams();
    const [user ,setUser] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const getdata = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/adminuser`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const tokenn = async () =>{
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
        tokenn();   
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
                        
                    <Nav.Link onClick={logout} >logout</Nav.Link>    
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>   
            <Container   className='' style={{fontFamily:"Athiti",width:'70%'}}>
                <Row  className='d-flex m-4'>
                    <Col>
                        <p className="fs-2 mt-5" >ระงับผู้ใช้</p>
                    </Col>
                    <Col>
                        <Button href='/adminregister' className='bg-secondary text-white fs-5' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} onClick={handleClick} style={{fontFamily:"Athiti"}}>
                            <p>เพิ่มผู้ใช้</p> 
                        </Button>
                    </Col>
                    <Col>
                        <Button href='/adminuser' className='bg-secondary text-white fs-5' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} onClick={handleClick} style={{fontFamily:"Athiti"}}>
                            <p>ระงับผู้ใช้</p> 
                        </Button>
                    </Col>    
                </Row>
                {user.map((users,key2)=>
                    <div key={key2} style={{fontFamily:"Athiti"}}>
                         <Row className='m-3 mt-2' >
                            
                                <Col style= { headlineStyle } xs lg="14" className='p-3 rounded'>
                                    
                                        <Row className=' fs-6 ' style={{color:"#708090"}}>
                                            <Col className='ml-5'>
                                                <p>ชื่อผู้ใช้</p>
                                            </Col>
                                            <Col className=''>
                                                <p>E-mail</p>
                                            </Col>
                                            <Col className=''>
                                                <p>สถานะ</p>
                                            </Col>
                                            
                                        </Row>
                                        <Row className=' fs-6 ' >
                                            <Col className='ml-5'>
                                                <p>{users.fname}   {users.lname}</p>
                                            </Col>
                                            <Col >
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
                                    
                                   
                                    
                                </Col>
                                <Col className='d-flex justify-content-end   fs-5 mt-4 ml-3' xs lg="1" >
                                   
                                    <Link to={`/delete/${users.id}`}>
                                        <Button  className="bi bi-trash-fill openModalBtn fs-1"style={{color:'black' , }} >
                                        </Button>
                                    </Link>
                                    
                                
                                </Col>
                                
                            
                        </Row>
                        
                    </div>
                    
                )}
                    
            </Container>
        </div>
    )
}

export default admindelete
