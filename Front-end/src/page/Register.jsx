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
import {useNavigate} from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Register = () => {
    const [inputs,setInputs] = useState({
        username: "",
        email: "",
        password: "",
        fname: "",
        lname: "",
        phonenum: "",
    })
    const [err, setErr] = useState(null);

    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post("/api/register", inputs);
          navigate("/login");
        } catch (err) {
          setErr(err.response.data);
          console.log(err)
        }
        if(err){
            alert('register failed')
            
        }
        else{
            alert('login success')
            
        }
    };
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
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Link to={`/`}>
                            <Navbar.Brand >CHECK</Navbar.Brand>
                        </Link>
                            
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-end flex-grow-1 pe-3 ">
                        <Nav.Link href="/">ตรวจประวัติ</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
            </Navbar>
            <Container fluid  className=' p-5 ' >
                <div className='d-flex justify-content-center'>
                    <p className="fs-1" >Register</p>
                </div>
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
                    <br/>
                    {/* <Row>
                        <Col className='d-flex justify-content-center '>
                            <div className="d-flex justify-content-center m-2">
                                <img src="https://mdbootstrap.com/img/Photos/Others/placeholder-avatar.jpg"
                                className="rounded-circle" alt="example placeholder" style={{width: 50  }} />
                            </div>
                            <div className="d-flex justify-content-center m-2">
                                <div className="btn  btn-rounded bg-secondary" style={{width: 120 , height :50}} variant="contained">
                                    <label className="form-label text-white m-1" htmlFor="customFile2">Choose file</label>
                                    <input type="file" className="form-control d-none" id="customFile2" name='photo' onChange={setimgfile}/>
                                    <label className="form-label text-white m-1 "  >Choose file</label>
                                    <input type="file" className="form-control d-none" id='customFile2' name='photo' onChange={setimgfile} />
                                </div>
                            </div>
                        </Col>
                    </Row> */}
                    <Row className=" m-2 d-flex justify-content-center">
                        <Col xs lg="2">
                            <Button  className='bg-secondary text-white' type="submit" fullWidth variant="contained" onClick={handleClick} sx={{ mt: 3, }}>
                            <p className='m-2'>Register</p> 
                            </Button>
                        </Col>
                    </Row>
                    <Row >
                        <Col className='d-flex justify-content-center'>
                            <Link href="/login" variant="body2">
                            Already have an account? Sign in
                            </Link>
                        </Col>
                        
                    </Row>
                </Box>
            </Container>
        </div>
    )
}

export default Register

