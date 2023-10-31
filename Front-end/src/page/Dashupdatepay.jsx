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
import { NavLink, Offcanvas } from 'react-bootstrap';
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
  FaCoins
}from "react-icons/fa";
import Image from 'react-bootstrap/Image';
const Dashupdatepay = () => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const [data ,setData] = useState([]);
    const [user ,setUser] = useState([]);
    const token = localStorage.getItem('token');
    const handleshow = () =>{
        setIsOpen(true);
    };
    const handleclose = () =>{
        setIsOpen(false);
    };
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/selecthistory`);
            setUser(response.data);
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
              window.location='/login'
              localStorage.removeItem('token');
              
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
    const style =[
        {
            fontFamily:"Athiti", 
            color: '#FFFFFF'
        }
    ]
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    // console.log(user[0].idcard.substr(1)); 
    console.log(user )
    console.log(data)
    return (
        <div>
            <div id="wrapper" style={{fontFamily:"Athiti", 
            color: '#FFFFFF'}}>
                
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
            
                {/* Sidebar */}
                {/* <div className="backgroud " style={{width: isOpen ? "230px" : "80px" }} >
                <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
                    <div className="top_section">
                        <h1 style={{display: isOpen ? "block" : "none"}} className="logo fs-1">CHECK</h1>
                        <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars mb-3 mt-2">
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
                                    <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-6 mb-3 mt-2">{item.name}</div>
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
                                    <div className="icon mb-4">{item.icon}</div>
                                    <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-6 mb-4 mt-1">{item.name}</div>
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
                    
                </div>
                </div> */}
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
                        <h1 className="h3 mb-0 text-gray-800">รายชื่อตรวจสอบการชำระเงิน</h1>
                    
                    </div>
                    {/* Content Row */}
                    {user.map((users,key)=>
              
                        <div className='px-5 mx-5' key={key}>
                            <div className=" mb-4">
                            
                                { users.pay === "ยังไม่ชำระเงิน" ? (
                                    <div>
                                        <Link to={`/paystatuscheck/${users.idhistory}`} className="card border-left-secondary shadow h-100  py-2" style={{ textDecoration: 'none'}} >
                                        <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                        
                                            <div className="col mr-2">
                                            <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                                ชื่อ-นามสกุล
                                            </div>
                                            
                                            <div className="h5 mb-0 col-md-8 font-weight-bold text-gray-800">
                                                {users.fname} {users.lname}
                                            </div>
                                            </div>
                                            <div className="col mr-2">
                                            <div className="text-xs col-md-13 font-weight-bold text-secondary text-uppercase mb-2">
                                                หมายเลขประจำตัวประชาชน
                                            </div>
                                            
                                            <div className="h5 mb-0 col-md-13 font-weight-bold text-gray-800">
                                                {users.idcard}
                                            </div>
                                            </div>
                                            <div className="col mr-2">
                                            <div className="text-xs col-md-13 font-weight-bold text-secondary text-uppercase mb-2">
                                                สถานะการชำระเงิน
                                            </div>
                                            
                                            <div className="h5 mb-0 col-md-13 font-weight-bold text-gray-800">
                                                {users.pay}
                                            </div>
                                            </div>
                                            <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300" />
                                            </div>
                                        </div>
                                        </div>
                                    </Link>
                                    </div>
                                ):(users.pay === "กำลังตรวจสอบการชำระเงิน" ? (
                                    <div>
                                        <Link to={`/paystatuscheck/${users.idhistory}`} className="card border-left-secondary shadow h-100  py-2" style={{ textDecoration: 'none'}} >
                                        <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                        
                                            <div className="col mr-2">
                                            <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                                ชื่อ-นามสกุล
                                            </div>
                                            
                                            <div className="h5 mb-0 col-md-8 font-weight-bold text-gray-800">
                                                {users.fname} {users.lname}
                                            </div>
                                            </div>
                                            <div className="col mr-2">
                                            <div className="text-xs col-md-13 font-weight-bold text-secondary text-uppercase mb-2">
                                                หมายเลขประจำตัวประชาชน
                                            </div>
                                            
                                            <div className="h5 mb-0 col-md-13 font-weight-bold text-gray-800">
                                                {users.idcard}
                                            </div>
                                            </div>
                                            <div className="col mr-2">
                                            <div className="text-xs col-md-13 font-weight-bold text-secondary text-uppercase mb-2">
                                                สถานะการชำระเงิน
                                            </div>
                                            
                                            <div className="h5 mb-0 col-md-13 font-weight-bold text-gray-800">
                                                {users.pay}
                                            </div>
                                            </div>
                                            <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300" />
                                            </div>
                                        </div>
                                        </div>
                                    </Link>
                                    </div>
                                
                                    
                                ):( users.pay === "ชำระเงินเสร็จสิ้น" ? (
                                    <div>
                                        <Link to={`/paystatuscheck/${users.idhistory}`} className="card border-left-secondary shadow h-100  py-2" style={{ textDecoration: 'none'}} >
                                        <div className="card-body">
                                        <div className="row no-gutters align-items-center">
                                        
                                            <div className="col mr-2">
                                            <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                                ชื่อ-นามสกุล
                                            </div>
                                            
                                            <div className="h5 mb-0 col-md-8 font-weight-bold text-gray-800">
                                                {users.fname} {users.lname}
                                            </div>
                                            </div>
                                            <div className="col mr-2">
                                            <div className="text-xs col-md-13 font-weight-bold text-secondary text-uppercase mb-2">
                                                หมายเลขประจำตัวประชาชน
                                            </div>
                                            
                                            <div className="h5 mb-0 col-md-13 font-weight-bold text-gray-800">
                                                {users.idcard}
                                            </div>
                                            </div>
                                            <div className="col mr-2">
                                            <div className="text-xs col-md-13 font-weight-bold text-secondary text-uppercase mb-2">
                                                สถานะการชำระเงิน
                                            </div>
                                            
                                            <div className="h5 mb-0 col-md-13 font-weight-bold text-gray-800">
                                                {users.pay}
                                            </div>
                                            </div>
                                            <div className="col-auto">
                                            <i className="fas fa-calendar fa-2x text-gray-300" />
                                            </div>
                                        </div>
                                        </div>
                                    </Link>
                                    </div>
                                ):(
                                    <p></p>
                                )))}
                            
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
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        </div>
        
    )
}

export default Dashupdatepay
