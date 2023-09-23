import React,{useEffect, useState} from 'react'
import Bar from '../compament/Bar'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Barprofile from '../compament/Barprofile';
import { key } from 'localforage';
import { SettingsRemoteSharp } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useLocation, useParams,Link } from "react-router-dom";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Button } from 'react-bootstrap';
const Finish = () => {
    const { id }  = useParams();
    const [user ,setUser] = useState([]);
    const [profile,setProfile] =useState([]);
    const getprofile = async ()=>{
        try{
            const response = await axios.get(`https://back-end-nr6u.onrender.com/profilehistory/${id}`);
            setUser(response.data);
            
        } catch (err) {
            console.log(err);
        }
    };
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
        getprofile();        
        
    }, []);
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    return (
        <div>
            {user.map((users,key15)=>
                <Navbar key={key15} collapseOnSelect expand="lg" className="bg-wh"  style={{fontFamily:"Athiti"}}>
                    <Container>
                            <Link to={`/home`}>
                                <Navbar.Brand className='fs-1'>CHECK</Navbar.Brand>
                            </Link>
                            
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="justify-content-end flex-grow-1 pe-3 fs-5" variant="underline" activeKey="3" >
                            
                                <LinkContainer to={`/home`} className='mr-3 mt-4' style={{ textDecoration: 'none' }} >
                                    <Nav.Link eventKey="1">ตรวจประวัติ</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={`/pagestatus/${id}`} className='mr-3 mt-4' style={{ textDecoration: 'none' }}>
                                    <Nav.Link  eventKey="3" >สถานะการตรวจประวัติ</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={`/profile/${id}`}  >
                                        <Nav.Link eventKey="4" className='ml-2 mr-3 '>
                                            <Image src={"https://back-end-nr6u.onrender.com/"+users.profilepic}roundedCircle style={{width : '3rem'}} />
                                    </Nav.Link>
                                </LinkContainer>
                                        
                                    
                                <Nav.Link eventKey="2" onClick={logout} className='mt-4'>logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            )}
            <Container className='m-5 p-5 justify-content-center' >
                <div className="bi bi-check-lg d-flex justify-content-center mt-4" style={{fontSize:'10rem',fontFamily:"Athiti"}}  >
                </div>
                <p className='fs-2 d-flex justify-content-center mb-5 mt-2'  style={{fontFamily:"Athiti"}}>ชำระเงินเสร็จสิ้น</p>
                {user.map((users,key4)=>
                <Row key={key4} className="d-flex justify-content-center  "  style={{fontFamily:"Athiti"}}>
                    <Col xs lg="4" className="d-flex justify-content-center  ">
                        <Link to={`/home`} >
                            <Button variant="secondary" fullWidth style={{width:"15rem"}} >
                                <p className='fs-5'>ไปหน้าตรวจประวัติ</p>
                            </Button>
                        </Link>
                    </Col>
                    <Col xs lg="4" className="d-flex justify-content-center  ">
                        <Link to={`/pagestatus/${users.id}`} >
                            <Button variant="secondary" fullWidth style={{width:"15rem"}} >
                                <p className='fs-5'>ไปหน้าสถานะการตรวจสอบ</p>
                            </Button>
                        </Link>
                        
                    </Col>
                </Row>
                )}
            </Container>
        </div>
    )
}

export default Finish