import React from 'react'
import {useEffect, useState} from 'react'
import Bar from '../compament/Bar'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Barprofile from '../compament/Barprofile';
import { SettingsRemoteSharp } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useLocation, useParams ,Link} from "react-router-dom";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import Swal from 'sweetalert2';
const Profileupdate = () => {
    const [ auth , setAuth] = useState(false);
    const [user ,setUser] = useState([]);
    const navigate = useNavigate();
    const [hasError, setErrors] = useState([]);
    const location = useLocation();
    const { userid }  =useParams();
    const [file,setFile] = useState("");
    const [image,setimage] =useState();
    const [inputs,setInputs] = useState({
        username: "",
        fname: "",
        lname: "",
        phonenum: "",
    })
    const popup = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'แก้ไขประวัติส่วนตัวเสร็จสิ้น',
            
            
        }).then((result) => {
            if (result.value) {
              window.location.href = `/profileupdate/${userid}`
            }
        });
          
    }
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    const updatepic =(e) =>{
        const formdata= new FormData()
        formdata.append('file',file)
        console.log(formdata)
        e.preventDefault();
        try{
            axios.post(`https://back-end-newupdate.onrender.com/updatepic/${userid}`,formdata)
            .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }else{
                getdata();
            }
            });
        }catch (err) {
            console.log(err);
        }
    };
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const getimage = async ()=>{
        try{
            axios.get(`https://back-end-newupdate.onrender.com/image/${userid}`)
            .then(response =>
                setimage(response.data[0].image)
            )
            
        } catch (err) {
            console.log(err);
        }
    };
    const getcheck = async () =>{
        try{
          if(user[0].status==''){
            window.location='/login'
            localStorage.removeItem('token');
          }else{
            
          }
          
        } catch (err) {
            console.log(err);
        }
    }
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/profile/${userid}`);
            setUser(response.data);
            getcheck();
        } catch (err) {
            console.log(err);
        }
    };
    const updatedata = async (e)=> {
        e.preventDefault();
        try{
            await axios.post(`https://back-end-newupdate.onrender.com/profileupdate/${userid}`,inputs)
            .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }else{
                popup();
            }
            });
        }catch (err) {
            console.log(err);
        }
    };
    const token = async () =>{
        const token = localStorage.getItem('token');
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/token`,{
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }})
            .then((response) => {
                if (response.data.error) {
                    window.location='/login'
                }
                });
        } catch (err) {
            console.log(err);
            window.location='/login'
        }
    }
    useEffect(() => {
        token();  
        getdata();
       
    }, []);
    const navStyle = {
        lineHeight: "1.5",
        border: "none",
        color: "#708090"
    }
    console.log(file)
    return (
        <div>
        {user.map((users,i)=>(    
            <div key={i}>
                <Navbar collapseOnSelect expand="lg" className="bg-white" style={{fontFamily:"Athiti"}}>
                    <Container>
                        <Link to={`/home`}>
                            <Navbar.Brand className='fs-1' >CHECK</Navbar.Brand>
                        </Link>
                            
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-end flex-grow-1 pe-3 fs-5" variant="underline" activeKey="4" >
                            
                            <LinkContainer to={`/home`} className='mr-3 mt-4' style={{ textDecoration: 'none' }} >
                                <Nav.Link >ตรวจประวัติ</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/pagestatus/${userid}`} className='mr-3 mt-4' style={{ textDecoration: 'none' }}>
                                <Nav.Link   >สถานะการตรวจประวัติ</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/profile/${userid}`}  >
                                    <Nav.Link eventKey="4" className='ml-2 mr-3 '>
                                        <Image src={"https://back-end-newupdate.onrender.com/"+users.profilepic}roundedCircle style={{width : '3rem'}} />
                                </Nav.Link>
                            </LinkContainer>
                                    
                                
                            <Nav.Link eventKey="2" onClick={logout} className='mt-4'>logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container >
                    
                        
                        <div  className='d-flex justify-content-center p-5' style={{fontFamily:"Athiti"}}>
                            
                            <Card style={{ width: '18rem'  }} className='m-5'>
                                <Card.Body>
                                    <Row >
                                        <Col xs={6} md={4}> 
                                            <div>
                                                <input type="file"   onChange={e => setFile(e.target.files[0])}/>
                                                
                                            </div>
 
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className='d-flex justify-content-center m-5'>
                                            <Image className='mt-3' src={"https://back-end-newupdate.onrender.com/"+users.profilepic}roundedCircle style={{width : '100%' }} />
                                        </Col>
                                    </Row>
                                        
                                    
                                    <Row>
                                    <Col className='d-flex justify-content-center fs-6 mt-3'>
                                            <Button className='bg-secondary text-white p-2 '  type="submit" onClick={updatepic} style={{fontFamily:"Athiti"}}>
                                                        Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                        
                                    
                                    <Row className='p-3'>
                                        <Link to={`/profile/${userid}`}>
                                            <Button className='bg-secondary fs-6'  type="submit" fullWidth variant="contained"  sx={{ mt: 3 }} style={{fontFamily:"Athiti"}}>
                                                ประวัติส่วนตัว
                                            </Button>
                                        </Link>
                                    </Row>
                                    <Row className='p-3'>
                                        <Link to={`/code/${userid}`}>
                                            <Button className='bg-secondary text-wh fs-6'  type="submit" fullWidth variant="contained"  sx={{  mb: 2 }} style={{fontFamily:"Athiti"}}>
                                                
                                                เปลี่ยนรหัสผ่าน
                                            </Button>
                                        </Link>
                                    </Row>
                                    
                                </Card.Body>
                            </Card>
                            <div className='pl-5 fs-5' style={{fontFamily:"Athiti"}}>
                                <div className='mb-4 mt-5 fs-2'>
                                    <span>ประวัติส่วนตัว</span>
                                </div>
                                
                                <div>
                                    
                                    <Row>
                                        <Col xs lg="3" className='mt-4 pt-1'>
                                        ชื่อผู้ใช้
                                        </Col>
                                        <Col >
                                            <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="username"
                                                    label={users.username}
                                                    name="username"
                                                    autoComplete="username"
                                                    autoFocus
                                                    onChange={handleChange}
                                            />
                                            
                                            
                                        </Col>
                                        
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col xs lg="3" className='mt-4 pt-1'>
                                        ชื่อ-นามสกุล
                                        </Col>
                                        <Col>
                                            <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="fname"
                                                    label={users.fname}
                                                    name="fname"
                                                    autoComplete="fname"
                                                    autoFocus
                                                    onChange={handleChange}
                                            />
                                            
                                        </Col>
                                        <Col>
                                            <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="lname"
                                                    label={users.lname}
                                                    name="lname"
                                                    autoComplete="lname"
                                                    autoFocus
                                                    onChange={handleChange}
                                            />
                                            
                                        </Col>
                                        
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col xs lg="3" className='mt-4 pt-1'>
                                        เบอร์โทรศัพท์
                                        </Col>
                                        <Col>
                                            <TextField
                                                    margin="normal"
                                                    required
                                                    fullWidth
                                                    id="phonenum"
                                                    label={users.phonenum}
                                                    name="phonenum"
                                                    autoComplete="phonenum"
                                                    autoFocus
                                                    onChange={handleChange}
                                            />
                                            
                                            
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col xs lg="3" className='mt-4 pt-1'>
                                        E-mail
                                        </Col>
                                        <Col className='mt-4'>
                                            <Form.Control
                                                    type="text"
                                                    placeholder={users.email}
                                                    aria-label="Disabled input example"
                                                    disabled
                                                    readOnly
                                            />
                                            
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Button className='bg-secondary fs-5'  type="submit" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }} onClick={updatedata} style={{fontFamily:"Athiti"}}>
                                    <p>ยีนยัน</p>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    
                    
                </Container>
            </div>
        ))}    
        </div>
    )
}

export default Profileupdate
