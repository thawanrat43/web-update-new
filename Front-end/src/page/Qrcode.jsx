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
import { Card, Image } from 'react-bootstrap';
import qr from '../image/qrcode.jpg'
import {useNavigate} from "react-router-dom"
import Swal from 'sweetalert2';
const Qrcode = () => {
    const { id }  = useParams();
    const [user ,setUser] = useState([]);
    const popups = async ()=>{
      Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'ชำระเงินเสร็จสิ้นรอการตรวจสอบการชำระเงิน',
          confirmButtonColor: '#D3D3D3',
          confirmButtonText: 'ไปหน้าตรวจประวัติ',

      }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/imgpay/${id}`
          }
      });
        
    }
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
          const response = await axios.get(`http://localhost:3333/token`,{
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
    const navigate = useNavigate()
    const updatepay = async (e)=> {
      e.preventDefault();
      try{
          await axios.post(`http://localhost:3333/pay/${id}`)
          .then((response) => {
          if (response.data.error) {
              alert(response.data.error);
          }else{
            popups();
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
      <div style={{fontFamily:"Athiti"}}>
        {user.map((users,key4)=>
        <div  key={key4}>
          <Navbar collapseOnSelect expand="lg" className="bg-wh" style={{fontFamily:"Athiti"}}>
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
              <LinkContainer to={`/pagestatus/${users.id}`} className='mr-3 mt-4' style={{ textDecoration: 'none' }}>
                <Nav.Link   >สถานะการตรวจประวัติ</Nav.Link>
              </LinkContainer>
              <LinkContainer to={`/profile/${users.id}`}  >
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
            <div className=' d-flex justify-content-center'>
            <Card className='m-5 p-5 ' style={{fontFamily:"Athiti",width:'40%'}}>
              <Container >
                <Row>
                  <p className='d-flex justify-content-center fs-3'>ชำระเงิน</p>                 
                </Row>
                <Row className='d-flex justify-content-center m-3'>
                   <Image src={qr} style={{height:"50%",width:'70%'}}/>               
                </Row>
                {/* {users.criminal === '' ? (
                  data=data+0;
                ) : (
                  data=data+100;
                )} */}
                <Row>
                  <p className='d-flex justify-content-center fs-6'>จำนวนที่ต้องชำระ :  100 </p>                   
                </Row>
                <Row className='d-flex justify-content-center'>
                 
                    <Button  className='bg-secondary text-white fs-5 ' type="submit"  variant="contained" style={{width:'12rem'}} onClick={updatepay} >
                      <p className='m-2'>ชำระเงินเสร็จสิ้น</p> 
                    </Button>
                  
                    
                </Row>                  
              </Container>
              
            </Card>
            </div>
            
          
          
          </Container>
        </div>
        
        )}
      </div>
    )
}

export default Qrcode
