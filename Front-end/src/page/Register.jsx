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
import '../compament/PasswordStrength.css';
import Alert from 'react-bootstrap/Alert';
const Register = () => {
    const [newpassword,setnewpassword] = useState("");
    const [conpassword,setconpassword] = useState("");
    const [inputs,setInputs] = useState({
        username: "",
        email: "",
        password: "",
        fname: "",
        lname: "",
        phonenum: "",
    })
    const [err, setError] = useState(null);
    const [error,setErr] = useState(null);
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
    const handleChangePassword = (e) => {
        let password  = e.target.value;
        setInputs({
          ...inputs,
          password:e.target.value
        });
        setError(null);
        let capsCount, smallCount, numberCount, symbolCount
        if (password.length < 4) {
          setError("Password must be minimum 4 characters include one UPPERCASE, lowercase, number and special character: @$! % * ? &");
          return;
        }
        else {
          capsCount = (password.match(/[A-Z]/g) || []).length
          smallCount = (password.match(/[a-z]/g) || []).length
          numberCount = (password.match(/[0-9]/g) || []).length
          symbolCount = (password.match(/\W/g) || []).length
          if (capsCount < 1) {
            setError("Must contain one UPPERCASE letter");
            return;
          }
          else if (smallCount < 1) {
            setError("Must contain one lowercase letter");
            return;
          }
          else if (numberCount < 1) {
            setError("Must contain one number");
            return;
          }
          else if (symbolCount < 1) {
            setError("Must contain one special character: @$! % * ? &");
            return;
          }
        }
      }
    const popuperror = async ()=>{
        Swal.fire({
            icon: 'error',
            title: 'ไม่สำเร็จ',
            text: 'ลงทะเบียนไม่สำเสร็จชื่อผู้ใช้หรือ E-mail คุณมีการลงทะเบียนแล้ว'
            
            
        })
          
    }
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const navigate = useNavigate()
    
    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post("https://back-end-newupdate.onrender.com/register", inputs)
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
    
    console.log(err)
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
                
                <Card component="form" noValidate sx={{ mt: 1 }}  style={{width:'45%' ,height:'80%'}}>
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
                                id="password" 
                                name="password"
                                label="รหัสผ่าน"
                                type={visible ? "text" :"password"}
                                
                                onChange={handleChangePassword}
                                InputProps={{ // <-- This is where the toggle button is added.
                                    endAdornment: <Endadorment visible={visible} setVisible={setVisible}/>
                                }}
                                
                            />
                            <PasswordStrength password={inputs.password} actions={dataHandler}/>
                            </Col> 
                            {err !== null && (
                            <Alert key={"danger"} variant={"danger"}>
                                <label htmlFor="password">
                                    <p className="errors m-1" > {err}</p>
                                </label>
                            </Alert>
                            )}
                        </Row>
                        
                        <Row>
                            <Col>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="conpassword"
                                    label="ยืนยันรหัสผ่าน"
                                    type={visiblecon ? "text" :"password"}
                                    
                                    onChange={(e) => {
                                        setconpassword(e.target.value);
                                    }}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: <Endadormentcon visiblecon={visiblecon} setVisiblecon={setVisiblecon}/>
                                    }}
                                />
                            </Col>
                        </Row>
                        {error !== null && (
                            <Alert key={"danger"} variant={"danger"}>
                                <label htmlFor="password">
                                    <p className="errors m-1" > {error && error}</p>
                                </label>
                            </Alert>
                        )}
                        {isStrength === 'Strong' && conpassword===inputs.password ? (
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
                                    <Button  className='bg-secondary-800 text-white fs-5' type="submit" variant="contained" onClick={handleClick} sx={{ mt: 3, }} disabled>
                                        <p className='m-2' style={{fontFamily:"Athiti"}} >Register</p> 
                                    </Button>
                                </Col>
                            </Row>
                        )}
                            {/* <Button  className='bg-secondary text-white fs-5' type="submit" variant="contained" onClick={handleClick} sx={{ mt: 3, }} disabled>
                                <p className='m-2' style={{fontFamily:"Athiti"}} >Register</p> 
                            </Button> */}
{/*                         
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

