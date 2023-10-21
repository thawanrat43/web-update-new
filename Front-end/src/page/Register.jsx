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
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import PasswordStrength from '../compament/PasswordStrength';
import { InputAdornment } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import {IconButton} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
const Register = () => {
    const [newpassword,setnewpassword] = useState("");
    const [inputs,setInputs] = useState({
        username: "",
        email: "",
        password: "",
        fname: "",
        lname: "",
        phonenum: newpassword,
    })
    const [err, setErr] = useState(null);
    const [visible,setVisible] = useState(false);
    const [visiblecon,setVisiblecon] = useState(false);
    const popupsuccess = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'ลงทะเบียนเสร็จสิ้น',
            
            
        }).then((result) => {
            if (result.value) {
              window.location.href = `/login`
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
                window.location.href = `/register`
            }
        });
          
    }
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const navigate = useNavigate()
    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post("https://back-end-nr6u.onrender.com/register", inputs)
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
          console.log(err)
          popuperror();
        }
    };
    
    const Endadorment =({visible,setVisible}) =>{
        return (
            <InputAdornment position='end'>
                <IconButton onClick={()=> setVisible(!visible)}>
                {visible ? <VisibilityOff/> : <RemoveRedEyeIcon/>}
                </IconButton>
            </InputAdornment>
        );
    }
    const Endadormentcon =({visiblecon,setVisiblecon}) =>{
        return (
            <InputAdornment position='end'>
                <IconButton onClick={()=> setVisiblecon(!visiblecon)}>
                {visiblecon ? <VisibilityOff/> : <RemoveRedEyeIcon/>}
                </IconButton>
            </InputAdornment>
        );
    }
    const [isStrength, setStrength] = useState(null);
    const dataHandler = async (childData) => {
        setStrength(childData);
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
    console.log(isStrength)
    
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-wh">
            <Container>

                <Navbar.Brand href='/'style={{fontFamily:"Athiti"}} className='fs-1' >CHECK</Navbar.Brand>

                    
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="3" >

                <Nav.Link href='/' style={{fontFamily:"Athiti"}} className='fs-5' eventKey="2">ตรวจประวัติ</Nav.Link>

                <Nav.Link href="/login" style={{fontFamily:"Athiti"}} className='fs-5' eventKey="4">Login</Nav.Link>
                <Nav.Link href="/register" style={{fontFamily:"Athiti"}} className='fs-5' eventKey="3">Register</Nav.Link>

                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <div  className=' p-5 d-flex justify-content-center' >
                
                <Card component="form" noValidate sx={{ mt: 1 }}  style={{width:'45%'}}>
                    <Card.Body className='p-5'> 
                        <div className='d-flex justify-content-center'>
                            <p className="fs-1" style={{fontFamily:"Athiti"}} >Register</p>
                        </div>
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
                                style={{fontFamily:"Athiti"}} 
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
                                style={{fontFamily:"Athiti"}} 
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
                                style={{fontFamily:"Athiti"}} 
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
                                style={{fontFamily:"Athiti"}} 
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
                                style={{fontFamily:"Athiti"}} 
                                />
                            </Col>
                            
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="newpassword"
                                label="รหัสผ่านใหม่"
                                type={visible ? "text" :"password"}
                                
                                onChange={(e) => {
                                    setnewpassword(e.target.value);
                                }}
                                InputProps={{ // <-- This is where the toggle button is added.
                                    endAdornment: <Endadorment visible={visible} setVisible={setVisible}/>
                                }}
                                
                            />
                            <PasswordStrength password={newpassword} actions={dataHandler}/>
                            </Col> 
                        </Row>
                        
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
                        <div className='d-flex justify-content-center ' style={{color:'red'}}>
                            {err && err}
                        </div>
                        {isStrength === 'Strong' ? (
                            <Row className=" m-1 d-flex justify-content-center">
                                <Col className='d-flex justify-content-center'>
                                    <Button  className='bg-secondary text-white fs-5' type="submit" variant="contained" onClick={handleClick} sx={{ mt: 3, }}>
                                    <p className='m-2' style={{fontFamily:"Athiti"}} >Register</p> 
                                    </Button>
                                </Col>
                            </Row>
                        ):(
                            <Row className=" m-1 mb-2 d-flex justify-content-center">
                                <Col className='d-flex justify-content-center'>
                                    <Button  className='bg-secondary text-white fs-5' type="submit" variant="contained" onClick={handleClick} sx={{ mt: 3, }} disabled>
                                    <p className='m-2' style={{fontFamily:"Athiti"}} >Register</p> 
                                    </Button>
                                </Col>
                            </Row>
                        )}
                            {/* <Button  className='bg-secondary text-white fs-5' type="submit" variant="contained" onClick={handleClick} sx={{ mt: 3, }} disabled>
                                <p className='m-2' style={{fontFamily:"Athiti"}} >Register</p> 
                            </Button>
                        
                        <Row className=" m-2 d-flex justify-content-center">
                            <Col className='d-flex justify-content-center'>
                                <Button  className='bg-secondary text-white fs-5' type="submit" variant="contained" onClick={handleClick} sx={{ mt: 3, }}>
                                <p className='m-2' style={{fontFamily:"Athiti"}} >Register</p> 
                                </Button>
                            </Col>
                        </Row> */}
                        <Row >
                            <Col className='d-flex justify-content-center'>
                                <Link href="/login" variant="body2" style={{fontFamily:"Athiti"}} className='fs-6' >
                                Already have an account? Sign in
                                </Link>
                            </Col>
                            
                        </Row>
                    </Card.Body>
                
                </Card>
            </div>
        </div>
    )
}

export default Register

