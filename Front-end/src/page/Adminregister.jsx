import React from 'react'
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
          await axios.post("http://localhost:3333/adminregister", inputs);
          navigate("/");
          if(!err){
            
          }
        } catch (err) {
          setErr(err.response.data);
        }
        
    };
    console.log(err)
    console.log(inputs)
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
            <Container fluid  className=' justify-content-center p-5 ' >

                    <div className='d-flex  m-4'>
                        <p className="fs-1" >เพิ่มผู้ใช้</p>
                    </div>
                    <div className='d-flex ml-4'>
                        <Col>
                            <Box component="form" noValidate sx={{ mt: 1 }} >
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
                        <Col className='pl-5 '>
                            <Row className='ml-5'>
                                <p className="fs-2" >สถานะ</p>
                            </Row>
                            <div className='ml-5'>
                                <Row className='m-3  fs-4'>
                                    <Form.Check type="checkbox" id="status" name="status"  label="  ผู้ใช้ทั่วไป" onChange={handleChangecheck}  />
                                </Row>
                                <Row className='m-3 fs-4'>
                                    <Form.Check type="checkbox" id="statusadmin" name="statusadmin"  label=" แอดมิน" onChange={handleChangecheck}  />
                                </Row>
                                {err && err}
                            </div>
                            
                        </Col>
                    </div>
                    <br/>
                    
                    <br/>
                    <Row className=" m-2 d-flex justify-content-end">
                        <Col xs lg="2">
                            <Button  className='bg-secondary text-white' type="submit" fullWidth variant="contained" onClick={handleClick} sx={{ mt: 3, }}>
                            <p className='m-2'>บันทึก</p> 
                            </Button>
                        </Col>
                    </Row>
                        
                    
                </Container>
        </div>
    )
}

export default Adminregister
