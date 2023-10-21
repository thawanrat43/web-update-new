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
import { Card, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import sessionstorage from 'sessionstorage';
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Home =() =>{ 
    const [err, setErr] = useState(null);
    const [user ,setUser] = useState([]);
    const [history,setHistory] = useState([])
    
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
    const navigate = useNavigate()
    const navStyle = {
        lineHeight: "1.5",
        border: "none",
        color: "#708090"
      
    }
    const popups = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'กรอกประวัติเสร็จสิ้น',
            ButtonColor: '#D3D3D3',
            ButtonText: 'ยืนยัน',
            
        }).then((result) => {
            if (result) {
              window.location.href = `/home`
            }
        });
          
      }
    const token = localStorage.getItem('token');
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
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
            await axios.post(`http://localhost:3333/home`,inputs,{
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            
            } )
          
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                }
                    popups();
                });
        } catch (err) {
          setErr(err.response.data);
          console.log(err)
          
        }
        
    };
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
    // const getidhistory = async (e)=>{
    //     try{
    //         const response = await axios.post(`http://localhost:3333/idhistory`,inputs);
    //         setHistory(response.data);
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }
    useEffect(() => {    
        getdata();
        
    }, []);
    console.log(user)
    return (
        <div>
        
        <div>
        {user.map((users,key13)=>(
            <div key={key13}>
                <Navbar collapseOnSelect expand="lg" className="bg-wh">
                    <Container>
                            <Link to={`/home`}>
                                <Navbar.Brand style={{fontFamily:"Athiti"}} className="fs-1">CHECK</Navbar.Brand>
                            </Link>
                            
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="1" >
                                
                            <LinkContainer to={`/home`} className='mr-3 mt-4 fs-5' style={{ textDecoration: 'none' ,fontFamily:"Athiti"}} >
                                <Nav.Link eventKey="1" >ตรวจประวัติ</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/pagestatus/${users.id}`} className='mr-3 mt-4 fs-5' style={{ textDecoration: 'none',fontFamily:"Athiti" }}>
                                <Nav.Link  eventKey="3">สถานะการตรวจประวัติ</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/profile/${users.id}`}  >
                                    <Nav.Link eventKey="4" className='ml-2 mr-3 '>
                                        <Image src={"https://back-end-nr6u.onrender.com/"+users.profilepic}roundedCircle style={{width : '3rem'}} />
                                </Nav.Link>
                            </LinkContainer>
                                    
                                
                            <Nav.Link eventKey="2" onClick={logout} className='mt-4 fs-5' style={{fontFamily:"Athiti"}}>logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            ))} 
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
        
        
    </div>    
    );  

}
export default Home