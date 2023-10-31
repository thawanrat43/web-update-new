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
import { NavLink } from 'react-bootstrap';
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList
}from "react-icons/fa";
import DataTable from 'react-data-table-component';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Swal from "sweetalert2";
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';


const Dashuserdelete = () => {
    const { userid }  = useParams();
    const [user ,setUser] = useState([]);
    const [data ,setData] = useState([]);
    const [inputs,setInputs] = useState({
        statusadmin: "",
    })
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        
    };
    const popups = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'กรอกประวัติเสร็จสิ้น',
            ButtonColor: '#D3D3D3',
            ButtonText: 'ยืนยัน',
            
        }).then((result) => {
            if (result) {
              window.location.href = `/home`
            }
        });
          
      }
    const token = localStorage.getItem('token');
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
    const getdata = async ()=>{
        try{
            const response = await axios.post(`https://back-end-newupdate.onrender.com/selectuser`);
            setUser(response.data);
            getcheckadmin();
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
        } catch (err) {
            console.log(err);
            window.location='/login'
        }
    }
    
    
    useEffect(() => {
        getadmin();
        getdata();
    
    }, []);
    const headlineStyle = {
        backgroundColor: "#D9D9D9",
        lineHeight: "1.5",
        border: "none",
        color: "black"
    }
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            path:"/",
            name:"About",
            icon:<FaUserAlt/>
        },
        {
            path:"/analytics",
            name:"Analytics",
            icon:<FaRegChartBar/>
        },
        {
            path:"/comment",
            name:"Comment",
            icon:<FaCommentAlt/>
        },
        {
            path:"/product",
            name:"Product",
            icon:<FaShoppingBag/>
        },
        {
            path:"/productList",
            name:"Product List",
            icon:<FaThList/>
        }
    ]
    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post(`https://back-end-newupdate.onrender.com/updatelevel/${user[0].id}`,inputs,{
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            
            } )
          
            .then((response) => {
                if (response.data.error) {
                    alert(response.data.error);
                }
                    popups();
                });
        } catch (err) {
          console.log(err)
          
        }
        
    };
    console.log(user)
    return (
        <div>
            <div id="wrapper" style={{fontFamily:"Athiti"}}>
                {/* Sidebar */}
                {data.map((datas,key)=>
                
                <div key={key} className="backgroud" style={{width: isOpen ? "200px" : "80px" }} >
                <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
                    <div className="top_section">
                        <h1 style={{display: isOpen ? "block" : "none"}} className="logo">CHECK</h1>
                        <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                            <FaBars onClick={toggle}/>
                        </div>
                    </div>
                    {menuItem.map((item, index)=>(
                        <NavLink to={item.path} key={index} className="link p-3" activeclassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-6 mt-2">{item.name}</div>
                        </NavLink>
                        
                        ))
                    }
                </div>
                </div>
                )}
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
                        
                    
                        
                        
                        
                        <div  className="topbar-divider d-none d-sm-block" />
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
                                {data.map((datass,keys)=>
                                <div key={keys}>
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">
                                        {datass.fname} {datass.lname}
                                    </span>
                                    <img
                                    className="img-profile rounded-circle"
                                    src={datass.pic}
                                    />
                                </div>
                                )}
                                
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
                    {data.map((datas,keys)=>
                    <div className='row '>
                            <div className='col-sm-5'>
                                <div  className="d-sm-flex align-items-center justify-content-between mb-4 col mr-2 ">
                                    <h1 className="h3 mb-0 text-gray-800 m-3 ">
                                        เพิ่มรายชื่อผู้ใช้
                                    </h1>
                                    
                                </div>
                            </div>
                            
                            <div className='col-sm-7 mt-3 d-grid gap-2 d-md-flex justify-content-md-end'>
                                <div className='row'>
                                    <div  className=" d-sm-flex align-items-center justify-content-end mb-4  col-8 col-sm-4">
                                        <Link to={`/dashregister/${datas.id}`} className=' mx-2'>
                                            <Button className='bi bi-person-fill-add text-black text-xs   ' style={{backgroundColor:"lightgrey",width:"8rem"}}>
                                                เพิ่มผู้ใช้
                                            </Button>
                                        </Link>
                                        
                                        
                                    </div>
                                    <div className=" d-sm-flex align-items-center justify-content-end mb-4 col-8 col-sm-4">
                                        <Link to={`/profile/${datas.id}`} className=' mx-2'>
                                            <Button  className='bi bi-person-dash-fill text-black text-xs  ' style={{backgroundColor:"lightgrey",width:"8rem"}}>
                                                ระงับผู้ใช้
                                            </Button>
                                        </Link>   
                                    </div>
                                    <div className=" d-sm-flex align-items-center justify-content-end mb-4 col-8 col-sm-4">
                                        <Link to={`/updatestatusadmin/${datas.id}` }className=' mx-2'>
                                            <Button className='bi bi-person-fill-gear text-black text-xs   ' style={{backgroundColor:"lightgrey",width:"8rem"}}>
                                                ตั้งค่า
                                            </Button>
                                        </Link>   
                                    </div>
                                </div>
                                
                            </div>
                            
                       
                    </div>
                    )}
                    {/* Content Row */}
                    {user.map((users,key)=>
                    
                    <div className='px-5 ' key={key}>
                    <div className="  mb-4">
                        <div className="card border-left-secondary shadow h-100  py-2">
                            <div className="card-body">
                            <div className="row no-gutters align-items-center">
                            <div className="col mr-2">
                                <div className="text-xs col-md-6 font-weight-bold text-secondary text-uppercase mb-2">
                                    รหัสผู้ดูแลระบบ
                                </div>
                                
                                <div className="h5 mb-0 col-md-6 font-weight-bold text-gray-800">
                                    {users.id}
                                </div>
                                </div>
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
                                    E-mail
                                </div>
                                
                                <div className="h5 mb-0 col-md-12 font-weight-bold text-gray-800">
                                    {users.email}
                                </div>
                            </div>
                                
                            <div className="col mr-2 ">
                                <Link to={`/delete/${users.id}`}>
                                    <Button className='bi bi-trash font-weight-bold text-gray-800 mt-3' style={{fontSize:'2rem'}} >

                                    </Button>
                                </Link>
                                    
                                
                                
                                
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

export default Dashuserdelete
