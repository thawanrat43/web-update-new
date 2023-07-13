import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
const Barprofile = () => {
  
  return (
    <div>
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="#home" >CHECK</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#deets" className='mt-3 me-3'>ตรวจประวัติ</Nav.Link>
                    
                    <Nav.Link href="/profile">
                        <Image src="./public/10.webp" roundedCircle style={{width : '3rem'}} />
                    </Nav.Link>
                                 
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </div>
  )
}

export default Barprofile