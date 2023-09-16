import React, { useState } from 'react';
import { Button, Radio, Space } from 'antd';
import { List } from '@material-tailwind/react';
import { Link } from 'react-router-dom';
import { Drawer } from '@mantine/core';
const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState('left');
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  // const onChange = (e) => {
  //   setPlacement(e.target.value);
  // };


  const drawerStyles = {
    // backdropFilter: 'none',
    // backgroundColor: 'rgb(47, 58, 77)',
    // boxShadow: '23px',
    width: "290px",
    border:"60px"
    // shadow: "none",
    // paddingLeft: "100px",
    // marginLeft:"-50px"
    ,
    // boxShadow: '0 0 23px rgba(0, 0, 0, 0.5)',

  };

  const overlayStyles = {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  };

  return (
    <>
            
          <Button onClick={showDrawer} className=" hover:bg-slate-500" style={{ background: 'none', border: 'none', boxShadow: 'none', padding: 0 }} >
            <i className="fas fa-list hover:text-green-500 text-slate-400 text-2xl"></i>
          </Button>
        <div className="-ml-4 -pl-62">
        <div>
      <Drawer
        title={<span className='text-slate-400 text-2xl'>Options</span>}
        // placement={placement}
        // closable={false}
        onClose={onClose}
        opened={open}
        key={placement}
        style={drawerStyles}
        bodyStyle={{ padding: 0,boxShadow:"none"}}  
        maskStyle={overlayStyles}
        className='shadow-2xl border-lg bg-slate-700 '
            
      >
        <div className='text-slate-300 text-1xl p-8' style={{letterSpacing:"1px"}}>
          <List>
            {/* <hr /> */}
            <i className="fas fa-users hover:text-green-500 text-slate-400 mb-6 flex "> &nbsp;&nbsp;&nbsp; <span className='font-sans text-lg -mt-1'>All employees </span> </i>
          </List>
            <List>
            <Link to="profile">
            
            <i className="fas fa-user hover:text-green-500 text-slate-400 mb-6  flex mt-1"> &nbsp;&nbsp;&nbsp; <span className='font-sans text-lg -mt-1'>Profile </span> </i>
            </Link>
          </List>
            <List>
            <i className="fas fa-star hover:text-green-500 text-slate-400 mb-6 flex "> &nbsp;&nbsp;&nbsp; <span className='font-sans text-lg -mt-1 '> Top rated </span> </i>
          </List>
            <List>
            <i className="fas fa-bell hover:text-green-500 text-slate-400 mb-6 flex "> &nbsp;&nbsp;&nbsp; <span className='font-sans text-lg -mt-1 '>Notifications </span> </i>
          </List>
          <List>
            <i className="fas fa-sign-out-alt hover:text-red-700 text-red-500 mb-6 flex "> &nbsp;&nbsp;&nbsp; <span className='font-sans text-lg -mt-1 '> Log Out</span> </i>
          </List>
          <List className='mt-72 flex text-center'>
            <hr className="border-t-2 border-gray-400 border-dashed my-5"/>

          <i className="fas fa-cog hover:text-green-500 text-slate-400 mb-6 inline mr-3 pr-3"><span className='font-sans text-lg  p-4 '>Settings</span> </i>
            
            
          </List>

        </div>
          </Drawer>
        </div>  
          
        </div>
        
    </>
  );
};
export default SideBar;