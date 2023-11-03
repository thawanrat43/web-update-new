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
import { key } from 'localforage';
import ReactDOM from "react-dom";
import QRCode from "react-qr-code";
function Payqr() {
    const { userid }  = useParams();
    const [user ,setUser] = useState([]);
    const popups = async ()=>{
      Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'ชำระเงินเสร็จสิ้น',
          confirmButtonColor: '#D3D3D3',
        }).then((result) => {
            if (result.value) {
              window.location.href = `/payqr/${userid}`
            }
        });

      
    //   .then((result) => {
    //       if (result.isConfirmed) {
    //         window.location.href = `/imgpay/${i}`
    //       }
    //   });
        
    }
    const [inputs,setInputs] = useState({
        userid:userid,
        qrcheck:'ชำระเงินเสร็จสิ้น'
       
    })
    
    const [data,setData]=useState([]);
    const gethistory = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/gethistory/${userid}`);
            setData(response.data);
            
        } catch (err) {
            console.log(err);
        }
    }
    const getdata = async ()=>{
      try{
          const response = await axios.get(`https://back-end-newupdate.onrender.com/profilehistory/${userid}`);
          setUser(response.data);
          
      } catch (err) {
          console.log(err);
      }
    }
    const updatepay = async ()=>{
        axios.post(`https://back-end-newupdate.onrender.com/getcheckpayqr/${userid}`,inputs)
        .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }else{
                popups();
            }
        });
      
    }
    
    useEffect(() => {
        
        getdata();
        gethistory();
       
    }, []);
    const navigate = useNavigate()
    
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
    console.log(user)
    console.log(data)
    
    return (

        <div style={{fontFamily:"Athiti"}}className='m-5'>
        {data.map((datas,key4)=>
        <div>
        {datas.pay =='ยังไม่ชำระเงิน' ? (
            <div>
            {user.map((users,key4)=>
            <div  key={key4}>
          
            <Container className=''>
                <div className=' d-flex justify-content-center'>
                    <Card className='m-auto p-1 pt-3' style={{fontFamily:"Athiti",width:'30rem',height:'35rem'}}>
                    <Container >
                        <Row>
                        <p className='d-flex justify-content-center fs-3'>ทำรายงานชำระเงิน</p>                 
                        </Row>
                        <br/>
                        <Row className='d-flex justify-content-center m-1 mb-3'>
                        {/* <Image src={qr} style={{height:"50%",width:'70%'}}/>                */}
                            
                            <Col>
                                <p>จาก</p>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <p>คุณ {users.fname} {users.lname}</p>
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-center m-1 mb-3'>
                            <Col>
                                <p>ถึง</p>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <p>บริษัทตรวจประวัดจำกัด</p>
                            </Col>
                        </Row>
                        {/* {users.criminal === '' ? (
                        data=data+0;
                        ) : (
                        data=data+100;
                        )} */}
                        {data.map((datas,key)=>
                        <Row key={key} className='d-flex justify-content-center m-1 mb-3'>
                            <Col>
                                <p>จำนวนที่ต้องชำระ</p>
                            </Col>
                            <Col className='d-flex justify-content-end'>
                                <p>{datas.amountpaid}.00</p>
                            </Col>             
                        </Row>
                        )}
                        <Row className='d-flex justify-content-center m-1 mb-4'>
                            <Col>
                                <p>ค่าธรรมเนียม </p>
                            </Col> 
                            <Col className='d-flex justify-content-end'>
                                <p>0.00</p>
                            </Col> 
                        </Row>
                        <br/>
                        <Row className='d-flex justify-content-center '>
                        
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
        ):(
            <div>
                <p className='d-flex justify-content-center fs-3 text-black'>คุณชำระเงินเสร็จสิ้นแล้ว</p>
            </div>                
        )}
        </div>
        )}
      </div>
    )
}

export default Payqr
