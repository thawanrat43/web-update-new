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
const Pay = () => {
  const {id} = useParams([]);
  const [user ,setUser] = useState([]);
  const getdata = async ()=>{
    try{
        const response = await axios.get(`http://localhost:3333/profilehistory/${id}`);
        setUser(response.data);
    } catch (err) {
        console.log(err);
    }
  }
  const token = async () =>{
    const token = localStorage.getItem('token');
    try{
        const response = await axios.get(`http://localhost:3333.com/token`,{
            headers: {
            Authorization: 'Bearer ' + token //the token is a variable which holds the token
        }})
        .then((response) => {
            if (response.data.error) {
                // window.location='/login'
            }
            });
    } catch (err) {
        console.log(err);
        // window.location='/login'
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
  console.log(user)
  return (
    <div>
      <div>
        

      {user.map((profiles,key15)=>
                <Navbar key={key15} collapseOnSelect expand="lg" className="bg-wh" style={{fontFamily:"Athiti"}}>
                    <Container>
                            <Link to={`/home`}>
                                <Navbar.Brand className='fs-1' >CHECK</Navbar.Brand>
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
                                            <Image src={"https://back-end-nr6u.onrender.com/"+profiles.profilepic}roundedCircle style={{width : '3rem'}} />
                                    </Nav.Link>
                                </LinkContainer>
                                        
                                    
                                <Nav.Link eventKey="2" onClick={logout} className='mt-4'>logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                )}
       
          
        
        
        
        <Card className='m-5 p-5 justify-content-start' style={{fontFamily:"Athiti" ,width:"40%",height:'60%'}} >
            <p className='fs-2 mb-5'>ช่องทางการชำระเงิน</p>
            <div>
            {user.map((userss,k11)=>
              <div key={k11}>
                <Link to={`/qrcode/${id}`}>
                  <Button className='bg-secondary text-white fs-6'  variant="primary" size="lg">
                    <div className='mt-1 d-flex'>
                      
                      <p className='ml-3 mt-1 bi bi-qr-code-scan fs-5' style={{fontFamily:"Athiti"}}>  QRcode</p>
                    </div>
                    
                  </Button>
                  
                </Link>
              </div>
            )}
                
            </div>
        </Card>
      </div>
    </div>
  )
}

export default Pay
