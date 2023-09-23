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
import TextField from '@mui/material/TextField';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InputGroup from 'react-bootstrap/InputGroup';


export const Imgpay = () => {
    const {userid} = useParams();  
    const [user ,setUser] = useState([]);
    const [inputs,setInputs] = useState({
        date: "",
        time: "",
        picpay:"",
        amount:""
    })
    const [startDate, setStartDate] = useState(new Date());
    const [image,setImage] =useState();
    // const imgpay =(e) =>{
    //     const formdata= new FormData()
    //     formdata.append('file',file)
    //     e.preventDefault();
    //     try{
    //         axios.post(`http://localhost:3333/imgpay/${userid}`,formdata)
    //         .then((response) => {
    //         if (response.data.error) {
    //             alert(response.data.error);
    //         }else{
    //             getdata();
    //         }
    //         });
    //     }catch (err) {
    //         console.log(err);
    //     }
    // };
    // const token = async () =>{
    //     const token = localStorage.getItem('token');
    //     try{
    //         const response = await axios.get(`https://back-end-nr6u.onrender.com/token`,{
    //             headers: {
    //             Authorization: 'Bearer ' + token //the token is a variable which holds the token
    //         }})
    //         .then((response) => {
    //             if (response.data.error) {
    //                 window.location='/login'
    //             }
    //             });
    //     } catch (err) {
    //         console.log(err);
    //         window.location='/login'
    //     }
    // }
    const updatepic =(e) =>{
        const formdata= new FormData()
        formdata.append('file',file)
        e.preventDefault();
        try{
            axios.post(`http://localhost:3333/updatepic/${userid}`,formdata)
            .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }else{
                getdata();
            }
            });
        }catch (err) {
            console.log(err);
        }
    };
    const getdata = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/profilehistory/${userid}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    useEffect(() => {
        getdata();
        if(inputs.picpay.length < 1) return;
        const newImageurls = [];
        ImagesearchRoller.forEach(image => newImageurls.push(URL.createObjectURL(inputs.picpay)))
        setImage(newImageurls);
    }, [inputs]);
    console.log(inputs);
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
                <div className='d-flex justify-content-center'>
                <Card style={{width:'50%',height:'60%'}} className='p-3 m-5'>
                    <Card.Body >
                    
                        <Row>
                            <p className='fs-3'>แจ้งชำระเงิน</p>
                        </Row>
                        
                        
                        <Row>
                            <Col xs lg="2" className='mt-4 pt-1'>
                                <p>จำนวนเงิน</p>
                            </Col>
                            
                            <Col className='ml-4'>
                                <InputGroup className="mt-4" style={{width:'11rem'}}>
                                    
                                    <Form.Control aria-label="Amount (to the nearest dollar)" />
                                    <InputGroup.Text>บาท</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="2" className='mt-4 pt-1'>
                                <p>วันเดือนปี</p>
                            </Col>
                            
                            <Col className='mt-4 pt-1 ml-4'>
                            
                            
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}   />
                                {/* <DatePicker value={value} onChange={(newValue) => setValue(newValue)} /> */}
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="2" className='mt-4 pt-1'>
                                <p>เวลา</p>
                            </Col>
                            
                            <Col className='mt-4 pt-1 ml-4'>
                                <DatePicker
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={15}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                id='time'
                                />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col > 
                                <div>
                                    <input type="file" multiple accept='inputs.picpay/*'  onChange={e => setFile(e.target.files[0])}/>                
                                </div>
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-center'>
                            {/* {image.map((imageSrc) =>(
                                <Image src={image}/>
                            ))} */}
                            <Col className='d-flex justify-content-center m-5'>
                                <Image className='mt-3' src={"https://back-end-nr6u.onrender.com/"+users.profilepic}roundedCircle style={{width : '50%' }} />
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-end'> 
                            <Button className='bg-secondary fs-5 '  type="submit"  variant="contained"  sx={{ mt: 3, mb: 2 }} style={{fontFamily:"Athiti",color:'white'}}>
                                <p className='text-wh'>ยีนยัน</p>
                            </Button>
                        </Row>
                    </Card.Body>
                </Card>
                
                </div>
                </div>
                
            )}
        </div>
    )
}
