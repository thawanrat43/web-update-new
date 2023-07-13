import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
const Bar =() =>{
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">CHECK</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="/">ตรวจประวัติ</Nav.Link>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                        
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
        
    );
   
}
export default Bar