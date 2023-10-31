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
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList
}from "react-icons/fa";
const Dashpay = () => {
    const { userid }  =useParams();
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const [data ,setData] = useState([]);
    const [user ,setUser] = useState([]);
    const token = localStorage.getItem('token');
    const [inputs,setInputs] = useState({
        pay:""
    })
    const popups = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'แก้ไขสถานะผู้ตรวจสอบประวัติเสร็จสิ้น',
            ButtonText: 'ยืนยัน',
            
        }).then((result) => {
            if (result) {
              window.location.href = `/dashpay/${userid}`
            }
        });
          
    }
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/history/${userid}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const getadmin = async ()=>{
        try{
            const response = await axios.get(`http://localhost:3333/adminuserprofile`, {
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })
            setData(response.data);
        } catch (err) {
            console.log(err);
            window.location='/login'
        }
    }
    useEffect(() => {
        getadmin();
        getdata();

    } , []);
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
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
    const menuItem5=[
        {
            path:"/Admindashboard",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/historyadmin",
            name:"ประวัติการทำงาน",
            icon:<FaUserAlt/>
        },
        {
            path:"/adminuserdash",
            name:"รายชื่อผู้ใช้ทั่วไป",
            icon:<FaRegChartBar/>
        },
        {
            path:"/admindash",
            name:"รายชื่อผู้ดูแลระบบ",
            icon:<FaCommentAlt/>
        },
        {
            path:"/product",
            name:"เพิ่มประวัติ",
            icon:<FaShoppingBag/>
        },
        {
            path:"/productList",
            name:"ตรวจสอบการชำระเงิน",
            icon:<FaThList/>
        }
    ]
    const menuItem4=[
        
        {
            path:"/adminuserdash",
            name:"รายชื่อผู้ใช้ทั่วไป",
            icon:<FaRegChartBar/>
        },
        {
            path:"/admindash",
            name:"รายชื่อผู้ดูแลระบบ",
            icon:<FaCommentAlt/>
        },
        {
            path:"/product",
            name:"เพิ่มประวัติ",
            icon:<FaShoppingBag/>
        },
        {
            path:"/productList",
            name:"ตรวจสอบการชำระเงิน",
            icon:<FaThList/>
        }
    ]
    const menuItem3=[

        {
            path:"/adminuserdash",
            name:"รายชื่อผู้ใช้ทั่วไป",
            icon:<FaRegChartBar/>
        },
        {
            path:"/product",
            name:"เพิ่มประวัติ",
            icon:<FaShoppingBag/>
        },
        {
            path:"/productList",
            name:"ตรวจสอบการชำระเงิน",
            icon:<FaThList/>
        }
    ]
    const menuItem2=[
        {
            path:"/product",
            name:"เพิ่มประวัติ",
            icon:<FaShoppingBag/>
        },
        {
            path:"/productList",
            name:"ตรวจสอบการชำระเงิน",
            icon:<FaThList/>
        }
    ]
    const menuItem=[
        {
            path:"/product",
            name:"เพิ่มประวัติ",
            icon:<FaShoppingBag/>
        }
    ]
    console.log(user)
    return (
        <div>
            <div id="wrapper" style={{fontFamily:"Athiti"}}>
                {/* Sidebar */}
                <div className="backgroud" style={{width: isOpen ? "200px" : "80px" }} >
                <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
                    <div className="top_section">
                        <h1 style={{display: isOpen ? "block" : "none"}} className="logo">CHECK</h1>
                        <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                            <FaBars onClick={toggle}/>
                        </div>
                    </div>
                    <div>
                        {data.map((datas,key)=>
                        <div key={key}>
                        { datas.statusadmin === "1" ? (
                            <div>
                            {menuItem.map((item, index)=>(
                                <Link to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                                    <div className="icon">{item.icon}</div>
                                    <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-6 mb-3">{item.name}</div>
                                </Link>
                                ))
                            }
                            </div>
                        ):(datas.statusadmin === "2" ? (
                            <div>
                            {menuItem2.map((item, index)=>(
                                <Link to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                                    <div className="icon">{item.icon}</div>
                                    <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-6 mb-3">{item.name}</div>
                                </Link>
                                ))
                            }
                            </div>
                        ):(datas.statusadmin === "3" ? (
                            <div>
                            {menuItem3.map((item, index)=>(
                                <Link to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                                    <div className="icon">{item.icon}</div>
                                    <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-6 mb-3">{item.name}</div>
                                </Link>
                                ))
                            }
                            </div>
                        ):( datas.statusadmin === "4" ? (
                            <div>
                                {menuItem4.map((item, index)=>(
                                    <Link to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                                    <div className="icon">{item.icon}</div>
                                    <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-6 mb-3">{item.name}</div>
                                    </Link>
                                ))
                                }
                            </div>
                            ):(datas.statusadmin === "5" ? (
                            <div>
                                {menuItem5.map((item, index)=>(
                                    <Link to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                                    <div className="icon">{item.icon}</div>
                                    <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-6 mb-3">{item.name}</div>
                                    </Link>
                                ))
                                }
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
                    
                </div>
                </div>
                {/* End of Sidebar */}
                {/* Content Wrapper */}
                <div id="content-wrapper" className="d-flex flex-column" style={{backgroundColor:'white'}} >
                {/* Main Content */}
                <div id="content" >
                    {/* Topbar */}
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top " >
                    {/* Sidebar Toggle (Topbar) */}
                    <button
                        id="sidebarToggleTop"
                        className="btn btn-link d-md-none rounded-circle mr-3"
                        
                    >
                        <i className="fa fa-bars" />
                    </button>
                    <ul className="navbar-nav ml-auto" >
                        {/* Nav Item - Search Dropdown (Visible Only XS) */}
                        
                    
                        
                        
                        
                        <div className="topbar-divider d-none d-sm-block" />
                        {/* Nav Item - User Information */}
                        <li className="nav-item dropdown no-arrow" >
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="userDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                            
                        >
                            <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                            Douglas McGee
                            </span>
                            <img
                            className="img-profile rounded-circle"
                            src="img/undraw_profile.svg"
                            />
                        </a>
                        {/* Dropdown - User Information */}
                        <div
                            className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                            aria-labelledby="userDropdown"
                        >
                            <a className="dropdown-item" href="#">
                            <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400" />
                            Profile
                            </a>
                            <a className="dropdown-item" href="#">
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />
                            Settings
                            </a>
                            <a className="dropdown-item" href="#">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400" />
                            Activity Log
                            </a>
                            <div className="dropdown-divider" />
                            <a
                            className="dropdown-item"
                            href="#"
                            data-toggle="modal"
                            data-target="#logoutModal"
                            >
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
                            Logout
                            </a>
                        </div>
                        </li>
                    </ul>
                    </nav>
                    {/* End of Topbar */}
                    {/* Begin Page Content */}
                    <div className="container-fluid">
                    {/* Page Heading */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 className="h3 mb-0 text-gray-800">เพิ่มประวัติ</h1>
                    
                    </div>
                    {/* Content Row */}
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
                                    <option value="พบข้อผิดพลาดในการชำระเงิน">พบข้อผิดพลาดในการชำระเงิน</option>
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

export default Dashpay
