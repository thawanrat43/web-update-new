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
import {BrowserRouter as Router, Route, Link, Routes, Navigate} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useParams } from 'react-router-dom';
import { useState } from 'react';
import Profileupdate from './page/Profileupdate';
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
          <Route path='/adminregister' element={<Adminregister/>}/>
          <Route path='/adminuser' element={<Adminuser/>}/>
          <Route path='/adminupdate/:userid' element={<Adminupdate/>}/>
          <Route path='/adminudelete' element={<Admindelete/>}/>
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
        </Routes>
      </Router>
    
   
      
  )
}

export default App
