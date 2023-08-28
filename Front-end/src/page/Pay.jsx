import React from 'react'
import Bar from '../compament/Bar'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useState,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import { Image } from 'react-bootstrap';
const Pay = () => {

  const [user ,setUser] = useState([]);
  const getdata = async ()=>{
    try{
        const response = await axios.get(`http://localhost:3333/profileid`);
        setUser(response.data);
    } catch (err) {
        console.log(err);
    }
  }
  useEffect(() => {
            
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
      <div>
        {user.map((users,key9)=>
        <Navbar key={key9} collapseOnSelect expand="lg" className="bg-wh">
            <Container>
              <Link to={`/`}>
                <Navbar.Brand >CHECK</Navbar.Brand>
              </Link>
                              
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="1" >          
                  <LinkContainer to={`/${users.id}`} className='mr-3 mt-4' style={{ textDecoration: 'none' }} >
                    <Nav.Link eventKey="1" >ตรวจประวัติ</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={`/pagestatus/${users.id}`} className='mr-3 mt-4' style={{ textDecoration: 'none' }}>
                    <Nav.Link  eventKey="3" >สถานะการตรวจประวัติ</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to={`/profile/${users.id}`}  >
                    <Nav.Link eventKey="4" className='ml-2 mr-3 '>
                      <Image src={"http://localhost:3333/"+users.profilepic}roundedCircle style={{width : '3rem'}} />
                    </Nav.Link>
                  </LinkContainer>        
                <Nav.Link eventKey="2" onClick={logout} className='mt-4'>logout</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
            
        </Navbar>
        )}
        <Container className='m-5 p-5'>
            <p className='fs-3'>ช่องทางการชำระเงิน</p>
            <div>
            {user.map((users,k11)=>
              <div key={k11}>
                <Link to={`/qrcode/${users.id}`}>
                  <Button className='bg-secondary'  variant="primary" size="lg">
                    <div className='mt-1 d-flex'>
                      
                      <p className='ml-3 mt-1 bi bi-qr-code-scan'>  QRcode</p>
                    </div>
                    
                  </Button>
                </Link>
              </div>
            )}
                
            </div>
        </Container>
      </div>
    </div>
  )
}

export default Pay
