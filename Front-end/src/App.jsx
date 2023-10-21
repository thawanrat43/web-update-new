import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Homenotlogin from './page/Homenotlogin';
import Login from './page/Login';
import Home from './page/Home';
import Register from './page/Register';
import Profile from './page/Profile'
import Code from './page/Code';
import Pagestatus from './page/Pagestatus';
import History from './page/History';
import Pay from './page/Pay';
import Qrcode from './page/Qrcode';
import Finish from './page/Finish';
import Adminhistoryuser from './page/Adminhistoryuser';
import Adminhistory from './page/Adminhistory';
import Delete  from './page/Delete';
import Adminregister from './page/Adminregister'
import Adminuser from './page/Adminuser'
import Adminupdate from './page/Adminupdate';
import Admindelete from './page/admindelete';
import Adminuserupdate from './page/Adminuserupdate';
import Historyfinish from './page/Historyfinish';
import { Imgpay } from './page/Imgpay';
import { Otp } from './page/Otp';
import Emailforgot from './page/Emailforgot';
import Otpfroget from './page/Otpfroget';
import Forgotpassword from './page/Forgotpassword';
import Admindashboard from './page/Admindashboard';
import Historyadnin from './page/Historyadnin';
import Adminuserdash from './page/Adminuserdash';
import Admindash from './page/Admindash';
import Updatestatusadmin from './page/Updatestatusadmin';
import Dashregister from './page/Dashregister';
import Dashdelete from './page/Dashdelete';
import Dashuserregister from './page/Dashuserregister';
import Dashinputhistory from './page/Dashinputhistory';
import Dashhistory from './page/Dashhistory';
import Dashupdatepay from './page/Dashupdatepay';
import Dashpay from './page/Dashpay';
import Paystatuscheck from './page/Paystatuscheck';
import {BrowserRouter as Router, Route, Link, Routes, Navigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useParams } from 'react-router-dom';
import { useState } from 'react';
import Profileupdate from './page/Profileupdate';
import Dashuserdelete from './page/Dashuserdelete';
import Adminprofile from './page/Adminprofile';

function App() {
  const [login,setlogin] = useState(null)
  function handlelogin(){
    setlogin(true)
  }
  function handlelogout(){
    setlogin(false)
  }
  // login ? <Navigate to="/pay:id" /> : <Home login={handlelogin}/>}
  return (
  
      <Router>

        <Routes>
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          {/* <Route path='/profile' >
            <Route path=':userid' element={<Profile/>}/>
          </Route> */}
          <Route path='/profile/:userid' element={<Profile/>}/>
          <Route path='/code/:userid' element={<Code/>}/>
          <Route path='/profileupdate/:userid' element={<Profileupdate/>}/>
          <Route path='/adminregister/:userid' element={<Adminregister/>}/>
          <Route path='/adminuser' element={<Adminuser/>}/>
          <Route path='/adminupdate/:userid' element={<Adminupdate/>}/>
          <Route path='/adminudelete/:userid' element={<Admindelete/>}/>
          <Route path='/delete/:id' element={<Delete/>}/>
          <Route path='/pagestatus/:id' element={<Pagestatus/>}/>
          <Route path='/history/:userid' element={<History/>}/>
          <Route path='/adminhistory/:id' element={<Adminhistory/>}/>
          <Route path='/adminhistoryuser/:id' element={<Adminhistoryuser/>}/>
          <Route path='/pay/:id' element={<Pay/>}/>
          <Route path='/qrcode/:id' element={<Qrcode/>}/>
          <Route path='/finish/:id' element={<Finish/>}/>
          <Route path='/' element={<Homenotlogin/>}/>
          <Route path='/adminuserupdate/:userid' element={<Adminuserupdate/>}/>
          <Route path='/historyfinish' element={<Historyfinish/>}/>
          <Route path='/imgpay/:userid' element={<Imgpay/>}/>
          <Route path='/otp' element={<Otp/>}/>
          <Route path='/emailforgot' element={<Emailforgot/>}/>
          <Route path='/otpforgot' element={<Otpfroget/>}/>
          <Route path='/forgotpassword' element={<Forgotpassword/>}/>
          <Route path='/admindashboard' element={<Admindashboard/>}/>
          <Route path='/historyadmin' element={<Historyadnin/>}/>
          <Route path='/adminuserdash' element={<Adminuserdash/>}/>
          <Route path='/admindash' element={<Admindash/>}/>
          <Route path='/updatestatusadmin/:userid' element={<Updatestatusadmin/>}/>
          <Route path='/dashregister/:userid' element={<Dashregister/>}/>
          <Route path='/dashdelete/:userid' element={<Dashdelete/>}/>
          <Route path='/dashuserregister/:userid' element={<Dashuserregister/>}/>
          <Route path='/dashuserdelete/:userid' element={<Dashuserdelete/>}/>
          <Route path='/dashinputhistory' element={<Dashinputhistory/>}/>
          <Route path='/dashhistory/:userid' element={<Dashhistory/>}/>
          <Route path='/dashupdatepay' element={<Dashupdatepay/>}/>
          <Route path='/dashpay/:userid' element={<Dashpay/>}/>
          <Route path='/paystatuscheck/:userid' element={<Paystatuscheck/>}/>
          <Route path='/adminprofile' element={<Adminprofile/>}/>
        </Routes>
      </Router>
    
   
      
  )
}

export default App
