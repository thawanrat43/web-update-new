import React,{useEffect, useState} from 'react'
import Bar from '../compament/Bar'
import { Button } from '@mui/material';
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
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
const Profile = ({}) => {
    const [ auth , setAuth] = useState(false);
    const [user ,setUser] = useState([]);
    const navigate = useNavigate();
    const [hasError, setErrors] = useState([]);
    const location = useLocation();
    const { userid }  =useParams();
    
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    const getcheck = async () =>{
        try{
          if(user[0].status==''){
            window.location='/login'
            localStorage.removeItem('token');
          }else{
            
          }
          
        } catch (err) {
            console.log(err);
        }
    }
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/profile/${userid}`);
            setUser(response.data);
            getcheck();
        } catch (err) {
            console.log(err);
        }
    }
    const token = async () =>{
        const token = localStorage.getItem('token');
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/token`,{
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
    const navStyle = {
        lineHeight: "1.5",
        border: "none",
        color: "#708090"
    
    }
    
    console.log(user); 
    console.log(user);
    return (
        <div>
        {user.map((users,i)=>(   
            <div key={i}>
                <Navbar collapseOnSelect expand="lg" className="bg-white" style={{fontFamily:"Athiti"}}>
                    <Container>
                            <Link to={`/home`}>
                                <Navbar.Brand className='fs-1' >CHECK</Navbar.Brand>
                            </Link>
                            
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="justify-content-end flex-grow-1 pe-3 fs-5" variant="underline" activeKey="4" >
                            
                            <LinkContainer to={`/`} className='mr-3 mt-4' style={{ textDecoration: 'none' }} >
                                <Nav.Link >ตรวจประวัติ</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/pagestatus/${userid}`} className='mr-3 mt-4' style={{ textDecoration: 'none' }}>
                                <Nav.Link   >สถานะการตรวจประวัติ</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/profile/${userid}`}  >
                                    <Nav.Link eventKey="4" className='ml-2 mr-3 '>
                                        <Image className='mt-2' src={"https://back-end-newupdate.onrender.com/"+users.profilepic}roundedCircle style={{width : '3rem'}} />
                                </Nav.Link>
                            </LinkContainer>
                                    
                                
                            <Nav.Link eventKey="2" onClick={logout} className='mt-4'>logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container >
                        <div  className='d-flex justify-content-center p-5'>
                            <Card style={{ width: '18rem'  }} className='m-5 '>
                                <Card.Body>
                                    <Row className=''>
                                        <Col className='justify-content-center m-5' style={{position:'relative'}}> 
                                            <Image className='img-fluid'  src={"https://back-end-newupdate.onrender.com/"+users.profilepic}roundedCircle  />
                                        </Col>
                                    </Row>
                                    <Row className='p-3'>
                                            <Link to={`/profile/${userid}`}>
                                                <Button className='bg-secondary fs-6'  type="submit" fullWidth variant="contained"  sx={{ mt: 3 }} style={{fontFamily:"Athiti"}}>
                                                    ประวัติส่วนตัว
                                                </Button>
                                            </Link>
                                        </Row>
                                        <Row className='p-3'>
                                            <Link to={`/code/${userid}`}>
                                                <Button className='bg-secondary text-wh fs-6'  type="submit" fullWidth variant="contained"  sx={{  mb: 2 }} style={{fontFamily:"Athiti"}}>
                                                    
                                                    เปลี่ยนรหัสผ่าน
                                                </Button>
                                            </Link>
                                        </Row>
                                    
                                </Card.Body>
                            </Card>
                            <div className='pl-5' style={{fontFamily:"Athiti"}}>
                                <Row>
                                    <Col>
                                        <div className='mb-4 mt-5'>
                                            <span className='fs-2'>ประวัติส่วนตัว</span>
                                        </div>
                                    </Col>
                                    <Col>
                                        <Link to={`/profileupdate/${userid}`}>
                                            <div className='d-flex justify-content-end'>
                                                <Button className='bg-secondary text-wh mt-5 '  type="submit" variant="contained"  sx={{  mb: 2 }}>   
                                                    แก้ไข
                                                </Button>
                                            </div>
                                        </Link>
                                    </Col>

                                </Row>
                                
                                
                                <div className='fs-5' >
                                    <Row>
                                        <Col xs lg="3" className='mt-4 pt-1'>
                                        ชื่อผู้ใช้
                                        </Col>
                                        <Col className='mt-4'>
                                            
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
                                    <Col xs lg="3" className='mt-4 pt-1'>
                                        ชื่อ-นามสกุล
                                        </Col>
                                        <Col className='mt-4'>
                                            <Form.Control
                                                    type="text"
                                                    placeholder={users.fname}
                                                    aria-label="Disabled input example"
                                                    disabled
                                                    readOnly
                                                    
                                            />
                                        </Col>
                                        <Col className='mt-4'>
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
                                        <Col xs lg="3" className='mt-4 pt-1'>
                                        เบอร์โทรศัพท์
                                        </Col>
                                        <Col className='mt-4'>
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
                                        <Col xs lg="3" className='mt-4 pt-1'>
                                        E-mail
                                        </Col>
                                        <Col className='mt-4'>
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
                                    {/* {userlist.map((val,key) =>{
                                        return(
                                            <div>
                                                <p> ชื่อผู้ใช้ : {val.username}</p>
                                            </div>
                                        )
                                    })} */}
                                </div>
                            </div>
                        </div>
                    
                    
                </Container>
            </div>
        ))}    
        </div>
    )
}

export default Profile