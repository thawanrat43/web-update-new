import React,{useEffect,useState} from "react";
import Bar from "../compament/Bar";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";
import Barprofile from "../compament/Barprofile";
import TextField from '@mui/material/TextField';
import {useParams} from 'react-router-dom';
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import sessionstorage from 'sessionstorage';
import { useNavigate } from "react-router-dom";

const Historyfinish = () => {
    const [user ,setUser] = useState([]);
    const token = localStorage.getItem('token');
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-nr6u.onrender.com/profileid`, {
                headers: {
                  Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const tokenn = async () =>{
       
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
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    
    return (
        <div>
        {user.map((users,key13)=>(
            <div  key={key13}>
            <div>
                <Navbar collapseOnSelect expand="lg" className="bg-wh">
                    <Container>
                            <Link to={`/home`}>
                                <Navbar.Brand style={{fontFamily:"Athiti"}} className="fs-1" >CHECK</Navbar.Brand>
                            </Link>
                            
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="justify-content-end flex-grow-1 pe-3 fs-5" variant="underline" activeKey="1" style={{fontFamily:"Athiti"}}  >
                                
                            <LinkContainer to={`/home`} className='mr-3 mt-4 fs-5' style={{ textDecoration: 'none' }} >
                                <Nav.Link eventKey="1" >ตรวจประวัติ</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/pagestatus/${users.id}`} className='mr-3 mt-4 fs-5' style={{ textDecoration: 'none' }}>
                                <Nav.Link  eventKey="3" >สถานะการตรวจประวัติ</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/profile/${users.id}`}  >
                                    <Nav.Link eventKey="4" className='ml-2 mr-3 '>
                                        <Image src={"https://back-end-nr6u.onrender.com/"+users.profilepic}roundedCircle style={{width : '3rem'}} />
                                </Nav.Link>
                            </LinkContainer>
                                    
                                
                            <Nav.Link eventKey="2" onClick={logout} className='mt-4 fs-5'>logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className="bi bi-check-lg d-flex justify-content-center mt-4" style={{fontSize:'10rem'}}>

            </div>
            <p className='fs-2 d-flex justify-content-center mb-5 p-5' style={{fontFamily:"Athiti"}} >กรอกประวัติเสร็จสิ้น</p>
                
                <Row className="d-flex justify-content-center  ">

                    <Col xs lg="4" className="d-flex justify-content-center  ">
                        <Link to={`/home`} >
                            <Button className='bg-secondary text-white fs-5' type="submit" fullWidth variant="contained" style={{fontFamily:"Athiti" ,width:'16rem'}} >
                                <p>ไปหน้าตรวจประวัติ</p>
                            </Button>
                        </Link>
                        
                    </Col>
                    <Col xs lg="4" className="d-flex justify-content-center  ">
                        <Link to={`/pagestatus/${users.id}`} >
                            <Button className='bg-secondary text-white fs-5' type="submit" fullWidth variant="contained" style={{fontFamily:"Athiti" ,width:'16rem'}} >
                                <p>ไปหน้าสถานะการตรวจสอบ</p>
                            </Button>
                        </Link>
                        
                    </Col>
                </Row>
        </div>
        
        ))}
        </div>

    )
}

export default Historyfinish
