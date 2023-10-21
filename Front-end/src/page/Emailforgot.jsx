import React, { useContext } from 'react'
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

const Emailforgot = () => {
    const [inputs,setInputs] =useState ({
        email: "",
      
    });
    const [err, setErr] = useState(null);
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        
    };
    const popups = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'ส่ง Email สำเร็จ',
            
            
        }).then((result) => {
            if (result.value) {
              window.location.href = `/otpforgot`
            }
        });
          
    }
    const sendemail = async (e)=>{
        e.preventDefault();
        try {
            await axios.post(`http://localhost:3333/sendemail`, inputs)
            .then(function (response) {
                if(err){
                    popuperror();
                    
                }
                else{
                    localStorage.setItem('token',response.data.token)
                    popups();
                    // if(response.data.status=='1')
                    // {
                    //     navigate("/home");

                    // }
                    // else{
                    //     navigate("/adminuser");
                    // }
                }  
            })
              
        } catch (err) {
          setErr(err.response.data);
          popuperror();
          
        }
    }

    console.log(inputs)
    return (
        <Container fluid className='d-flex justify-content-center align-items-center vh-100'  style={{backgroundColor:'#778899',width:"100%",height: "100vh" ,fontFamily:"Athiti" }}>
            <Card className='m-3 p-5 ' style={{width:'50%',height:'80%'}}>
                <Card.Body>
                    <div className='bi bi-envelope-fill d-flex justify-content-center' style={{fontSize:'600%'}}>

                    </div>
                    <p className='d-flex justify-content-center m-5 fs-3'>กรอก อีเมลที่ต้องการส่ง OTP</p>
                    <Row className='input-container d-flex flex-row justify-content-center mt-2'>
                        <Col  className='d-flex justify-content-center'>
                            <input type='text' name='email' id='email' className=' d-flex justify-content-center'  onChange={handleChange}></input>
                        </Col>
                        
                    </Row>
                    
                    <div className='d-flex justify-content-center m-1'>
                        <Button className='bg-secondary fs-5'  type="submit" variant="contained"  sx={{ mt: 3, mb: 2 }}  style={{fontFamily:"Athiti" ,width:'10rem'}} onClick={sendemail}>
                            ยืนยัน
                        </Button>
                    </div>
                    
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Emailforgot
