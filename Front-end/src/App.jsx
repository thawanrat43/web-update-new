
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './page/Home'
import Login from './page/Login'
import Register from './page/Register';
import Profile from './page/profile';
import Code from './page/Code';
import Pagestatus from './page/Pagestatus';
import History from './page/History';
import Pay from './page/Pay';
import Qrcode from './page/Qrcode';
import Finish from './page/Finish';
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useParams} from 'react-router-dom';
function App() {
  let {id} =useParams()
  return (
    <Router>
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
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>
        <Route path='/profile/:id' element={<Profile/>}/>
        
      </Routes>
    </Router>
   
      
  )
}

export default App
