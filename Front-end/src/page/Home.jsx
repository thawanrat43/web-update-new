import React,{useEffect,useState} from "react";
import Bar from "../compament/Bar";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Barprofile from "../compament/Barprofile";
import TextField from '@mui/material/TextField';
import {useParams} from 'react-router-dom';
import axios from "axios";

const Home =() =>{
    // const [listOfPosts, setListOfPosts] = useState([]);
    // let history = useHistory();

    
    // useEffect(() => {
    //     axios.get("http://localhost:3306/home").then((response) => {
    //         setListOfPosts(response.data);
    //         });
    // }, []);
        
    const handlelogout =(event)=>{
        event.preventDefault();
        // localStorage.removeItem('token');
        // window.location='/login'
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const jsondata = {
            fname: data.get('firstName'),
            lname: data.get('lastName'),
            idnumber : data.get('idnumber'),
            type_id : data.get('type_id')

            

        };

        fetch("http://localhost:3333/home", {
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
                
          <div className="d-flex justify-content-center m-5">
            <Container className="m-5 ">
                <p className="fs-5">กรอกประวัติของผู้ที่ต้องการตรวจสอบ</p>
                    <Row>
                                <Col>
                                    <Form.Select id="type_id" aria-label="Default select example" size="lg" className="mt-1">
                                        <option>คำนำหน้า</option>
                                        <option value="1">นาย</option>
                                        <option value="2">นาง</option>
                                        <option value="3">นางสาว</option>
                                    </Form.Select>            
                                </Col>
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
                                id="idnumber"
                                label="หมายเลขบัตรประจำตัวประชาชน"
                                name="idnumber"
                                autoComplete="idnumber"
                                />  
                            </Col>
                            
                        </Row>
                            <br />
                            <div className="m-5">
                                <p className="m-2 d-flex justify-content-center fs-5">ต้องการตรวจสอบประวัติ</p>
                                <br/>
                                <Row className="m-2 d-flex justify-content-center">
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="ตรวจสอบประวัติอาชญากร" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="ตรวจเครดิตบูโร" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="m-2 d-flex justify-content-center">
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="ตรวจคดีล้มละลาย" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="ตรวจคดีอาญา" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="m-2 d-flex justify-content-center">
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="ตรวจglobal sanction" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                        <Form.Check type="checkbox" label="อื่นๆ" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>
                            <Row className=" m-2 d-flex justify-content-center">
                                <Col xs lg="2">
                                    <Button className='bg-secondary' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} onClick={handlelogout}>
                                    <p>ยืนยัน</p> 
                                    </Button>
                                </Col>
                            </Row>  
                        </Container>
                    </div>
        
            
    );
   
}
export default Home