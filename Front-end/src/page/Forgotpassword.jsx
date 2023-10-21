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

const Forgotpassword = () => {
    const { userid }  = useParams();
    const [newpassword,setnewpassword] = useState("");
    const [conpassword,setconpassword] = useState("");
    const [user ,setUser] = useState([]);
    const [visible,setVisible] = useState(false);
    const [visiblecon,setVisiblecon] = useState(false);
    const token = localStorage.getItem('token');
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
            
            
        }).then((result) => {
            if (result.value) {
                window.location.href = `/forgotpassword`
            }
        });
          
    }
    const forgotpassword=async ()=>{
        try{
            await axios.post(`http://localhost:3333/forgotpassword`,
            { 
                newpassword: newpassword,
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
                popup();
                
                
            }
            });
        }catch (err) {
            console.log(err);
            popuperror();
        }
         
    };
    
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
                            
                            onChange={(e) => {
                                setnewpassword(e.target.value);
                            }}
                            InputProps={{ // <-- This is where the toggle button is added.
                                endAdornment: <Endadorment visible={visible} setVisible={setVisible}/>
                              }}
                            
                        />
                        <PasswordStrength password={newpassword} />
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
                        
                        
                        <div className='d-flex justify-content-center m-1'>
                            <Button className='bg-secondary fs-5'  type="submit" variant="contained"  sx={{ mt: 3, mb: 2 }}  style={{fontFamily:"Athiti" ,width:'10rem'}} onClick={forgotpassword}>
                                ยืนยัน
                            </Button>
                        </div>
                        
                    </Card.Body>
                </Card>
        </Container>
    )
}

export default Forgotpassword
