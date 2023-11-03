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
import Button from '@mui/material/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
const Pagestatus = () => {
    const { id }  =useParams();
    const [user ,setUser] = useState([]);
    const [profile,setProfile] =useState([]);
    const [check ,setCheck] = useState([]);
    let numrepeat = 0;
    const checkidcard = async ()=>{
        numrepeat = 0;
        for(let i =0; i < user.length; i++) {
            for(let j =0; j < user.length; j++) {
                if(user[i].idcard == user[j].idcard){
                    check[i] = user[i]
                    j++;
                }
            } 
        }  
        console.log(check)
    }
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/pagestatus/${id}`);
            setUser(response.data);
            
        } catch (err) {
            console.log(err);
        }
    }
    const getcheck = async () =>{
        try{
          if(profile[0].status==''){
            window.location='/login'
            localStorage.removeItem('token');
          }else{
            
          }
          
        } catch (err) {
            console.log(err);
        }
    }
    const getprofile = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/profile/${id}`);
            setProfile(response.data);
            getcheck();
        } catch (err) {
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
        getprofile();
        

    }, []);
    
    const headlineStyle = {
        backgroundColor: "#D9D9D9",
        lineHeight: "1.5",
        border: "none",
        color: "black",
        
    }
    const navStyle = {
        lineHeight: "1.5",
        border: "none",
        color: "#708090",
       
    
    }
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    
    console.log(user)
    console.log(profile)
    
    return (
        <div>
            
            <div>
                {profile.map((profiles,key15)=>
                <Navbar key={key15} collapseOnSelect expand="lg" className="" style={{backgroundColor:'white'}}>
                    <Container>
                            <Link to={`/home`}>
                                <Navbar.Brand className='fs-1' style={{fontFamily:"Athiti"}}>CHECK</Navbar.Brand>
                            </Link>
                            
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="3" style={{fontFamily:"Athiti"}} >
                            
                                <LinkContainer to={`/home`} className='mr-3 mt-4 fs-5' style={{ textDecoration: 'none' }} >
                                    <Nav.Link eventKey="1">ตรวจประวัติ</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={`/pagestatus/${id}`} className='mr-3 mt-4 fs-5' style={{ textDecoration: 'none' }}>
                                    <Nav.Link  eventKey="3" >สถานะการตรวจประวัติ</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={`/profile/${id}`}  >
                                        <Nav.Link eventKey="4" className='ml-2 mr-3 '>
                                            <Image className='mt-2' src={"https://back-end-newupdate.onrender.com/"+profiles.profilepic}roundedCircle style={{width : '3rem'}} />
                                    </Nav.Link>
                                </LinkContainer>
                                        
                                    
                                <Nav.Link eventKey="2" onClick={logout} className='mt-4 fs-5'>logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                )}
                <div className='d-flex  justify-content-center'>
                    <div style={{width:"60%"}}>
                        <p className='fs-2 m-4 mt-2 ' style={{fontFamily:"Athiti"}}>สถานะการตรวจประวัติ</p>
                        {user.map((users,key4)=>
                            
                            <div key={key4} className='' >
                                
                                { users === '' ? (
                                    <p>ไม่มีการตรวจประวัติ</p>
                                ):( 
                                    <div  className=' mb-3 p-1 rounded' style= { headlineStyle }>
                                    <Container className='m-2 fs-6 ' >
                                            <div>

                                                {users.pay === 'เสร็จสิ้น'  ? (
                                                     <div>
                                                            <Link to={`/history/${users.idhistory}`} style={{color: "#708090" ,textDecoration: 'none'}}>
                                                            <Row className='mt-3 ml-3 fs-6' style={{fontFamily:"Athiti"}}>
                                                                <Col>
                                                                    <p >ชื่อ-นามสกุล</p>
                                                                </Col>
                                                                <Col>
                                                                    <p>หมายเลขประจำตัวประชาชน</p>
                                                                </Col>
                                                                <Col>
                                                                    <p>สถานะ</p>
                                                                </Col>
                                                            </Row>
                                                            <Row className='m ml-3 mb-3 text-black fs-6' style={{fontFamily:"Athiti"}}>
                                                                <Col>
                                                                    <p>{users.type_id} {users.fname} {users.lname} </p>
                                                                </Col>
                                                                <Col>
                                                                    <p>{users.idcard}</p>
                                                                </Col>
                                                                <Col >
                                                                    <p>{users.pay}</p>
                                                                </Col>
                                                            </Row>
                                                        </Link>  
                                                        
                                                    </div>
                                                          

                                                ) : users.pay === "กำลังตรวจสอบการชำระเงิน" ?(
                                                    <div style={{color: "#708090" ,textDecoration: 'none'}}>
                                                        <Row className='mt-3 ml-3 fs-6' style={{fontFamily:"Athiti"}} >
                                                            <Col>
                                                                <p>ชื่อ-นามสกุล</p>
                                                            </Col>
                                                            <Col>
                                                                <p>หมายเลขประจำตัวประชาชน</p>
                                                            </Col>
                                                            <Col>
                                                                <p>สถานะ</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className='m ml-3 mb-3 text-black fs-6' style={{fontFamily:"Athiti"}}>
                                                            <Col>
                                                                <p>{users.type_id} {users.fname} {users.lname} </p>
                                                            </Col>
                                                            <Col>
                                                                <p>{users.idcard}</p>
                                                            </Col>
                                                            <Col >
                                                                <p>{users.pay}</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ): users.pay === "ชำระเงินเสร็จสิ้น" ?(
                                                    <div style={{color: "#708090" ,textDecoration: 'none'}}>
                                                        <Row className='mt-3 ml-3 fs-6' style={{fontFamily:"Athiti"}} >
                                                            <Col>
                                                                <p>ชื่อ-นามสกุล</p>
                                                            </Col>
                                                            <Col>
                                                                <p>หมายเลขประจำตัวประชาชน</p>
                                                            </Col>
                                                            <Col>
                                                                <p>สถานะ</p>
                                                            </Col>
                                                        </Row>
                                                        <Row className='m ml-3 mb-3 text-black fs-6' style={{fontFamily:"Athiti"}}>
                                                            <Col>
                                                                <p>{users.type_id} {users.fname} {users.lname} </p>
                                                            </Col>
                                                            <Col>
                                                                <p>{users.idcard}</p>
                                                            </Col>
                                                            <Col >
                                                                <p>{users.pay}</p>
                                                            </Col>
                                                        </Row>
                                                    </div>
                                                ): users.pay === "กำลังตรวจสอบ" ?(
                                                    <div style={{color: "#708090" ,textDecoration: 'none'}}>
                                                    <Row className='mt-3 ml-3 fs-6' style={{fontFamily:"Athiti"}} >
                                                        <Col>
                                                            <p>ชื่อ-นามสกุล</p>
                                                        </Col>
                                                        <Col>
                                                            <p>หมายเลขประจำตัวประชาชน</p>
                                                        </Col>
                                                        <Col>
                                                            <p>สถานะ</p>
                                                        </Col>
                                                    </Row>
                                                    <Row className='m ml-3 mb-3 text-black fs-6' style={{fontFamily:"Athiti"}}>
                                                        <Col>
                                                            <p>{users.type_id} {users.fname} {users.lname} </p>
                                                        </Col>
                                                        <Col>
                                                            <p>{users.idcard}</p>
                                                        </Col>
                                                        <Col >
                                                            <p>{users.pay}</p>
                                                        </Col>
                                                    </Row>
                                                </div>
                                                ):(
                                                <Link to={`/pay/${users.idhistory}`} style={{color: "#708090" ,textDecoration: 'none'}}>
                                                <Row className='mt-3 ml-3 fs-6' style={{fontFamily:"Athiti"}} >
                                                    <Col>
                                                        <p>ชื่อ-นามสกุล</p>
                                                    </Col>
                                                    <Col>
                                                        <p>หมายเลขประจำตัวประชาชน</p>
                                                    </Col>
                                                    <Col>
                                                        <p>สถานะ</p>
                                                    </Col>
                                                </Row>
                                                <Row className='m ml-3 mb-3 text-black fs-6' style={{fontFamily:"Athiti"}}>
                                                    <Col>
                                                        <p>{users.type_id} {users.fname} {users.lname} </p>
                                                    </Col>
                                                    <Col>
                                                        <p>{users.idcard}</p>
                                                    </Col>
                                                    <Col >
                                                        <p>{users.pay}</p>
                                                    </Col>
                                                </Row>
                                            </Link>)}
                                                
                                            </div>
                                       
                                        
                                    
                                        
                                    </Container>
                                    
                                    </div> 
                                )}
                                
                            </div>
                        )}
                    </div>
                    
                    
                    
                    
                </div>
            </div>
        </div>
        
    )
}

export default Pagestatus