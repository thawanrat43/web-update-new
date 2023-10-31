import React, { useContext,useEffect } from 'react'
import Bar from '../compament/Bar'
import Button from '@mui/material/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import TextField from '@mui/material/TextField';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import { Navigate, useParams } from "react-router-dom";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import sessionstorage from 'sessionstorage';
import LinkContainer from 'react-router-bootstrap/LinkContainer';
import Card from 'react-bootstrap/Card';
import Swal from 'sweetalert2';
import './sb-admin-2.css';
import './sb-admin-2.min.css'
import { NavLink } from 'react-bootstrap';
import './Admindash.css';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaUsersCog,
  FaFolderPlus,
  FaRegListAlt,
  FaCoins,
  FaUserTimes,
  FaUserPlus
}from "react-icons/fa";
import Image from 'react-bootstrap/Image';
import { Offcanvas } from 'react-bootstrap';
const Paystatuscheck = () => {
    const {userid} = useParams();  
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const [data ,setData] = useState([]);
    const [user ,setUser] = useState([]);
    const [picpay ,setPicpay] = useState([]);
    const token = localStorage.getItem('token');
    const [pay ,setPay] = useState([]);
    const [inputs,setInputs] = useState({
        pay:""
    })
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const popups = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'ตรวจสอบการชำระเงินเสร็จสิ้น',
            ButtonText: 'ยืนยัน',
            
        }).then((result) => {
            if (result) {
              window.location.href = `/dashupdatepay`
            }
        });
          
    }
    const handleClick = async (e)=>{
        e.preventDefault();
        try {
          await axios.post(`https://back-end-newupdate.onrender.com/paystatus/${userid}`,inputs,{
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
            const response = await axios.get(`https://back-end-newupdate.onrender.com/historypay/${userid}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const getpay = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/getpiccheckpay/${userid}`);
            setPay(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const getpicpay = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/imagepay/${userid}`);
            setPicpay(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const getcheckadmin = async () =>{
        try{
          if(data[0].status=='1'){
            window.location='/login'
            localStorage.removeItem('token');
          }else{
            if(data[0].statusadmin == '4'){
              
            }else{
                if(data[0].statusadmin == '1'){
                    
                    
                }else{
                    window.location='/login'
                    localStorage.removeItem('token');
                }
            }
          }
          
        } catch (err) {
            console.log(err);
        }
      }
    const getadmin = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/adminuserprofile`, {
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })
            setData(response.data);
            getcheckadmin();
        } catch (err) {
            console.log(err);
            window.location='/login'
        }
    }
    useEffect(() => {
        getadmin();
        getdata();
        getpicpay();
        getpay();
    } , []);
    const menuItem4=[
        {
            path:"/Admindashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/historyadmin",
            name:"ประวัติการทำงาน",
            icon:<FaRegListAlt/>
        },
        {
            path:"/adminuserdash",
            name:"รายชื่อผู้ใช้ทั่วไป",
            icon:<FaUserAlt/>
        },
        {
            path:"/admindash",
            name:"รายชื่อผู้ดูแลระบบ",
            icon:<FaUsersCog/>
        },
        {
            path:"/dashinputhistory",
            name:"เพิ่มประวัติ",
            icon:<FaFolderPlus/>
        },
        {
            path:"/dashupdatepay",
            name:"ตรวจสอบการชำระเงิน",
            icon:<FaCoins/>
        }
    ]
    const menuItem3=[
        
        {
            path:"/adminuserdash",
            name:"รายชื่อผู้ใช้ทั่วไป",
            icon:<FaUserAlt/>
        },
        {
            path:"/admindash",
            name:"รายชื่อผู้ดูแลระบบ",
            icon:<FaUsersCog/>
        },
        {
            path:"/dashinputhistory",
            name:"เพิ่มประวัติ",
            icon:<FaFolderPlus/>
        }
        
    ]
    const menuItem2=[
        {
            path:"/dashinputhistory",
            name:"เพิ่มประวัติ",
            icon:<FaFolderPlus/>
        }
        
    ]
    const menuItem=[
        {
            path:"/dashupdatepay",
            name:"ตรวจสอบการชำระเงิน",
            icon:<FaCoins/>
        }
    ]
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    console.log(user)
    console.log(data)
    console.log(pay)
    return (
        <div>
            <div id="wrapper" style={{fontFamily:"Athiti"}}>
                {/* Sidebar */}
                <Offcanvas className='text-bg' show={isOpen} onHide={toggle} style={{fontFamily:"Athiti",}}>
                    <Offcanvas.Header closeButton >
                        <Offcanvas.Title >
                            <p className='fs-1 m-2'>CHECK</p></Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body >
                        <div >
                            {data.map((datas,key)=>
                            <div key={key} >
                            { datas.statusadmin === "1" ? (
                                <div >
                                    {menuItem.map((item, index)=>(
                                        <Link to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                                        <div className="icon mb-4">{item.icon}</div>
                                        <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-5 mb-4 mt-1">{item.name}</div>
                                        </Link>
                                    ))
                                    }
                                </div>
                            ):(datas.statusadmin === "2" ? (
                                <div>
                                    {menuItem2.map((item, index)=>(
                                        <Link to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                                        <div className="icon mb-4">{item.icon}</div>
                                        <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-5 mb-4 mt-1">{item.name}</div>
                                        </Link>
                                    ))
                                    }   
                                </div>
                            ):(datas.statusadmin === "3" ? (
                                <div>
                                    {menuItem3.map((item, index)=>(
                                        <Link to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                                        <div className="icon mb-4">{item.icon}</div>
                                        <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-5 mb-4 mt-1">{item.name}</div>
                                        </Link>
                                    ))
                                    }
                                </div>
                            ):( datas.statusadmin === "4" ? (
                                <div>
                                    {menuItem4.map((item, index)=>(
                                        <Link to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                                        <div className="icon mb-4">{item.icon}</div>
                                        <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-5 mb-4 mt-1">{item.name}</div>
                                        </Link>
                                    ))
                                    }
                                </div>
                                ):(datas.statusadmin === "5" ? (
                                <div>
                                    
                                </div>
                                ):( 
                                <p></p>
                                )
                                )
                            )
                            )
                            )}
                            </div>
                            )}
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column" style={{backgroundColor:'white'}} >
                {/* Main Content */}
                <div id="content" >
                    {/* Topbar */}
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top " >
                    {/* Sidebar Toggle (Topbar) */}
                    <div className='row mt-4 text-black'>
                        <div className='col mt-2'>
                            <FaBars className=' fs-2 m-3' onClick={toggle}/>
                        </div>
                        <div className='col'>
                            <p className='' style={{fontSize:'3rem'}}>CHECK</p>

                        </div>
                        
                    </div>
                    
                    
                    <ul className="navbar-nav ml-auto" >
                        {/* Nav Item - Search Dropdown (Visible Only XS) */}
                        <div className="topbar-divider d-none d-sm-block" />
                        {/* Nav Item - User Information */}
                        <li className="nav-item dropdown no-arrow "  >
                        {data.map((datas,key)=>
                            <div key={key} className="dropdown " >
                                <DropdownButton id="dropdown-variants-white" variant="white" title={
                                        <div className="pull-left" >
                                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                            {datas.fname} {datas.lname}
                                            </span>
                                            <Image src={"https://back-end-newupdate.onrender.com/"+datas.profilepic}roundedCircle  style={{width : '3rem'}} />
                                        </div>
                                    } >
                                    <Dropdown.Item href="/adminprofile">ข้อมูลส่วนตัว</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={logout}>log out</Dropdown.Item>
                                    
                                </DropdownButton>
                                
                            </div>
                    
                        
                        )}
                        {/* Dropdown - User Information */}
                        
                        </li>
                    </ul>
                    </nav>
                    {/* End of Topbar */}
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                    {/* Page Heading */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">ตรวจสอบการชำระเงิน</h1>
                    
                    </div>
                    {/* Content Row */}
                    {user.map((users,key)=>
              
                        <div className='px-5 ' key={key}>
                            <div className='row'>
                                <div className='col'>
                                    <Card>
                                        <Card.Body>
                                            <Form.Group className="mb-3">
                                                <Form.Label>รหัสการตรวจสอบประวัติ</Form.Label>
                                                <Form.Control placeholder={users.idhistory} disabled />
                                                <br/>
                                                <Form.Label>ชื่อ</Form.Label>
                                                <Form.Control placeholder={users.fname} disabled />
                                                <br/>
                                                <Form.Label>นามสกุล</Form.Label>
                                                <Form.Control placeholder={users.lname} disabled />
                                                
                                                <br/>
                                                <Form.Label>จำนวนเงิน</Form.Label>
                                                <Form.Control placeholder={users.amountpaid+'.00'} disabled />
                                            </Form.Group>
                                        </Card.Body>
                                    </Card>
                                </div>
                                {pay.map((pays,key)=>
                                
                                <div className='col' key={key}>
                                    <Card>
                                        <Card.Body>
                                        <Form.Group className="mb-3">
                                                <Form.Label>จำนวนเงินที่ชำระ</Form.Label>
                                                <Form.Control placeholder={pays.amount+'.00'} disabled />
                                                <br/>
                                                <Form.Label>วันเดือนปีและเวลาที่ชำระเงิน</Form.Label>
                                                <Form.Control placeholder={pays.datecreate} disabled />
                                                <br/>
                                                <Form.Label>สลิปการชำระเงิน</Form.Label>
                                                
                                                    <div >
                                                        <Image src={"https://back-end-newupdate.onrender.com/"+pays.picpay} style={{width : '100%'}} />
                                                    </div>
                                            
                                                
                                                
                                            </Form.Group>
                                            
                                        </Card.Body>
                                    </Card>
                                </div>
                                )}
                            </div>
                            <div className='row mt-3'>
                                <div className='col'>
                                    <Form.Select id="pay" name="pay" aria-label="Default select example" size="lg" className="mt-1" onChange={handleChange}>
                                    <option>การชำระเงิน</option>
                                    <option value="ชำระเงินเสร็จสิ้น">ข้อมูลการชำระเงินถูกต้อง</option>
                                    <option value="พบข้อผิดพลาดในการชำระเงิน">พบข้อผิดพลาดในการชำระเงิน</option>
                                </Form.Select> 

                                </div>

                            </div>
                            <div className=" m-2 d-flex justify-content-end">
                                <Row  className='d-flex m-4'>
                                    <Col>
                                        <Button className='bg-secondary' type="submit" fullWidth variant="contained" sx={{ mt: 3, }} onClick={handleClick} style={{width : 200 }}>
                                            <p className='m-1 fs-5' style={{fontFamily:"Athiti"}}>ยืนยัน</p> 
                                        </Button>
                                    </Col>
                                        
                                </Row>
                            </div>
                        </div>
                        )}
                    {/* Content Row */}
                    </div>
                </div>
                {/* End of Main Content */}
                {/* Footer */}
                <footer className="sticky-footer bg-white">
                    <div className="container my-auto">
                    
                    </div>
                </footer>
                {/* End of Footer */}
                </div>
                {/* End of Content Wrapper */}
            </div>
            {/* End of Page Wrapper */}
            {/* Scroll to Top Button*/}
            <a className="scroll-to-top rounded" href="#page-top">
                <i className="fas fa-angle-up" />
            </a>
            {/* Logout Modal*/}
            <div
                className="modal fade"
                id="logoutModal"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                        Ready to Leave?
                    </h5>
                    <button
                        className="close"
                        type="button"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">×</span>
                    </button>
                    </div>
                    <div className="modal-body">
                    Select "Logout" below if you are ready to end your current session.
                    </div>
                    <div className="modal-footer">
                    <button
                        className="btn btn-secondary"
                        type="button"
                        data-dismiss="modal"
                    >
                        Cancel
                    </button>
                    <a className="btn btn-primary" href="login.html">
                        Logout
                    </a>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Paystatuscheck
