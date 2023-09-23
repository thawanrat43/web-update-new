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
import { Link } from "react-router-dom";
import Barprofile from "../compament/Barprofile";
import TextField from '@mui/material/TextField';
import {useParams} from 'react-router-dom';
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Card } from "react-bootstrap";
import Swal from "sweetalert2";
const Homenotlogin =() =>{
    const { userid }  = useParams();
    const [inputs,setInputs] = useState({
        fname: "",
        lname: "",
        idcard: "",
        type_id: "",
        criminal: "",
        bankrupt: "",
        credit: "",
        penalty: "",
        global: "",
        other_text: ""
    })
    const token = localStorage.getItem('token');
    const [err, setErr] = useState(null);
    const popuperror = async ()=>{
        Swal.fire({
            icon: 'warning',
            title: 'คุณยังไม่ได้ล็อกอิน'
        }).then((result) => {
            if (result.value) {
                window.location.href = `/login`
            }
        });
          
    }
    
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleChangecheck = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
	};
    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post(`https://back-end-nr6u.onrender.com/home`, inputs,{
            headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }
            
            }).then((response) => {
                if (response.data.error) {
                popuperror();
                }else{
                    popuperror();
                }
                
                });
        } catch (err) {
          setErr(err.response.data);
          popuperror();
        }
        
    };
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-wh">
                <Container>
                    <Navbar.Brand href='/'style={{fontFamily:"Athiti"}} className='fs-1' >CHECK</Navbar.Brand>          
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="2" >

                    <Nav.Link href='/' style={{fontFamily:"Athiti"}} className='fs-5' eventKey="2">ตรวจประวัติ</Nav.Link>

                    <Nav.Link href="/login" style={{fontFamily:"Athiti"}} className='fs-5' eventKey="4">Login</Nav.Link>
                    <Nav.Link href="/register" style={{fontFamily:"Athiti"}} className='fs-5' eventKey="3">Register</Nav.Link>

                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
          
            <div className="d-flex justify-content-center  p-5" >
                <Card className="p-5 d-flex justify-content-center " style={{width:"50%"}}>
                        <p className="fs-4" style={{fontFamily:"Athiti"}}>กรอกประวัติของผู้ที่ต้องการตรวจสอบ</p>
                            <Row>
                                        <Col>
                                            <Form.Select id="type_id" name="type_id" aria-label="Default select example" size="lg" className="mt-1" onChange={handleChange} style={{fontFamily:"Athiti"}}>
                                                <option>คำนำหน้า</option>
                                                <option value="นาย">นาย</option>
                                                <option value="นาง">นาง</option>
                                                <option value="นางสาว">นางสาว</option>
                                            </Form.Select>            
                                        </Col>
                                        <Col>
                                            <TextField
                                            name="fname"
                                            fullWidth
                                            id="fname"
                                            label="ชื่อ"
                                            autoFocus
                                            onChange={handleChange}
                                            />
                                        </Col>
                                        <Col>
                                            <TextField
                                            fullWidth
                                            id="lname"
                                            label="นามสกุล"
                                            name="lname"
                                            autoComplete="family-name"
                                            onChange={handleChange}
                                            />
                                        </Col>      
                                    </Row>
                                    <br/>
                                    <Row>
                                    <Col>
                                        <TextField
                                        
                                        fullWidth
                                        id="idcard"
                                        label="หมายเลขบัตรประจำตัวประชาชน"
                                        name="idcard"
                                        autoComplete="idcard"
                                        onChange={handleChange}
                                        />  
                                    </Col>
                                    
                        </Row>
                        <br />
                            <div className=" ml-5 mr-5" >
                                <p className="m-2 d-flex justify-content-center fs-5" style={{fontFamily:"Athiti"}}>ต้องการตรวจสอบประวัติ</p>
                                <br/>
                                <Form className=" justify-content-center">
                                            <Row className="m-2 d-flex justify-content-center">
                                                <Col>
                                                    
                                                
                                                    <Form.Check type="checkbox" id="criminal" name="criminal"  label="ตรวจสอบประวัติอาชญากร"onChange={handleChangecheck} style={{fontFamily:"Athiti"}} className="fs-5"/>
                                                
                                                </Col>
                                                <Col>
                                                    
                                                    <Form.Check type="checkbox" id="credit"label="ตรวจเครดิตบูโร" name="credit" onChange={handleChangecheck} style={{fontFamily:"Athiti"}} className="fs-5"/>
                                                    
                                                </Col>
                                            </Row>
                                            <Row className="m-2 d-flex justify-content-center">
                                                <Col>
                                                    
                                                    <Form.Check type="checkbox" id="bankrupt" label="ตรวจคดีล้มละลาย" name="bankrupt" onChange={handleChangecheck} style={{fontFamily:"Athiti"}} className="fs-5"/>
                                                    
                                                </Col>
                                                <Col>
                                                    
                                                    <Form.Check type="checkbox" id="penalty"label="ตรวจคดีอาญา" name="penalty" onChange={handleChangecheck} style={{fontFamily:"Athiti"}} className="fs-5" />
                                                    
                                                </Col>
                                            </Row>
                                            <Row className="m-2 d-flex justify-content-center">
                                                <Col>
                                                    
                                                    <Form.Check type="checkbox"  label="ตรวจglobal sanctions" id="global" name="global"  onChange={handleChangecheck} style={{fontFamily:"Athiti"}} className="fs-5" />
                                                    
                                                </Col>
                                                <Col>
                                                    <TextField
                                                    name="other_text"
                                                    fullWidth
                                                    id="other_text"
                                                    label="อื่นๆ"
                                                    autoFocus
                                                    onChange={handleChange} style={{fontFamily:"Athiti"}} className="fs-5"
                                                    />
                                                </Col>
                                            </Row>
                                </Form> 
                            </div>        
                            <div className=" m-2 d-flex justify-content-center">
                                <Button   className='bg-secondary  justify-content-center' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} onClick={handleClick} style={{width:"12rem"}}>
                                    <p style={{fontFamily:"Athiti"}}  className="fs-4">ยืนยัน</p> 
                                </Button>
                                
                            </div>
                </Card>     
            </div>
        
        </div>    
    );
   
}
export default Homenotlogin