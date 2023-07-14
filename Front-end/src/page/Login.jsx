import React from 'react'
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

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsondata = {
        email: data.get('email'),
        password: data.get('password'),
    };
    const token = localStorage.getItem('token')
    fetch("https://successful-handbag-toad.cyclic.app/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(jsondata),
    })
    .then(response => response.json()) 
    .then(data => {
        if (data.status ==='ok'){
            alert('login success')
            localStorage.setItem('token',data.token)
            window.location ='/home'

        } else {
            alert('login failed')
        }
    })      
    .catch ((error) => {
      console.error("Error:", error);
        
    });
    
  };
  return (
    <div>
        
        <Container fluid  className=' p-5 '>
            <div className='d-flex justify-content-center'>
                <p className="fs-1">Login</p>
            </div>
            <Box className='m-5' component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Row className="align-items-center m-5 d-flex justify-content-center">
                    <Col xs lg="2"  >
                        <Button className='bg-secondary'  type="submit" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }}>
                            <p>Login</p>
                        </Button>
                    </Col>
                    <Col className="align-items-center" md="auto">
                        <p>or</p>
                    </Col>
                    <Col xs lg="2">
                        <Button href='/register' className='bg-secondary' fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            <p>New user</p>
                        </Button>
                    </Col>
                </Row>
            </Box>
            
        </Container>
        
        
    </div>
  )
}

export default Login