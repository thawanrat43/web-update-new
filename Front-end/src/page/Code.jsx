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
import PasswordStrength from '../compament/PasswordStrength';
import { InputAdornment } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import {IconButton} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import '../compament/PasswordStrength.css';
import Alert from 'react-bootstrap/Alert';
const Code = () => {
    const { userid }  = useParams();
    const [oldpassword,setoldpassword] = useState("");
    const [newpassword,setnewpassword] = useState("");
    const [conpassword,setconpassword] = useState("");
    const [user ,setUser] = useState([]);
    const [visible,setVisible] = useState(false);
    const [visiblecon,setVisiblecon] = useState(false);
    const [inputs,setInputs] = useState({
        password: "",
    })
    const [err, setError] = useState(null);
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
            
            
        })
          
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
    const handleChangePassword = (e) => {
        let password  = e.target.value;
        setInputs({
          ...inputs,
          password:e.target.value
        });
        setError(null);
        let capsCount, smallCount, numberCount, symbolCount
        if (password.length < 4) {
          setError("Password must be minimum 4 characters include one UPPERCASE, lowercase, number and special character: @$! % * ? &");
          return;
        }
        else {
          capsCount = (password.match(/[A-Z]/g) || []).length
          smallCount = (password.match(/[a-z]/g) || []).length
          numberCount = (password.match(/[0-9]/g) || []).length
          symbolCount = (password.match(/\W/g) || []).length
          if (capsCount < 1) {
            setError("Must contain one UPPERCASE letter");
            return;
          }
          else if (smallCount < 1) {
            setError("Must contain one lowercase letter");
            return;
          }
          else if (numberCount < 1) {
            setError("Must contain one number");
            return;
          }
          else if (symbolCount < 1) {
            setError("Must contain one special character: @$! % * ? &");
            return;
          }
        }
    }
    const updatepassword=async ()=>{
        try{
            await axios.post(`https://back-end-newupdate.onrender.com/code/${userid}`,
            {
                oldpassword: oldpassword,
                newpassword: inputs.password,
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
    const getcheck = async () =>{
        try{
          if(data[0].status==''){
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
    }
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
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    const [isStrength, setStrength] = useState(null);
    const dataHandler = async (childData) => {
        setStrength(childData);
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
                                        <Image src={"https://back-end-newupdate.onrender.com/"+users.profilepic}roundedCircle style={{width : '3rem'}} />
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
                                                <Image className='img-fluid' src={"https://back-end-newupdate.onrender.com/"+users.profilepic}  />
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
                                        type={visible ? "text" :"password"}
                                        
                                        onChange={handleChangePassword}
                                        InputProps={{ // <-- This is where the toggle button is added.
                                            endAdornment: <Endadorment visible={visible} setVisible={setVisible}/>
                                        }}
                                        
                                    />
                                    <PasswordStrength password={inputs.password} actions={dataHandler}/>
                                    {err !== null && (
                                        <Alert key={"danger"} variant={"danger"}>
                                            <label htmlFor="password">
                                                <p className="errors m-1" > {err}</p>
                                            </label>
                                        </Alert>
                                        )}
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
                                    {isStrength === 'Strong' && conpassword===inputs.password ? (
                                        <Button className='bg-secondary fs-5'  type="submit" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }} onClick={updatepassword}  style={{fontFamily:"Athiti"}}>
                                        <p>ยีนยัน</p>
                                        </Button>
                                    ):(
                                        <Button className='bg-secondary fs-5'  type="submit" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }} onClick={updatepassword}  style={{fontFamily:"Athiti"}} disabled>
                                        <p>ยีนยัน</p>
                                        </Button>
                                    )}
                                </div>
                                
                            </div>
                            
                        </div>
                    
                </Container> 
            </div>
        ))}        
        </div>
    )
}

export default Code
