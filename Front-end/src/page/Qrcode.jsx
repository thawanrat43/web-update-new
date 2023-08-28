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
import qr from '../image/qrcode.jpg'

const Qrcode = () => {
    const { id }  = useParams();
    const [user ,setUser] = useState([]);
    const data = 0 ;
    const getdata = async ()=>{
      try{
          const response = await axios.get(`http://localhost:3333/profilehistory/${id}`);
          setUser(response.data);
      } catch (err) {
          console.log(err);
      }
    }
    useEffect(() => {
            
        getdata();
       
    }, []);
    const updatepay = async (e)=> {
      e.preventDefault();
      try{
          await axios.post(`http://localhost:3333/pay/${id}`)
          .then((response) => {
          if (response.data.error) {
              alert(response.data.error);
          }
          });
      }catch (err) {
          console.log(err);
      }
    };
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
        {user.map((users,key4)=>
        <div  key={key4}>
          <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
              <Link to={`/`}>
                <Navbar.Brand >CHECK</Navbar.Brand>
              </Link>
                              
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="4" >          
              <LinkContainer to={`/`} className='mr-3 mt-4' style={{ textDecoration: 'none' }} >
                <Nav.Link >ตรวจประวัติ</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/pagestatus/${users.id}`} className='mr-3 mt-4' style={{ textDecoration: 'none' }}>
                <Nav.Link   >สถานะการตรวจประวัติ</Nav.Link>
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
          <Container>
            
            <div className='m-5 p-5'>
              <Container >
                <Row>
                  <p className='d-flex justify-content-center fs-3'>ชำระเงิน</p>                 
                </Row>
                <Row className='d-flex justify-content-center m-3'>
                   <Image src={qr} style={{height:"25rem",width:'20rem'}}/>               
                </Row>
                {/* {users.criminal === '' ? (
                  data=data+0;
                ) : (
                  data=data+100;
                )} */}
                <Row>
                  <p className='d-flex justify-content-center'>จำนวนที่ต้องชำระ :  100 </p>                   
                </Row>
                <Row >
                  <Link to={`/finish/${users.id}`} className='d-flex justify-content-center'>
                    <Button  className='bg-secondary text-white' type="submit"  variant="contained" style={{width:'10rem'}} onClick={updatepay} >
                      <p className='m-2'>ชำระเงินเสร็จสิ้น</p> 
                    </Button>
                  </Link>
                    
                </Row>                  
              </Container>
              
            </div>
          
          
          </Container>
        </div>
        
        )}
      </div>
    )
}

export default Qrcode
