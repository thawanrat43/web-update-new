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
import Swal from 'sweetalert2';
const Adminuserupdate = () => {
    const { userid }  =useParams();
    const [user ,setUser] = useState([]);
    const [inputs,setInputs] = useState({
        pay:""
    })
    const token = localStorage.getItem('token');  
    const navigate = useNavigate()
    const popups = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'แก้ไขสถานะผู้ตรวจสอบประวัติเสร็จสิ้น',
            ButtonText: 'ยืนยัน',
            
        }).then((result) => {
            if (result) {
              window.location.href = `/adminuserupdate/${userid}`
            }
        });
          
    }
    const handleClick = async (e)=>{
        e.preventDefault();
        try {
          await axios.post(`http://localhost:3333/paystatus/${userid}`,inputs,{
            headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }})
          .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }else{
                popups();
            }
            });
        } catch (err) {
          
          console.log(err)
        }

    }
    const getdata = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/history/${userid}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const tokenn = async () =>{
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
        tokenn();   
        getdata();
    }, []);
    console.log(user);
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" className="bg-wh" style={{fontFamily:"Athiti"}}>
                <Container>
                    <Navbar.Brand href='/adminuser' className='fs-1'>CHECK</Navbar.Brand>                
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="justify-content-end flex-grow-1 pe-3 fs-5" variant="underline" activeKey="1">
                    <Nav.Link eventKey={1} href="/adminuser">รายชื่อผู้ใช้</Nav.Link>
                            
                    <Nav.Link onClick={logout}  >logout</Nav.Link>    
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container className='pl-5 ' style={{fontFamily:"Athiti",width:'60%'}} >
                <div className='mb-4 mt-5'>
                    <span className='fs-2'>รายละเอีอดผู้ตรวจสอบประวัติ</span>
                </div>
                {user.map((users,key1)=>          
                    <div key={key1}>
                        <Row>
                            <Col xs lg="3" className='mt-1 pt-1 fs-5'>
                                ชื่อ-นามสกุล
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={users.type_id}
                                    aria-label="Disabled input example"
                                    disabled
                                    readOnly
                                                        
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={users.fname}
                                    aria-label="Disabled input example"
                                    disabled
                                    readOnly
                                                        
                                />
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={users.lname}
                                    aria-label="Disabled input example"
                                    disabled
                                    readOnly
                                />
                            </Col>      
                        </Row>
                        <br/>                    
                        <Row>
                            <Col xs lg="3" className='mt-1 pt-1 fs-5'>
                                หมายเลขประจำตัวประชาชน 
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={users.idcard}
                                    aria-label="Disabled input example"
                                    disabled
                                    readOnly
                                />
                                                
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col xs lg="3" className='mt-1 pt-1 fs-5'>
                                สถานะการตรวจประวัติ 
                            </Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={users.pay}
                                    aria-label="Disabled input example"
                                    disabled
                                    readOnly
                                />
                                                
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col>
                                <Form.Select id="pay" name="pay" aria-label="Default select example" size="lg" className="mt-1" onChange={handleChange}>
                                    <option>สถานะการตรวจประวัติ</option>
                                    <option value="ยังไม่ได้ชำระเงิน">ยังไม่ได้ชำระเงิน</option>
                                    <option 
                                    value="กำลังตรวจสอบการชำระเงิน">กำลังตรวจสอบการชำระเงิน</option>
                                    <option value="ชำระเงินเสร็จสิ้น">ชำระเงินเสร็จสิ้น</option>
                                    <option value="กำลังตรวจสอบ">กำลังตรวจสอบ</option>
                                    <option value="ตรวจสอบเสร็จสิ้น">ตรวจสอบเสร็จสิ้น</option>
                                    <option value="พบข้อผิดพลาด">พบข้อผิดพลาด</option>
                                </Form.Select>            
                            </Col>
                        </Row>
                        <br/>
                        <div className=" m-2 d-flex justify-content-end">
                            <Row  className='d-flex m-4'>
                                <Col>
                                    <Button className='bg-secondary' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} onClick={handleClick} style={{width : 200 }}>
                                        <p className='m-1 fs-5' style={{fontFamily:"Athiti"}}>ยืนยัน</p> 
                                    </Button>
                                </Col>
                                <Col>
                                    <Link to={`/adminhistory/${userid}`}>
                                        <Button className='bg-secondary' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} style={{width : 200 }}>
                                            <p className='m-1 fs-5' style={{fontFamily:"Athiti"}}>เพิ่มประวัติผู้ใช้</p> 
                                        </Button>
                                    </Link>
                                </Col>    
                            </Row>
                        </div>
                    </div>
                )}
            </Container>
        </div>
    )
}

export default Adminuserupdate
