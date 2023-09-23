import React from 'react'
import Bar from '../compament/Bar'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Barprofile from '../compament/Barprofile';
import { useEffect,useState } from 'react';
import { useParams,Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Token } from '@mui/icons-material';
import Popup from 'reactjs-popup';
import Swal from 'sweetalert2';
const Code = () => {
    const { userid }  = useParams();
    const [oldpassword,setoldpassword] = useState("");
    const [newpassword,setnewpassword] = useState("");
    const [conpassword,setconpassword] = useState("");
    const [user ,setUser] = useState([]);
    const popup = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'เปลี่ยนรหัสผ่านเสร็จสิ้น',
            
            
        }).then((result) => {
            if (result.value) {
              window.location.href = `/code/${userid}`
            }
        });
          
    }
    const popuperror = async ()=>{
        Swal.fire({
            icon: 'error',
            title: 'ไม่สำเร็จ',
            text: 'เปลี่ยนรหัสผ่านไม่สำเสร็จ'
            
            
        }).then((result) => {
            if (result.value) {
                window.location.href = `/code/${userid}`
            }
        });
          
    }
    const updatepassword=async ()=>{
        try{
            await axios.post(`https://back-end-nr6u.onrender.com/code/${userid}`,
            {
                oldpassword: oldpassword,
                newpassword: newpassword,
                conpassword: conpassword
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
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-nr6u.onrender.com/profile/${userid}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const token = async () =>{
        const token = localStorage.getItem('token');
        try{
            const response = await axios.get(`https://back-end-nr6u.onrender.com/token`,{
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
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    
    return (
        <div>
            {user.map((users,key)=>(
            <div key={key} >
                <Navbar collapseOnSelect expand="lg" className="bg-white" style={{fontFamily:"Athiti"}}>
                    <Container>
                            <Link to={`/home`}>
                                <Navbar.Brand className='fs-1'>CHECK</Navbar.Brand>
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
                                        <Image src={"https://back-end-nr6u.onrender.com/"+users.profilepic}roundedCircle style={{width : '3rem'}} />
                                </Nav.Link>
                            </LinkContainer>
                                    
                                
                            <Nav.Link eventKey="2" onClick={logout} className='mt-4'>logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container>
                        <div className='d-flex justify-content-center p-5'>
                            <Card  style={{ width: '20rem'  }} className='m-5'>  
                                    <Card.Body >
                                        <Row>
                                            <Col  className='justify-content-center m-5'> 
                                                <Image src={"https://back-end-nr6u.onrender.com/"+users.profilepic}roundedCircle style={{width : '100%'}} />
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
                            <div className='pl-5' style={{fontFamily:"Athiti"}}>
                                <div className='mb-4 mt-5'>
                                    <span className='fs-2' >เปลี่ยนรหัสผ่าน</span>
                                </div>        
                                <div>
                                    
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="รหัสผ่านเดิม"
                                    type="password"
                                    
                                    onChange={(e) => {
                                        setoldpassword(e.target.value);
                                    }}
                                    />
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newpassword"
                                    label="รหัสผ่านใหม่"
                                    type="password"
                                    
                                    onChange={(e) => {
                                        setnewpassword(e.target.value);
                                    }}
                                    />
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="newpassword"
                                    label="ยืนยันรหัสผ่าน"
                                    type="password"
                                    
                                    onChange={(e) => {
                                        setconpassword(e.target.value);
                                    }}
                                    />
                                </div>
                                <Button className='bg-secondary fs-5'  type="submit" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }} onClick={updatepassword}  style={{fontFamily:"Athiti"}}>
                                        <p>ยีนยัน</p>
                                </Button>
                            </div>
                            
                        </div>
                    
                </Container> 
            </div>
        ))}        
        </div>
    )
}

export default Code
