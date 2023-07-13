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

const Register = () => {
  const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsondata = {
            email: data.get('email'),
            password: data.get('password'),
            fname: data.get('firstName'),
            lname: data.get('lastName'),
            username : data.get('username'),
            phonenum : data.get('phonenum')
            

        };

        fetch("http://localhost:3333/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsondata),
        })
        .then(response => response.json()) 
        .then(data => {
            if (data.status === 'ok'){
                alert('register success')
                

            } else {
                alert('register failed')
            }
        })      
        .catch ((error) => {
        console.error("Error:", error);
            
        });
  }
  return (
    <div>
      <Bar/>
      <Container fluid  className=' p-5 '>
            <div className='d-flex justify-content-center'>
                <p className="fs-1" >Register</p>
            </div>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <Row>
                    <Col>
                        <TextField
                        required
                        fullWidth
                        id="username"
                        label="ชื่อผู้ใช้"
                        name="username"
                        autoComplete="username"
                        />  
                    </Col>
                    
                </Row>
                <br/>
                <Row>
                    <Col>
                        <TextField
                        autoComplete="given-name"
                        name="firstName"
                        required
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                        />
                    </Col>
                    <Col>
                        <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
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
                        />
                    </Col>
                </Row>
                <br/>
                
                <Row className=" m-2 d-flex justify-content-center">
                    <Col xs lg="2">
                        <Button className='bg-secondary' type="submit" fullWidth variant="contained" sx={{ mt: 3, }}>
                        <p>Register</p> 
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

