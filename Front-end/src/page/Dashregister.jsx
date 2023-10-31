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
import Swal from "sweetalert2";
import { Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import { Offcanvas } from 'react-bootstrap';
import PasswordStrength from '../compament/PasswordStrength';
import { InputAdornment } from '@mui/material';
import { Visibility } from '@mui/icons-material';
import { VisibilityOff } from '@mui/icons-material';
import {IconButton} from '@mui/material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import '../compament/PasswordStrength.css';
import Alert from 'react-bootstrap/Alert';

const Dashregister = () => {
    const { userid }  = useParams();
    const [inputs,setInputs] = useState({
        "email":"",
        "password":"",
        "fname":"",
        "lname":"",
        "username":"",
        "phonenum":"",
        "statusadmin":""
    
    })
    const [newpassword,setnewpassword] = useState("");
    const [conpassword,setconpassword] = useState("");
    const [err, setError] = useState(null);
    const [error,setErr] = useState(null);
    const [visible,setVisible] = useState(false);
    const [visiblecon,setVisiblecon] = useState(false);
    const [data ,setData] = useState([]);
    const popupsuccess = async ()=>{
        Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'เพิ่มผู่้ดูแลระบบเสร็จสิ้น',
            
            
        }).then((result) => {
            if (result.value) {
              window.location.href = `/dashregister/${userid}`
            }
        });
          
    }
    const popuperror = async ()=>{
        Swal.fire({
            icon: 'error',
            title: 'ไม่สำเร็จ',
            text: 'ลงทะเบียนไม่สำเสร็จชื่อผู้ใช้หรือ E-mail คุณมีการลงทะเบียนแล้ว'
            
            
        }).then((result) => {
            if (result.value) {
                window.location.href = `/dashregister/${userid}`
            }
        });
          
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
        
    
    }, []);
    const navigate = useNavigate()
   
    const handleChangecheck = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.checked }));
	};
    const handleChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const token = localStorage.getItem('token');  
    const handleClick = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post(`https://back-end-newupdate.onrender.com/registeradmin/${userid}`,inputs,{
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            
            } )
          
            .then((response) => {
                if (response.data.error) {
                    
                }else{
                    popupsuccess();
                }
                
                });
        } catch (err) {
          setErr(err.response.data);
          console.log(err)
          //popuperror();
        }
        
    };
    const Endadorment =({visible,setVisible}) =>{
        return (
            <InputAdornment position='end'>
                <IconButton onClick={()=> setVisible(!visible)}>
                {visible ? <VisibilityOff/> : <RemoveRedEyeIcon/>}
                </IconButton>
            </InputAdornment>
        );
    }
    const Endadormentcon =({visiblecon,setVisiblecon}) =>{
        return (
            <InputAdornment position='end'>
                <IconButton onClick={()=> setVisiblecon(!visiblecon)}>
                {visiblecon ? <VisibilityOff/> : <RemoveRedEyeIcon/>}
                </IconButton>
            </InputAdornment>
        );
    }
    const [isStrength, setStrength] = useState(null);
    const dataHandler = async (childData) => {
        setStrength(childData);
    }
    const handleChangePassword = (e) => {
        let password  = e.target.value;
        setInputs({
          ...inputs,
          password:e.target.value
        });
        setError(null);
        let capsCount, smallCount, numberCount, symbolCount
        if (password.length < 4) {
          setError("Password must be minimum 4 characters include one UPPERCASE, lowercase, number and special character: @$! % * ? &");
          return;
        }
        else {
          capsCount = (password.match(/[A-Z]/g) || []).length
          smallCount = (password.match(/[a-z]/g) || []).length
          numberCount = (password.match(/[0-9]/g) || []).length
          symbolCount = (password.match(/\W/g) || []).length
          if (capsCount < 1) {
            setError("Must contain one UPPERCASE letter");
            return;
          }
          else if (smallCount < 1) {
            setError("Must contain one lowercase letter");
            return;
          }
          else if (numberCount < 1) {
            setError("Must contain one number");
            return;
          }
          else if (symbolCount < 1) {
            setError("Must contain one special character: @$! % * ? &");
            return;
          }
        }
      }
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    // const tokenn = async () =>{
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
    console.log(inputs)
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
                                    <Link to={item.path} key={index} className="link  " activeclassName="active" style={{ textDecoration: 'none',color: '#FFFFFF' }}>
                                        <div className="icon ">{item.icon}</div>
                                        <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-5 mb-3">{item.name}</div>
                                    </Link>
                                    ))
                                }
                                </div>
                            ):(datas.statusadmin === "2" ? (
                                <div>
                                {menuItem2.map((item, index)=>(
                                    <Link to={item.path} key={index} className="link" activeclassName="active" style={{ textDecoration: 'none' }}>
                                        <div className="icon">{item.icon}</div>
                                        <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-5 mb-3 mt-2">{item.name}</div>
                                    </Link>
                                    ))
                                }
                                </div>
                            ):(datas.statusadmin === "3" ? (
                                <div>
                                {menuItem3.map((item, index)=>(
                                    <Link to={item.path} key={index} className="text-white" activeclassName="active" style={{ textDecoration: 'none' }}>
                                        <div className="icon">{item.icon}</div>
                                        <div style={{display: isOpen ? "block" : "none"}} className="link_text fs-5 mb-3">{item.name}</div>
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
                    {data.map((datas,keys)=>
                    <div className='row '>
                            <div className='px-5'>
                                <div  className="d-sm-flex align-items-center justify-content-between mb-4 col mr-2 ">
                                    <h1 className="h3 mb-0 text-gray-800 m-3 px-5">
                                        เพิ่มรายชื่อผู้ดูแลระบบ
                                    </h1>
                                    
                                </div>
                            </div>
                            
                            
                            
                       
                    </div>
                    )}
                    {/* Content Row */}
                    <div className='mx-5 px-5 mt-3'>
                        <Box component="form" className='mx-5 px-5' >
                            <Row>
                                <Col>
                                    <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="ชื่อผู้ใช้"
                                    name="username"
                                    autoComplete="username"
                                    onChange={handleChange}
                                    />  
                                </Col>
                                
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <TextField
                                    name="fname"
                                    required
                                    fullWidth
                                    id="fname"
                                    label="ชื่อ"
                                    autoComplete="fname"
                                    onChange={handleChange}
                                    />
                                </Col>
                                <Col>
                                    <TextField
                                    required
                                    fullWidth
                                    id="lname"
                                    label="นามสกุล"
                                    name="lname"
                                    autoComplete="lname"
                                    onChange={handleChange}
                                    />
                                </Col>      
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <TextField
                                    required
                                    fullWidth
                                    id="phonenum"
                                    label="หมายเลขโทรศัพท์"
                                    name="phonenum"
                                    autoComplete="phonenum"
                                    onChange={handleChange}
                                    />
                                </Col>
                                
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleChange}
                                    />
                                </Col>
                                
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="password" 
                                    name="password"
                                    label="รหัสผ่าน"
                                    type={visible ? "text" :"password"}
                                    
                                    onChange={handleChangePassword}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: <Endadorment visible={visible} setVisible={setVisible}/>
                                    }}
                                    
                                />
                                <PasswordStrength password={inputs.password} actions={dataHandler}/>
                                </Col> 
                                {err !== null && (
                                <Alert key={"danger"} variant={"danger"}>
                                    <label htmlFor="password">
                                        <p className="errors m-1" > {err}</p>
                                    </label>
                                </Alert>
                                )}
                                
                            </Row>
                            <Row>
                            <Col>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="conpassword"
                                    label="ยืนยันรหัสผ่าน"
                                    type={visiblecon ? "text" :"password"}
                                    
                                    onChange={(e) => {
                                        setconpassword(e.target.value);
                                    }}
                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: <Endadormentcon visiblecon={visiblecon} setVisiblecon={setVisiblecon}/>
                                    }}
                                />
                            </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col>
                                    <div className="h5 mb-0  font-weight-bold text-gray-800">
                                        <Form.Select id="statusadmin" name="statusadmin" aria-label="Default select example" size="lg" className="mt-1" onChange={handleChange} style={{fontFamily:"Athiti"}}>
                                            <option>ระดับผู้ดูแลระบบ</option>
                                            <option value="1">พนักงานฝ่ายตรวจการชำระเงิน</option>
                                            <option value="2">พนักงานฝ่ายตรวจประวัติ</option>
                                            <option value="3">หัวหน้าฝ่ายตรวจประวัติ</option>
                                            <option value="4">superadmin</option>
                                        </Form.Select> 
                                    </div>
                                </Col> 
                            </Row>

                            {error !== null && (
                            <Alert key={"danger"} variant={"danger"} className='my-4'>
                                <label htmlFor="password">
                                    <p className="errors m-1" > {error && error}</p>
                                </label>
                            </Alert>
                            )}
                            {isStrength === 'Strong' && conpassword===inputs.password ? (
                                <Row className=" m-1 d-flex justify-content-end">
                                    <Col className='d-flex justify-content-end'>
                                        <Button  className='bg-secondary text-white fs-5' type="submit" variant="contained" onClick={handleClick} sx={{ mt: 3, }}>
                                        <p className='m-2' style={{fontFamily:"Athiti"}} >ยืนยัน</p> 
                                        </Button>
                                    </Col>
                                </Row>
                            ):(
                                <Row className=" m-1 mb-2 d-flex justify-content-center">
                                    <Col className='d-flex justify-content-end'>
                                        <Button  className='bg-secondary-800 text-white fs-5' type="submit" variant="contained" onClick={handleClick} sx={{ mt: 3, }} disabled>
                                            <p className='m-2' style={{fontFamily:"Athiti"}} >ยืนยัน</p> 
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                            {/* <div className='d-flex justify-content-end mt-3'>
                            <Button className='text-black' style={{background:'green'}} onClick={handleClick}>
                                ยืนยัน
                            </Button>
                        </div> */}
                        </Box>
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
        </div>
    )
}

export default Dashregister
