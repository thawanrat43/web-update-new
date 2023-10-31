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
import { Margin, SettingsRemoteSharp } from '@mui/icons-material';
import { useSelector } from "react-redux";
import { useLocation, useParams,Link } from "react-router-dom";
import axios from "axios"
import {useNavigate} from "react-router-dom"
import { useContext } from "react";
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
const Delete = () => {
    const { id }  = useParams();
    const [user ,setUser] = useState([]);
    const token = localStorage.getItem('token');
    const getdata = async ()=>{
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/profile/${id}`);
            setUser(response.data);
        } catch (err) {
            console.log(err);
        }
        console.log(user);
        console.log(id);
    }
    const tokenn = async () =>{
        const token = localStorage.getItem('token');
        try{
            const response = await axios.get(`https://back-end-newupdate.onrender.com/token`,{
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
            }})
            .then((response) => {
                if (response.data.error) {
                    window.location='/login'
                }
                });
        } catch (err) {
            console.log(err);
            window.location='/login'
        }
    }
    useEffect(() => {
        tokenn();   
        getdata();
       
    }, []);
    console.log(id)
    const deletedata = async () => {
        try{
            await axios.get(`https://back-end-newupdate.onrender.com/admindelete/${id}`
            ,{
                headers: {
                Authorization: 'Bearer ' + token //the token is a variable which holds the token
                }
            
            })
            .then((response) => {
            if (response.data.error) {
                alert(response.data.error);
            }else{
                window.location ='/admindash'
            }
            });
        }catch (err) {
            console.log(err);
        }
    }
    const headlineStyle = {
        backgroundColor: "#F5F5F5",
        lineHeight: "1.5",
        border: "none",
        color: "#708090",
        fontFamily: "Arial",
        marginTop:"100",
        
    }
    const navStyle = {
        lineHeight: "1.5",
        border: "none",
        color: "#708090"
    
    }
    const logout =(event)=>{
        event.preventDefault();
        localStorage.removeItem('token');
        window.location='/login'
    }
    return (
        <div >
            {user.map((users,key3)=>
            <div key={key3}>
                
                <div className='d-flex m-5 justify-content-center'>
                    <Card className='p-5 m-5' style={{fontFamily:"Athiti",width:'40%',height:'50%'}}>
                    
                        <div   className='' style={{fontSize:'10rem',fontFamily:"Athiti"}}  >
                        <div className="bi bi-exclamation-lg d-flex justify-content-center " style={{fontSize:'10rem',fontFamily:"Athiti"}}  >
                        </div>
                        <p className='fs-5 d-flex justify-content-center  mt-2'  style={{fontFamily:"Athiti"}}>คุณต้องการลบผู้ดูแลระบบ</p>
                        
                            <div className=' d-flex justify-content-center  text-black '>
                                <Row>
                                    <Col>
                                        <p className='fs-2'>คุณ {users.fname} {users.lname}</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='d-flex justify-content-center  text-black '>
                                <Row>
                                    <Col>
                                        <Button  onClick={deletedata} className='fs-5 mr-3 text-black ' style={{backgroundColor:'#3CB371',width:90,height:60 ,fontFamily:"Athiti"}} >
                                            <p className='mt-1'>ยืนยัน</p>
                                        </Button>
                                    </Col>
                                    <Col>
                                        <Button href='/admindash' className='fs-5 ml-3 text-black'style={{backgroundColor:'#CD5C5C',width:90,height:60, fontFamily:"Athiti"}}>
                                            <p className=' mt-1'>ยกเลิก</p>
                                        </Button>
                                    </Col>
                                    

                                </Row>
                            </div>
                        
                        </div>

                    
                        
                    </Card>
                </div>
            </div>
            )}
        </div>
    )
}

export default Delete
