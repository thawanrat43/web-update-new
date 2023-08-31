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
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    const updatepic =(e) =>{
        const formdata= new FormData()
        formdata.append('file',file)
        e.preventDefault();
        try{
            axios.post(`http://localhost:3333/updatepic/${userid}`,formdata)
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
            axios.get(`http://localhost:3333/image/${userid}`)
            .then(response =>
                setimage(response.data[0].image)
            )
            
        } catch (err) {
            console.log(err);
        }
    };
    const getdata = async ()=>{
        try{
            const response = await axios.get(`/api/profile/${userid}`);
            setUser(response.data);
            
        } catch (err) {
            console.log(err);
        }
    };
    const updatedata = async (e)=> {
        e.preventDefault();
        try{
            await axios.post(`/api/profileupdate/${userid}`,inputs)
            .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }
            });
        }catch (err) {
            console.log(err);
        }
    };
    useEffect(() => {
            
        getdata();
       
    }, []);
    const navStyle = {
        lineHeight: "1.5",
        border: "none",
        color: "#708090"
    }
    return (
        <div>
        {user.map((users,i)=>(    
            <div key={i}>
                <Navbar collapseOnSelect expand="lg" className="bg-white">
                    <Container>
                        <Link to={`/home`}>
                            <Navbar.Brand >CHECK</Navbar.Brand>
                        </Link>
                            
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="4" >
                            
                            <LinkContainer to={`/home`} className='mr-3 mt-4' style={{ textDecoration: 'none' }} >
                                <Nav.Link >ตรวจประวัติ</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/pagestatus/${userid}`} className='mr-3 mt-4' style={{ textDecoration: 'none' }}>
                                <Nav.Link   >สถานะการตรวจประวัติ</Nav.Link>
                            </LinkContainer>
                            <LinkContainer to={`/profile/${userid}`}  >
                                    <Nav.Link eventKey="4" className='ml-2 mr-3 '>
                                        <Image src={"http://localhost:3333/"+users.profilepic}roundedCircle style={{width : '3rem'}} />
                                </Nav.Link>
                            </LinkContainer>
                                    
                                
                            <Nav.Link eventKey="2" onClick={logout} className='mt-4'>logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container >
                    
                        
                        <div  className='d-flex justify-content-center p-5'>
                            
                            <Card style={{ width: '18rem'  }} className='m-5'>
                                <Card.Body>
                                    <Row >
                                        <Col xs={6} md={4}> 
                                            <div>
                                                <input type="file"   onChange={e => setFile(e.target.files[0])}/>
                                                
                                            </div>
 
                                        </Col>
                                        <Col className='d-flex justify-content-center'>
                                            <Image className='mt-3' src={"http://localhost:3333/"+users.profilepic}roundedCircle style={{width : '15rem' ,height : '15rem'}} />
                                        </Col>
                                        <Col className='d-flex justify-content-center'>
                                            <Button className='bg-secondary text-white p-2 '  type="submit"onClick={updatepic}>
                                                        Submit
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Row className='p-3'>
                                        <Link to={`/profile/${userid}`}>
                                            <Button className='bg-secondary'  type="submit" fullWidth variant="contained"  sx={{ mt: 3 }}>
                                                ประวัติส่วนตัว
                                            </Button>
                                        </Link>
                                    </Row>
                                    <Row className='p-3'>
                                        <Link to={`/code/${userid}`}>
                                            <Button className='bg-secondary text-wh'  type="submit" fullWidth variant="contained"  sx={{  mb: 2 }}>
                                                
                                                เปลี่ยนรหัสผ่าน
                                            </Button>
                                        </Link>
                                    </Row>
                                    
                                </Card.Body>
                            </Card>
                            <div className='pl-5'>
                                <div className='mb-4 mt-5'>
                                    <span>ประวัติส่วนตัว</span>
                                </div>
                                
                                <div>
                                    
                                    <Row>
                                        <Col>
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
                                        <Col>
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
                                    <Button className='bg-secondary'  type="submit" fullWidth variant="contained"  sx={{ mt: 3, mb: 2 }} onClick={updatedata}>
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
