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
const Adminhistoryuser = () => {
    const { id }  =useParams();
    const [user ,setUser] = useState([]);
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-nr6u.onrender.com/pagestatus/${id}`);
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
    console.log(user);
    console.log(id);
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
                        
                    <Nav.Link onClick={logout}  >logout</Nav.Link>    
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>   
            <Container style={{fontFamily:"Athiti",width:"60%"}}>
                <p className='fs-3 m-4 mt-5 pb-3'>ผู้ที่ตรวจสอบประวัติ</p>
        
                    {user.map((users,key6)=>
                        <div key={key6} className=' m-4 p-1 rounded' style= { headlineStyle }>
                            <Container className='m-2 fs-6' >
                                <Link to={`/adminuserupdate/${users.idhistory}`} style={{color: "#708090",textDecoration: 'none'}}>
                                    <Row className='mt-3 ml-3 fs-6'>
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
                                    <Row className='m ml-3 mb-3 text-black fs-6' >
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
                                
                            </Container>
                            
                        </div> 
                    )}
                
            </Container>
        </div>
    )
}

export default Adminhistoryuser
