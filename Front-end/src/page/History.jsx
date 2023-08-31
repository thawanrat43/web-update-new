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
const History = () => {
    const [user ,setUser] = useState([]);
    const { userid }  =useParams();
    const [profile,setProfile] = useState([]);
    const [history,setHistory] =useState ([]);
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    const getprofile = async ()=>{
        try{
            const response = await axios.get(`/api/profilehistory/${userid}`);
            setProfile(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    const getdata = async ()=>{
        try{
            const response = await axios.get(`/api/historydetail/${userid}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const gethistory = async ()=>{
        try{
            const response = await axios.get(`/api/history/${userid}`);
            setHistory(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        gethistory();    
        getdata();
        getprofile();
       
    }, []);
    console.log(userid);
    console.log(user);
    console.log(profile);
    const headlineStyle = {
        backgroundColor: "#D9D9D9",
        lineHeight: "1.5",
        border: "none",
        color: "black"
    }
    return (
        <div>
            
            <div>
                {profile.map((profiles,key19)=>( 
                <Navbar key={key19} collapseOnSelect expand="lg" className="bg-wh">
                    <Container>
                            <Link to={`/home`}>
                                <Navbar.Brand >CHECK</Navbar.Brand>
                            </Link>
                            
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="3" >
                            
                                <LinkContainer to={`/home`} className='mr-3 ' style={{ textDecoration: 'none' }} >
                                    <Nav.Link eventKey="1">ตรวจประวัติ</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={`/pagestatus/${userid}`} className='mr-3 ' style={{ textDecoration: 'none' }}>
                                    <Nav.Link  eventKey="3" >สถานะการตรวจประวัติ</Nav.Link>
                                </LinkContainer>
                                <LinkContainer to={`/profile/${userid}`}  >
                                        <Nav.Link eventKey="4" className='ml-2 mr-3 '>
                                            <Image src={"http://localhost:3333/"+profiles.profilepic}roundedCircle style={{width : '3rem'}} />
                                    </Nav.Link>
                                </LinkContainer>
                                        
                                    
                                <Nav.Link eventKey="2" onClick={logout} className=''>logout</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                ))} 
                
                <Container >
                    <p className='m-5 fs-2'>ประวัติ </p>
                    <div  style={headlineStyle} className=' p-5 m-5' >
                        
                        <div >
                            <div className='mb-4 pl-5' >
                                
                                <Row className='fs-6' style={{color: "#708090"}}>
                                    <Col>
                                        <p>
                                            ชื่อ-นามสกุล
                                        </p>
                                    </Col>
                                    <Col>
                                        <p>
                                            หมายเลขบัตรประจำตัวประชาชน
                                        </p>
                                    </Col>
                                    <Col>
                                        <p>
                                            วันเดือนปีเกืด
                                        </p>
                                    </Col>
                                </Row>
                                
                                <Row className='fs-5'>
                                    
                                    {history.map((historys,key18)=>(
                                    <Col key={key18}>
                                                
                                        {historys.type_id} {historys.fname} {historys.lname}
                                                
                                    </Col>
                                        ))}
                                    {history.map((historys,key18)=>(
                                    <Col key={key18}>
                                                
                                        {historys.idcard}
                                               
                                    </Col>
                                    
                                    ))}
                                    {user.map((users,key19)=>(
                                    <Col >
                                        <p3>
                                            {users.birthday}
                                        </p3>
                                    </Col>
                                    ))}
                                </Row>
                            </div>
                            {user.map((users,key16)=>(
                            <div key={key16} className='mb-4 pl-5'>
                                <Row className='fs-6' style={{color: "#708090"}}>
                                    <Col>
                                        <p2>
                                            บิดา
                                        </p2>
                                    </Col>
                                    <Col>
                                        <p2>
                                            มารดา
                                        </p2>
                                    </Col>
                                    <Col>
                                        <p2>
                                            ศาสนา
                                        </p2>
                                    </Col>
                                </Row>
                                <Row className='fs-5'>
                                    <Col>
                                        <p3>
                                            {users.father}
                                        </p3>
                                    </Col>
                                    <Col>
                                        <p3>
                                            {users.mother}
                                        </p3>
                                    </Col>
                                    <Col>
                                        <p3>
                                            {users.religion}
                                        </p3>
                                    </Col>
                                </Row>
                            </div> 
                        
                            ))}
                        {user.map((users,key16)=>(
                        <div key={key16}>
                            <div className='mb-4 pl-5'>
                                <Row className='fs-6' style={{color: "#708090"}}>
                                    <Col>
                                        <p2>
                                            ประวัติอาชญากร
                                        </p2>
                                    </Col>
                                    <Col>
                                        <p>
                                            เครดิตบูโร
                                        </p>
                                    </Col>
                                    <Col>
                                        <p>
                                            คดีล้มละลาย
                                        </p>
                                    </Col>
                                </Row>
                                <Row className='fs-5'>
                                    <Col>
                                       
                                        {users.criminal === '' ? (
                                            <p>-</p>

                                        ) : (
                                            <p>{users.criminal}</p>
                                        )}
                                       
                                    </Col>
                                    <Col>
                                        {users.credit === '' ? (
                                            <p>-</p>

                                        ) : (
                                            <p>{users.credit}</p>
                                        )}
                                    </Col>
                                    <Col>
                                        {users.bankrupt === '' ? (
                                            <p>-</p>

                                        ) : (
                                            <p>{users.bankrupt}</p>
                                        )}
                                    </Col>
                                </Row>
                            </div>

                            <div className='pl-5'>
                                <Row className='fs-6' style={{color: "#708090"}}>
                                    <Col>
                                        <p>
                                            คดีอาญา
                                        </p>
                                    </Col>
                                    <Col>
                                        <p>
                                            global sanction
                                        </p>
                                    </Col>
                                    <Col>
                                        <p>
                                            {users.other === '' ? (
                                                <p>อื่นๆ</p>

                                            ) : (
                                                <p>อื่นๆ ({user.other})</p>
                                            )}
                                            
                                        </p>
                                    </Col>
                                </Row>
                                <Row className='fs-5'>
                                    <Col>
                                        {users.penalty === '' ? (
                                            <p>-</p>

                                        ) : (
                                            <p>{users.penalty}</p>
                                        )}
                                    </Col>
                                    <Col>
                                        {users.global === '' ? (
                                            <p>-</p>

                                        ) : (
                                            <p>{users.global}</p>
                                        )}
                                    </Col>
                                    <Col>
                                        {users.other === '' ? (
                                            <p>-</p>

                                        ) : (
                                            <p>{users.other}</p>
                                        )}
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </Container>
                
            </div>
        </div>
    )
}

export default History