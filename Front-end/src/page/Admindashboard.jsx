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
  FaCoins,
  FaUserTimes,
  FaUserPlus
}from "react-icons/fa";
import {Chart as Chartjs ,ArcElement,Tooltip,Legend} from 'chart.js';
Chartjs.register(
  ArcElement,
  Tooltip,
  Legend
);
import { Offcanvas } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Doughnut } from 'react-chartjs-2';
import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
const Admindashboard = () => {
  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  const [data ,setData] = useState([]);
  const [user ,setUser] = useState([]);
  const [admin ,setAdmin] = useState([]);
  const [numpiechart,setNumpiechart] = useState([])
  const [history,setHistory] = useState([]);
  const [success,setSuccess] = useState([]);
  const token = localStorage.getItem('token');
  const getcheckadmin = async () =>{
    try{
      if(data[0].status=='1'){
        window.location='/login'
        localStorage.removeItem('token');
      }else{
        if(data[0].statusadmin != '4'){
          window.location='/login'
          localStorage.removeItem('token');
          
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
  
  const numadmin = async ()=>{
    try{
        const response = await axios.get(`https://back-end-newupdate.onrender.com/numadmin`)
        setAdmin(response.data);
    } catch (err) {
        console.log(err);
        window.location='/login'
    }
  }
  const numuser = async ()=>{
    try{
        const response = await axios.get(`https://back-end-newupdate.onrender.com/numuserid`)
        setUser(response.data);
    } catch (err) {
        console.log(err);
        window.location='/login'
    }
  }
  const numhistory = async ()=>{
    try{
      const response = await axios.get(`https://back-end-newupdate.onrender.com/numhistory`);
      setHistory(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const numsucess = async ()=>{
    try{
      const response = await axios.get(`https://back-end-newupdate.onrender.com/numsuccess`);
      setSuccess(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const column = [
    {
      name :'Date',
      selector : row => row.date,
      sortable : true
    },
    {
      name :'รหัสผู้ดูแลระบบ',
      selector : row => row.idadmin,
      sortable : true
    },
    {
      name: "รายการทำงาน",
      selector : row => row.doing,
      sortable : true
    },
    {
      name :'รหัสผู้ใช้',
      selector : row => row.userid,
      sortable : true
    },
  ]
  const [userhis ,setUserhis] = useState([]);
  const piechart = async ()=>{
    try{
      const response = await axios.get(`https://back-end-newupdate.onrender.com/piechart`);
      setNumpiechart(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const getdata = async ()=>{
    try{
      const response = await axios.post(`https://back-end-newupdate.onrender.com/historyadmin`);
      setUserhis(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    piechart();
    numadmin();
    numuser();
    numhistory();
    numsucess();
  } , []);
  useEffect(() =>{
    getadmin();
    getdata();
    
  },[])
  console.log(history)
  console.log(success)
  console.log(numpiechart)
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
  const datas = {
    labels: [
      'การตรวจสอบประวัติที่เสร็จสิ้น',
      'การตรวจสอบประวัติที่กำลังตรวจสอบ',
      'การตรวจสอบประวัติที่ชำระเงินเสร็จสิ้น',
      'การตรวจสอบประวัติที่กำลังตรวจสอบการชำระเงิน',
      'การตรวจสอบประวัติที่ยังไม่ได้ชำระเงิน',
      'การตรวจสอบประวัติที่พบข้อผิดพลาดในการชำระเงิน',
      
    ],
    datasets: [{
      label: 'จำนวน',
      data: [numpiechart.numhistory,numpiechart.numhistorying,numpiechart.numpay,numpiechart.numpaying,numpiechart.numnopay,numpiechart.numerrpay],
      backgroundColor: [
        '#FF0000',
        '#00CCCC',
        '#BEBEBE',
        '#DB7093',
        '#663399',
        '#F4A460',

      ]
    }]
  };
  const options ={
    

  }
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
            <div className="container-fluid">
              {/* Page Heading */}
              <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                
              </div>
              {/* Content Row */}
              <div className="row">
                {/* Earnings (Monthly) Card Example */}
                {user.map((users,key)=>
                <div key={key} className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                            จำนวนผู้ใช้ทั้งหมด
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {users.numuser}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-calendar fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
                
                {/* Earnings (Monthly) Card Example */}
                {admin.map((admins,key)=>
                <div key={key} className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-success shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                            จำนวนผู้ดูแลระบบ
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {admins.numadmin}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-dollar-sign fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
                {history.map((historys,key)=>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-warning shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">
                            จำนวนการตรวจสอบประวัติทั้งหมด
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {historys.numhistory}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
                {/* Earnings (Monthly) Card Example */}

                {success.map((successs,key)=>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-danger shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                          การตรวจสอบประวัติที่เสร็จสิ้น
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {successs.num}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                )}
                
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-info shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                            การตรวจสอบประวัติที่กำลังตรวจสอบ
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {numpiechart.numhistorying}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card border-left-secondary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-secondary text-uppercase mb-1">
                            การตรวจสอบประวัติที่ชำระเงินเสร็จสิ้น
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {numpiechart.numpay}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card  shadow h-100 py-2" style={{borderLeftColor:'#DB7093',borderLeftWidth:"5px"}}>
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold  text-uppercase mb-1" style={{color:'#DB7093'}}>
                            การตรวจสอบประวัติที่กำลังตรวจสอบการชำระเงิน
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {numpiechart.numpaying}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card  shadow h-100 py-2" style={{borderLeftColor:'#663399',borderLeftWidth:"5px"}}>
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold text-uppercase mb-1" style={{color:'#663399'}}>
                            การตรวจสอบประวัติที่ยังไม่ได้ชำระเงิน
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {numpiechart.numnopay}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-6 mb-4">
                  <div className="card shadow h-100 py-2" style={{borderLeftColor:'#F4A460',borderLeftWidth:"5px"}}>
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="text-xs font-weight-bold  text-uppercase mb-1" style={{color:'#F4A460'}}>
                            การตรวจสอบประวัติที่พบข้อผิดพลาดในการชำระเงิน
                          </div>
                          <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {numpiechart.numerrpay}
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-comments fa-2x text-gray-300" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Pending Requests Card Example */}
                <div className='row '>
                  <div className='col  ' style={{width:'80%',height:'120%'}} >
                    <Doughnut data={datas} options={options}
                      >
                    </Doughnut>
                  </div>
                  <div className='col' >
                    <DataTable columns={column} data={userhis} fixedHeader pagination className='p-2'>

                    </DataTable>
                  </div>
                </div>
               
                
              </div>
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

export default Admindashboard
