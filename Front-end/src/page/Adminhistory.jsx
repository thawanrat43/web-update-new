//*bythawanrat Songsri start:
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
import { TextField } from '@mui/material';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';

const Adminhistory = () => {
    const [input,setInputs] =useState({
        birthday:"",
        father:"",
        mother:"",
        religion:"",
        criminal:"",
        bankrupt:"",
        credit:"",
        penalty:"",
        global:"",
        other:""
    });
    const { id }  =useParams();
    const [user ,setUser] = useState([]);
    const getdata = async ()=>{
        try{
            const response = await axios.get(`/api/historyselect/${id}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {     
        getdata();
    }, []);
    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post(`/api/adminhistory/${id}`, input)
          .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }else{
                console.log(input)
            }
            });
        } catch (err) {
          setErr(err.response.data);
          console.log(err)
        }
        
    };
    console.log(id);
    console.log(user);
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    return (
        <div>
         <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>

                    <Navbar.Brand href='/' >CHECK</Navbar.Brand>

                            
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3 " variant="underline" activeKey="1">
                        <Nav.Link eventKey={1} href="/adminuser">รายชื่อผู้ใช้</Nav.Link>
                        
                    <Nav.Link  >logout</Nav.Link>    
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>   
        <Container>
            <div className='m-5'>
                <p className='fs-2 mb-5'>เพิ่มประวัติผู้ใช้</p>
                <div>
                {user.map((users,key7)=>
                    <div key={key7}>
                        <div>
                            <div >
                                                 
                                <Row>
                                    <Col>
                                        <TextField 
                                            required 
                                            fullWidth 
                                            id="birthday" 
                                            label="วันเดือนปีเกิด" 
                                            name="birthday" 
                                            onChange={handleChange} 
                                            className='mb-4'
                                        />
                                    </Col>
                                    <Col>
                                        <TextField
                                            required
                                            fullWidth
                                            id="father"
                                            label="บิดา"
                                            name="father"
                                            onChange={handleChange}
                                            className='mb-4'
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <TextField
                                            required
                                            fullWidth
                                            id="mother"
                                            label="มารดา"
                                            name="mother"
                                            onChange={handleChange}
                                            className='mb-4'
                                        />
                                    </Col>
                                    <Col>
                                        <TextField
                                            required
                                            fullWidth
                                            id="religion"
                                            label="ศาสนา"
                                            name="religion"
                                            onChange={handleChange}
                                            className='mb-4'
                                        />
                                    </Col>
                                </Row>
                                
                                    {users.criminal === '1' ? (
                                        <TextField
                                        required
                                        fullWidth
                                        id="criminal"
                                        label="ประวัติอาชญากร"
                                        name="criminal"
                                        onChange={handleChange}
                                        className='mb-4'
                                    />
                                    ) : (
                                        <p></p>
                                    )}
                                    {users.credit === '1' ? (
                                        <TextField
                                        required
                                        fullWidth
                                        id="credit"
                                        label="เครดิตบูโร"
                                        name="credit"
                                        onChange={handleChange}
                                        className='mb-4'
                                    />
                                    ) : (
                                        <p></p>
                                    )}
                                    {users.bankrupt === '1' ? (
                                        
                                        <TextField
                                            required
                                            fullWidth
                                            id="bankrupt"
                                            label="คดีล้มละลาย"
                                            name="bankrupt"
                                            onChange={handleChange}
                                            className='mb-4'
                                        />
                                    ) : (
                                        <p></p>
                                    )}
                                    {users.penalty === '1' ? (
                                        <TextField
                                        required
                                        fullWidth
                                        id="penalty"
                                        label="คดีอาญา"
                                        name="penalty"
                                        onChange={handleChange}
                                        className='mb-4'
                                    />
                                    ) : (
                                        <p></p>
                                    )}
                                    {users.global === '1' ? (
                                        <TextField
                                            required
                                            fullWidth
                                            id="global"
                                            label="global sanctions"
                                            name="global"
                                            onChange={handleChange}
                                            className='mb-4'
                                        />
                                    ) : (
                                        <p></p>
                                    )}
                                    {users.other_text === '1' ? (
                                        <TextField
                                            required
                                            fullWidth
                                            id="other"
                                            label={users.other_text} 
                                            name="other"
                                            onChange={handleChange}
                                            className='mb-4'
                                        />
                                        
                                    ) : (
                                        <p></p>
                                        
                                    )}
                                    
                            </div>               
                        
                            <div className='d-flex justify-content-end mt-3'>
                                    <Row>
                                        <Col>
                                            <Button  className='fs-5 mr-3 text-black ' style={{backgroundColor:'#3CB371',width:90,height:60}} onClick={handleClick}>
                                                <p className='px-2 mt-1'>ยืนยัน</p>
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Button href='/adminhistoryuser' className='fs-5 ml-3 text-black'style={{backgroundColor:'#CD5C5C',width:90,height:60}}>
                                                <p>ยกเลิก</p>
                                            </Button>
                                        </Col>
                                    </Row>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        </Container>
        </div>
    )
}

export default Adminhistory
