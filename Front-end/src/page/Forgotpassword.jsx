import React, { useContext,useEffect } from 'react'
import Bar from '../compament/Bar'
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import TextField from '@mui/material/TextField';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Navigate, useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import sessionstorage from 'sessionstorage';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
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
const Forgotpassword = () => {
    const { userid }  = useParams();
    const [newpassword,setnewpassword] = useState("");
    const [conpassword,setconpassword] = useState("");
    const [user ,setUser] = useState([]);
    const [visible,setVisible] = useState(false);
    const [visiblecon,setVisiblecon] = useState(false);
    const token = localStorage.getItem('forgot');
    const [inputs,setInputs] = useState({
        password: "",
    })
    const [err, setError] = useState(null);
    const popup = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'เปลี่ยนรหัสผ่านเสร็จสิ้น',
            
            
        }).then((result) => {
            if (result.value) {
              window.location.href = `/login`
            }
        });
          
    }
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
    const popuperror = async ()=>{
        Swal.fire({
            icon: 'error',
            title: 'ไม่สำเร็จ',
            text: 'เปลี่ยนรหัสผ่านไม่สำเสร็จ'
            
            
        })
          
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
    const forgotpassword=async ()=>{
        try{
            await axios.post(`https://back-end-newupdate.onrender.com/forgotpassword`,
            { 
                newpassword: inputs.password,
                conpassword: conpassword
            },{
                headers: {
                    Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            }
            )
            .then((response) => {
            if (response.data.error) {
                popuperror();
            }else{
                localStorage.removeItem('forgot');
                popup();
                
                
            }
            });
        }catch (err) {
            console.log(err);
            popuperror();
        }
         
    };
    const [isStrength, setStrength] = useState(null);
    const dataHandler = async (childData) => {
        setStrength(childData);
    }
    return (
        <Container fluid className='d-flex justify-content-center align-items-center vh-100'  style={{backgroundColor:'#778899',width:"100%",height: "100vh" ,fontFamily:"Athiti" }}>
                <Card className='m-3 p-5 ' style={{width:'50%',height:'80%'}}>
                    <Card.Body>
                        <div className='d-flex justify-content-center' style={{fontSize:'600%'}}>

                        </div>
                        <p className='d-flex justify-content-center m-5 fs-3'>เปลี่ยนรหัสผ่าน</p>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newpassword"
                            label="รหัสผ่านใหม่"
                            type={visible ? "text" :"password"}
                            
                            onChange={handleChangePassword}
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: <Endadorment visible={visible} setVisible={setVisible}/>
                              }}
                            
                        />
                        <PasswordStrength password={inputs.password} actions={dataHandler}/>
                        {err !== null && (
                            <Alert key={"danger"} variant={"danger"}>
                                <label htmlFor="password">
                                    <p className="errors m-1" > {err}</p>
                                </label>
                            </Alert>
                            )}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="newpassword"
                            label="ยืนยันรหัสผ่าน"
                            type={visiblecon ? "text" :"password"}                  
                            onChange={(e) => {
                                setconpassword(e.target.value);
                            }}
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: <Endadormentcon visiblecon={visiblecon} setVisiblecon={setVisiblecon}/>
                              }}
                        />
                        {isStrength === 'Strong' && conpassword===inputs.password ? (
                            <div className='d-flex justify-content-center m-1'>
                            <Button className='bg-secondary fs-5'  type="submit" variant="contained"  sx={{ mt: 3, mb: 2 }}  style={{fontFamily:"Athiti" ,width:'10rem'}} onClick={forgotpassword}>
                                ยืนยัน
                            </Button>
                        </div>
                        ):(
                            <Row className=" m-1 mb-2 d-flex justify-content-center">
                                <Col className='d-flex justify-content-center'>
                                    <Button  utton className='bg-secondary-800 fs-5'  type="submit" variant="contained"  sx={{ mt: 3, mb: 2 }}  style={{fontFamily:"Athiti" ,width:'10rem'}} onClick={forgotpassword} disabled>
                                        ยืนยัน
                                    </Button>
                                </Col>
                            </Row>
                        )}
                        
                        
                        
                    </Card.Body>
                </Card>
        </Container>
    )
}

export default Forgotpassword
