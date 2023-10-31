import React,{useEffect, useState} from 'react'
import Bar from '../compament/Bar'
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
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

const Dashuserhistory = () => {
    const { userid }  = useParams();
    const [user ,setUser] = useState([]);
    const [data ,setData] = useState([]);
    const [profile,setProfile] =useState([]);
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/pagestatus/${userid}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
    }
    const getprofile = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/profile/${userid}`);
            setProfile(response.data);
            
        } catch (err) {
            console.log(err);
        }
    };
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
      const token = localStorage.getItem('token');
      try{
          const response = await axios.get(`https://back-end-newupdate.onrender.com/profileid`, {
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
    // const getadmin = async ()=>{
    //     const token = localStorage.getItem('token');
    //     try{
    //         const response = await axios.get(`http://localhost:3333/profileid`, {
    //             headers: {
    //               Authorization: 'Bearer ' + token //the token is a variable which holds the token
    //             }
    //         })
    //         setData(response.data);
    //     } catch (err) {
    //         console.log(err);
    //         window.location='/login'
    //     }
    // }
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
    useEffect(() => {
      getadmin();  
      getdata();
      getprofile();
    }, []);
    const headlineStyle = {
        backgroundColor: "#D9D9D9",
        lineHeight: "1.5",
        border: "none",
        color: "black"
    }
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
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
    console.log(profile)
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
                <div className="container-fluid mt-3 px-5 ">
                  {/* Page Heading */}
                  {profile.map((profiles,key)=>
                   <div key={key} className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800 m-3 px-5">
                        รายชื่อผู้ตรวจสอบประวัติ ของคุณ {profiles.fname} {profiles.lname}
                    </h1>

                    </div>

                  )}
                 
                  {/* Content Row */}
                  {user.map((users,key)=>
                  
                  <div className='px-5 mx-5' key={key}>
                 
                  
                    <div className=" mb-4">
                      <div className="card border-left-secondary shadow h-100  py-2">
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
                              <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                หมายเลขประจำตัวประชาชน
                              </div>
                              
                              <div className="h5 mb-0 col-md-8 font-weight-bold text-gray-800">
                                {users.idcard} 
                              </div>
                            </div>
                            <div className="col mr-2">
                              <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                สถานะการตรวจประวัติ
                              </div>
                              
                              <div className="h5 mb-0 col-md-10 font-weight-bold text-gray-800">
                                {users.pay}
                              </div>
                            </div>
                            
                            <div className="col-auto">
                              <i className="fas fa-calendar fa-2x text-gray-300" />
                            </div>
                          </div>
                        </div>
                      </div>
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
      </div>
    )
}

export default Dashuserhistory
