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
import Swal from 'sweetalert2';
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
    const popup = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'เพิ่มประวัติผู้ตรวจสอบเสร็จสิ้น',
            
            
        }).then((result) => {
            if (result.value) {
              window.location.href=`/adminuserupdate/${id}`;
            }
        });
          
    }
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-nr6u.onrender.com/historyselect/${id}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const token = async () =>{
        const token = localStorage.getItem('token');
        try{
            const response = await axios.get(`https://back-end-nr6u.onrender.com/token`,{
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
    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
          await axios.post(`https://back-end-nr6u.onrender.com/adminhistory/${id}`, input)
          .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }else{
                popup();
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
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    return (
        <div>
         <Navbar collapseOnSelect expand="lg" className="bg-wh" style={{fontFamily:"Athiti"}}>
                    <Container>

                    <Navbar.Brand href='/adminuser'className='fs-1' >CHECK</Navbar.Brand>

                            
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3 fs-5" variant="underline" activeKey="1">
                        <Nav.Link eventKey={1} href="/adminuser">รายชื่อผู้ใช้</Nav.Link>
                        
                    <Nav.Link onClick={logout}  >logout</Nav.Link>    
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>   
        <div className='m-5 d-flex justify-content-center' style={{fontFamily:"Athiti"}}>
            <Card className='p-5'style={{width:'70%'}}>
                <p className='fs-2 mb-5'>เพิ่มประวัติผู้ตรวจสอบ</p>
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
                                            <Button  className='fs-5 mr-3 text-black mt-2' style={{backgroundColor:'#3CB371',width:90,height:60}} onClick={handleClick}>
                                                <p className='px-2 mt-1 fs-5' style={{fontFamily:"Athiti"}}>ยืนยัน</p>
                                            </Button>
                                        </Col>
                                        <Col>
                                            <Link to={`/adminuserupdate/${id}`}>
                                                <Button  className='fs-5   mt-2 text-black'style={{backgroundColor:'#CD5C5C',width:90,height:60}}>
                                                    <p style={{fontFamily:"Athiti"}}>ยกเลิก</p>
                                                </Button>
                                            </Link>
                                            
                                        </Col>
                                    </Row>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </Card>
        </div>
        </div>
    )
}

export default Adminhistory
