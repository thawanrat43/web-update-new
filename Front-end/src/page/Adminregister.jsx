import React, { useEffect } from 'react'
import Bar from '../compament/Bar'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import TextField from '@mui/material/TextField';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { useState } from 'react';
import axios from "axios"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
const Adminregister = () => {
    const [inputs,setInputs] = useState({
        username: "",
        email: "",
        password: "",
        fname: "",
        lname: "",
        phonenum: "",
        status:"",
        statusadmin:""
    })
    const popupsuccess = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'ลงทะเบียนเสร็จสิ้น',
            
            
        }).then((result) => {
            if (result.value) {
              window.location.href = `/adminuser`
            }
        });
          
    }
    const popuperror = async ()=>{
        Swal.fire({
            icon: 'error',
            title: 'ไม่สำเร็จ',
            text: 'ลงทะเบียนไม่สำเสร็จชื่อผู้ใช้หรือ E-mail คุณมีการลงทะเบียนแล้ว'
            
            
        }).then((result) => {
            if (result.value) {
                window.location.href = `/adminregister`
            }
        });
          
    }
    const navigate = useNavigate()
    const [err, setErr] = useState(null);
    const handleChangecheck = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
	};
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };
  
    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post("https://back-end-nr6u.onrender.com/adminregister", inputs)
            .then(function (response) {
                if(err){
                    popuperror();
                }
                else{
                    popupsuccess();
                }
            });
        } catch (err) {
          setErr(err.response.data);
          popuperror();
        }
        
    };
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
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
    }, []);
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-wh" style={{fontFamily:"Athiti"}}>
                    <Container>

                    <Navbar.Brand href='/adminuser' className='fs-1'>CHECK</Navbar.Brand>

                            
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3  fs-5" variant="underline" activeKey="1">
                        <Nav.Link eventKey={1} href="/adminuser">รายชื่อผู้ใช้</Nav.Link>
                        
                    <Nav.Link onClick={logout}  >logout</Nav.Link>    
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar> 
            <div className='d-flex justify-content-center p-5 '>
            <Card className=' justify-content-center p-5 'style={{fontFamily:"Athiti",width:'70%',height:'80%'}} >
                <div className='d-flex  m-4'>
                    <p className="fs-2" >เพิ่มผู้ใช้</p>
                </div>
                <div className='d-flex '>
                    <Col>
                        <Box component="form" >
                            <Row>
                                <Col>
                                    <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="ชื่อผู้ใช้"
                                    name="username"
                                    autoComplete="username"
                                    onChange={handleChange}
                                    />  
                                </Col>
                                
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <TextField
                                    name="fname"
                                    required
                                    fullWidth
                                    id="fname"
                                    label="ชื่อ"
                                    autoComplete="fname"
                                    onChange={handleChange}
                                    />
                                </Col>
                                <Col>
                                    <TextField
                                    required
                                    fullWidth
                                    id="lname"
                                    label="นามสกุล"
                                    name="lname"
                                    autoComplete="lname"
                                    onChange={handleChange}
                                    />
                                </Col>      
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <TextField
                                    required
                                    fullWidth
                                    id="phonenum"
                                    label="หมายเลขโทรศัพท์"
                                    name="phonenum"
                                    autoComplete="phonenum"
                                    onChange={handleChange}
                                    />
                                </Col>
                                
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    />
                                </Col>
                                
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="รหัสผ่าน"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                    onChange={handleChange}
                                    />
                                </Col> 
                            </Row>
                        </Box>
                    </Col>
                    <Col xs lg="4">
                        <Row className='ml-5'>
                            <p className="fs-4" >สถานะ</p>
                        </Row>
                        <div className='ml-5'>
                            <Row className='m-3  fs-5'>
                                <Form.Check type="checkbox" id="status" name="status"  label="  ผู้ใช้ทั่วไป" onChange={handleChangecheck}  />
                            </Row>
                            <Row className='m-3 fs-5'>
                                <Form.Check type="checkbox" id="statusadmin" name="statusadmin"  label=" แอดมิน" onChange={handleChangecheck}  />
                            </Row>
                            <Row  style={{color:'red'}}>
                                {err && err}
                            </Row>
                            
                        </div>
                        
                    </Col>
                </div>
                <br/>
                <Row className=" d-flex justify-content-end">
                    <Col className='d-flex justify-content-end'>
                        <Button  className='bg-secondary text-white fs-5' type="submit" fullWidth variant="contained" onClick={handleClick} sx={{ mt: 3, }} style={{fontFamily:"Athiti",width:"12rem"}}>
                        <p className='m-2'>บันทึก</p> 
                        </Button>
                    </Col>
                </Row>
                    

                </Card>
            </div>  
            
        </div>
    )
}

export default Adminregister
