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

const Otpfroget = () => {
    const [inputs,setInputs] =useState ({
        OTP: "",
      
    });
    const [err, setErr] = useState(null);
    const [user ,setUser] = useState([]);
    const token = localStorage.getItem('login');
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        
    };
    const popups = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'OTP ถูกต้อง',
            
            
        }).then((result) => {
            if (result.value) {
              window.location.href = `/forgotpassword`
            }
        });
          
    }
    const otpverification = async ()=>{
        
        try{
            await axios.post(`http://localhost:3333/otpvverification`,inputs,{
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            
            } )
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                }else{
                    popups();
                }
                    
                });
        } catch (err) {
            console.log(err);
        }
    }
    const getdata = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/profileid`, {
                headers: {
                  Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })
            setUser(response.data);
        } catch (err) {
            console.log(err);
            window.location='/login'
        }
    }
    const otp = async () => {
        
        try{
            const response = await axios.get(`http://localhost:3333/otp`, {
                headers: {
                  Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })
            
        } catch (err) {
            console.log(err);
            window.location='/login'
        }
        
    };
    useEffect(() => {    
        getdata();
        
    }, []);
    console.log(inputs)
    return (
        <Container fluid className='d-flex justify-content-center align-items-center vh-100'  style={{backgroundColor:'#778899',width:"100%",height: "100vh" ,fontFamily:"Athiti" }}>
            <Card className='m-3 p-5 ' style={{width:'50%',height:'80%'}}>
                <Card.Body>
                    <div className='bi bi-lock-fill d-flex justify-content-center' style={{fontSize:'600%'}}>

                    </div>
                    <p className='d-flex justify-content-center m-5 fs-3'>OTP VERIFICATION</p>
                    <Row className='d-flex justify-content-center m-4 fs-6'>
                        code to be sent 088656474
                    </Row>
                    <Row className='input-container d-flex flex-row justify-content-center mt-2'>
                        <Col  className='d-flex justify-content-center'>
                            <input type='text' name='OTP' id='OTP' className=' d-flex justify-content-center' maxLength="6" onChange={handleChange}></input>
                        </Col>
                        
                    </Row>
                    <div className='d-flex justify-content-center'>
                        <Button className='d-flex justify-content-center mt-3' onClick={otp}>
                            ส่ง otp อีกครั้ง
                        </Button>
                    </div>
                    
                    <div className='d-flex justify-content-center m-1'>
                        <Button className='bg-secondary fs-5'  type="submit" variant="contained"  sx={{ mt: 3, mb: 2 }}  style={{fontFamily:"Athiti" ,width:'10rem'}} onClick={otpverification}>
                            ยืนยัน
                        </Button>
                    </div>
                    
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Otpfroget
