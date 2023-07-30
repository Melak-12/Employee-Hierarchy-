import React from 'react'
import SideBar from '../components/SideBar'
import { useNavigate } from 'react-router-dom';
import {  Badge,Button,Modal,Notification,NotificationsProvider,} from '@mantine/core';
import { Alert } from '@material-tailwind/react';

const NavBar = () => {
  const nav = useNavigate();
  const handleLogin = () => {
    nav('/auth')
  }
  const drawerStyles = {
    backdropFilter: 'none',
    backgroundColor: 'red',
    boxShadow: '0px',
    width: "270px",
    border:"none"
    
  };
  const showNotifications = () => {
    Modal.info({
      title: (<span className='text-slate-800 font-sans  font-bold'>Notifications</span>),
      style:{drawerStyles},
      content: (
        <div>
          {/* <p>ID: {id}</p> */}
          {/* <p>Position: {title}</p> */}
          {/* <p>Parent ID: {parentId}</p> */}
          <span className='text-red-600 font-sans'>No notification !</span>
        </div>
        

      ),
      maskClosable: true,
    });
  };

  const handleSpanClick = () => {
    return <Alert>fsd</Alert>
  };

  
  return (
    <div className="navbar fixed top-0 left-0 right-0 z-10">
      
        <div className='appbar bg-slate-700 p-5 flex flex-col rounded-bl-2xl rounded-br-2xl '>
          {/* <span className='text-3xl m-5 mt-7 text-white'><b className='text-green-400 font-bold'>P</b>erago</span> */}
        <div className="flex justify-left -mb-8 text-2xl font-bold text-white">
          
                <SideBar />
                {/* <SideDrawer /> */}
        </div>
        
              <div className="flex pl-11 text-2xl font-bold text-slate-300" onClick={()=>nav('/')}>
              <span onClick={handleSpanClick} className='text-3xl border-2 border-slate-600 shadow-lg  rounded-2xl pr-2 pl-2 font-bold ml-3 mr-96 text-white'><b className='text-green-400 font-bold'>P</b>erago</span>
          <span className='pt-2'>
            
              <span className='shadow-sm pl-3 pr-3 border-slate-700 border-2 rounded-lg mr-11 text-base p-2 text-slate-300 hover:bg-green-700 hover:text-white'>
                Home
              </span>
              <span className='shadow-sm pl-3 pr-3 border-slate-700 border-2 rounded-lg mr-11 text-base p-2 text-slate-300 hover:bg-green-700 hover:text-white'>
                Contact 
              </span>
              <span className='shadow-sm pl-3 pr-3 border-slate-700 border-2 rounded-lg mr-11 text-base p-2 text-slate-300 hover:bg-green-700 hover:text-white'>
                Postions
            </span>
            </span>

        </div>
        
              <div className="flex justify-end">
                  {/* <Badge  className="-mt-6 p-1 font-sm text-sm mx-3 rounded ">
                            <i className="far fa-envelope fa-2x text-slate-400  hover:text-green-600" ></i>
          </Badge> */}
          <Button  className="-mt-6 p-1 font-sm text-sm mx-3 rounded-3xl hover:bg-slate-700"
            >
                            <i className="far fa-envelope fa-2x text-slate-400 hover:text-green-500" ></i>
              
              <Badge  radius='lg' className='bg-red-600 text-white rounded-4xl -mt-1 '>3</Badge>
          </Button>
          <Button
              className="-mt-6 p-1 font-sm text-sm mx-3 rounded-3xl hover:bg-slate-700  "
            >
                            <i className="far fa-bell fa-2x text-slate-400 hover:text-green-500  " ></i>
              
              <Badge  radius='lg' className='bg-red-600 text-white rounded-4xl -mt-1 '>2</Badge>
          </Button>
          
                  {/* <Badge onClick={showNotifications} color='red' count={3}  className="-mt-6 p-1 font-semibold text-md mx-3 rounded ">
                            <i className="far fa-bell fa-2x text-slate-400  hover:text-green-600" ></i>
                  </Badge> */}
                    <button onClick={()=>nav('/auth')} className="-mt-6 bg-slate-500 hover:bg-green-600 text-green-100 border-spacing-3 shadow p-1 font-semibold text-md mx-3 rounded">
                    <i className="fas fa-sign-in-alt px-1"></i>Login
                  </button>
                  <button onClick={()=>nav('/auth/register')} className="-mt-6  bg-slate-500 hover:bg-green-600 text-green-100 border-spacing-3 shadow p-1 font-semibold text-md rounded">
                    <i className="fas fa-user-plus px-1"></i>Register
                  </button>
                </div>
            </div>
              
    </div>
  )
}

export default NavBar