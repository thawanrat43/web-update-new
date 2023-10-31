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
    FaThList,
    FaUsersCog,
    FaFolderPlus,
    FaRegListAlt,
    FaCoins
}from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { Offcanvas } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
const Dashistoryuserdetail = () => {
    const { userid }  =useParams();
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const [data ,setData] = useState([]);
    const [user ,setUser] = useState([]);
    const token = localStorage.getItem('token');
    const [err,setErr]=useState([])
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/gethistory/${userid}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const updatedata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/updatecheckpay/${userid}`, {
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            })
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                }else{
                    // window.location=`/dashinputhistory`
                }
                });
        } catch (err) {
            console.log(err);
            window.location='/login'
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
                if(data[0].statusadmin == '3'){
                    
                }else{
                    if(data[0].statusadmin == '2'){
                    
                    }else{
                        window.location='/login'
                        localStorage.removeItem('token');
                    
                    }
                    
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
            updatedata();
            getcheckadmin();
        } catch (err) {
            console.log(err);
            window.location='/login'
        }
    }
    
    useEffect(() => {
        getadmin();
        getdata();
        
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
                    <div className="container-fluid mt-3 px-5">
                    {/* Page Heading */}
                    <div className="d-sm-flex align-items-center justify-content-between mb-4 px-5">
                        <h1 className="h3 mb-0 text-gray-800">รายละเอียดผู้ตรวจสอบประวัติ</h1>
                    
                    </div>
                    {/* Content Row */}
                    {user.map((users,key)=>
                    
                    <div className='px-5 mx-5' key={key}>
                    <div className="">
                        <Card className='p-4'>
                            <Card.Body>
                                
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                        หมายเลขการตรวจประวัติ
                                    </div>
                                    
                                    <div className="h5 mb-0 col-md-6 font-weight-bold text-gray-800">
                                        {users.idhistory}
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    
                                    <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                        ชื่อ-นามสกุล
                                    </div>
                                    
                                    <div className="h5 mb-0 col-md-8 font-weight-bold text-gray-800">
                                        {users.fname} {users.lname}
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                        หมายเลขประจำตัวประชาชน
                                    </div>
                                    
                                    <div className="h5 mb-0 col-md-12 font-weight-bold text-gray-800">
                                        {users.idcard}
                                    </div>
                                </div>
                            </div>
                            <br/>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                        สถานะการตรวจสอบประวัติ
                                    </div>
                                    <div className="h5 mb-0 col-md-12 font-weight-bold text-gray-800">
                                        {users.pay}
                                    </div>
                                    {/* <div className="h5 mb-0 col-md-12 font-weight-bold text-gray-800">
                                        {users.statusadmin}
                                    </div> */}
                                </div>
                            </div>
                            <br/>
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                        ประวัติที่ต้องการตรวจสอบ
                                    </div>
                                    <div className="h5 mb-0 col-md-12 font-weight-bold text-gray-800">
                                   
                            
                                    {users.criminal === "1" ? (
                                        <p>ประวัติอาชญากรรม</p>
                                    ):(users.credit === "1" ? (
                                        <p>ประวัติเครดิตบูโร</p>
                                    ):(users.global === "1" ? (
                                        <p>ประวัติ global sanctions</p>
                                    ):(users.penalty=== "1" ? (
                                        <p>ประวัติคดีอาญา</p>
                                    ):(users.bankrupt=== "1" ? (
                                        <p>ประวัติล้มละลาย</p>
                                    ):(users.other_text != "" ? (
                                        <p>{users.other_text}</p>
                                    ):(
                                        <p></p>
                                    ))))))}
                                    </div>
                                    {/* <div className="h5 mb-0 col-md-12 font-weight-bold text-gray-800">
                                        {users.statusadmin}
                                    </div> */}
                                </div>
                            </div>
                            <br/>
                            
                            </Card.Body>

                        </Card>
                        
                        
                        </div>
                        <div className='d-flex justify-content-end m-5'>
                            <Row className=" m-1 d-flex justify-content-center">
                                    {/* <Col className='d-flex justify-content-end'>
                                        <Link to={`/dashistory/${users.idhistory}`}>
                                            <Button  className='bg-secondary text-white fs-5 ' type="submit" variant="contained" onClick={updatedata} sx={{ mt: 3, }}>
                                            <p className='m-2' style={{fontFamily:"Athiti",width:'13rem'}} >กำลังตรวจสอบประวัติ</p> 
                                            </Button>
                                            </Link>
                                        
                                    </Col> */}
                                    <Col className='d-flex justify-content-end'>
                                        <Link to={`/dashhistory/${users.idhistory}`}>
                                            <Button  className='bg-secondary text-white fs-5' type="submit" variant="contained" onClick={updatedata} sx={{ mt: 3, }}>
                                            <p className='m-2' style={{fontFamily:"Athiti"}} >เพิ่มประวัติ</p> 
                                            </Button>
                                            </Link>
                                        
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

export default Dashistoryuserdetail
