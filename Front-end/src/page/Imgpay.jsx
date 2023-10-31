import React,{useEffect, useState} from 'react'
import Bar from '../compament/Bar'
import { Button } from '@mui/material';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Barprofile from '../compament/Barprofile';
import { SettingsRemoteSharp } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useLocation, useParams,Link } from "react-router-dom";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import TextField from '@mui/material/TextField';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import qr from '../image/qrcode.jpg'
import Swal from 'sweetalert2';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import DatePicker, { registerLocale }  from "react-datepicker";
import th from "date-fns/locale/th"; // the locale you want
registerLocale("th", th);

import "react-datepicker/dist/react-datepicker.css";
import InputGroup from 'react-bootstrap/InputGroup';
// import DatePicker from "react-date-picker";
import ReactDOM from "react-dom";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
// import $ from "jquery"
// import "jquery-ui-dist/jquery-ui"
export const Imgpay = () => {
    const {userid} = useParams();  
    const date = new Date();
    const dateth = date.setFullYear(date.getFullYear() + 543);
    
    //console.log(dateth)
    console.log(date)
    const [startDate, setStartDate] = useState(date);
    const [inputs,setInputs] = useState({
        date: startDate.toLocaleString('th-th', { timeZone: 'Asia/Bangkok' }),
        picpay:"",
        amount:""
    })
    
    const [image,setImage] =useState();
    const [file,setFile] = useState("");
    const token = localStorage.getItem('token');
    const [user ,setUser] = useState([]);
    const [images, setImages] = useState("");
    const [imageURLs, setImageURLs] = useState([]);
    const [num,setNum]=useState([])
    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls = [];
        images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
        setImageURLs(newImageUrls);
    }, [images]);
    const popupsuccess = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'แจ้งการชำระเงินสำเร็จแล้ว',
            
            
        }).then((result) => {
            if (result.value) {
              window.location.href = `/pagestatus/${user[0].id}`
            }
        });
          
    }
    function onImageChange(e) {
        setImages([...e.target.files]);
    }
    const getcheck = async () =>{
        try{
          if(user[0].status==''){
            window.location='/login'
            localStorage.removeItem('token');
          }else{
            
          }
          
        } catch (err) {
            console.log(err);
        }
      }
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/profilehistory/${userid}`);
            setUser(response.data);
            getcheck();
        } catch (err) {
            console.log(err);
        }
    }
    const imgpay =(e) =>{
        const formdata= new FormData()
        for(let i =0; i < images.length; i++) {
            formdata.append('file', images[i]);
        }
        
        e.preventDefault();
        try{
            axios.post(`https://back-end-newupdate.onrender.com/imgpay/${userid}`,formdata)
            .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }else{
                getdata();
                // axios.post(`http://localhost:3333/pay/${userid}`)
                //     popupsuccess();
                axios.post(`https://back-end-newupdate.onrender.com/amount/${userid}`,inputs)
                .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                }else{
                    getdata();
                    axios.post(`https://back-end-newupdate.onrender.com/pay/${userid}`)
                    popupsuccess();
                }
                });
            }
            });
            // axios.post(`http://localhost:3333/amount/${userid}`,inputs)
            // .then((response) => {
            //     if (response.data.error) {
            //         alert(response.data.error);
            //     }else{
            //         getdata();
            //         axios.post(`http://localhost:3333/pay/${userid}`)
            //         popupsuccess();
            //     }
            //     });
            
        }catch (err) {
            console.log(err);
        }
    };
    const tokenn = async () =>{
        
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/token`,{
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
    
    
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    useEffect(()=>{
        //$( "#datepicker" ).datepicker();
        getdata();
        tokenn();
    },[])
    
    // const updatepay = async (e)=> {
    //     e.preventDefault();
    //     try{
            
    //         .then((response) => {
    //         if (response.data.error) {
    //             alert(response.data.error);
    //         }else{
    //           popups();
    //         }
    //         });
    //     }catch (err) {
    //         console.log(err);
    //     }
    //   };
    // useEffect(() => {
    //     getdata();
    //     if(inputs.picpay.length < 1) return;
    //     const newImageurls = [];
    //     ImagesearchRoller.forEach(image => newImageurls.push(URL.createObjectURL(inputs.picpay)))
    //     setImage(newImageurls);
    // }, [inputs]);
    console.log(user);
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    console.log(inputs);
    //console.log(startDate)
    console.log()
    console.log(imageURLs)
    
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
                        <Image src={"https://back-end-newupdate.onrender.com/"+users.profilepic}roundedCircle style={{width : '3rem'}} />
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
                                    
                                    <Form.Control name ="amount" id="amount" aria-label="Amount (to the nearest dollar)" onChange={handleChange} />
                                    <InputGroup.Text>บาท</InputGroup.Text>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs lg="2" className='mt-4 pt-1'>
                                <p>วันเดือนปี</p>
                            </Col>
                            
                            <Col className='mt-4 pt-1 ml-4'>
                            
                                {/* <div class="form-group">
                                    <div class="input-group date">
                                        <input type="text" id="datepicker"/>
                                    </div>
                                </div>
                                */}
                            
                            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}   name='date' locale="th" format="myFormat"
                             />
                             
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
                                name='time'
                                />
                            </Col>
                        </Row>
                        <Row className='mt-4'>
                            <Col > 
                                <div>
                                    {/* <input type="file" multiple accept='inputs.picpay/*'  onChange={e => setFile(e.target.files[0])}/>                 */}
                                    <p>อัปโหลดใบเสร็จจ่ายเงิน</p>
                                    <input type="file" multiple accept='inputs.picpay/*' onChange={onImageChange} />
                                    
                                </div>
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-center'>
                            {/* {image.map((imageSrc) =>(
                                <Image src={image}/>
                            ))} */}
                            <Col className='d-flex justify-content-center m-5'>
                                {imageURLs.map((imageSrc, idx) => (
                                            <img key={idx} width="50%" height="100%" src={imageSrc} />
                                ))}
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-end text-white'> 
                           <Col className='d-flex justify-content-center text-white'>
                            <Button className='bg-secondary fs-5 '  type="submit"  variant="contained"  sx={{ mt: 3, mb: 2 }} style={{fontFamily:"Athiti",color:'white',width:'8rem'}} onClick={imgpay}>
                                        <p className='text-wh m-1'>ยีนยัน</p>
                                </Button>
                           </Col>
                            
                            
                        </Row>
                    </Card.Body>
                </Card>
                
                </div>
                </div>
                
            )}
        </div>
        
    )
  
}
