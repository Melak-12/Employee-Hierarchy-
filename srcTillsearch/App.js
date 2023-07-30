import React from 'react';
// import { Counter } from './features/counter/Counter';
// import './App.css';
import EmpStracture from './pages/EmpStracture';
// import ActionToggle from './components/Darkmode';
import { ColorSchemeProvider } from '@mantine/core';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Profile from './pages/Profile';
import Footer from './pages/Footer';
import Login from './auth/Login';
import Register from './auth/Signup';


function App() {
  return (
    // <div className="App">
        
    // </div>
     <ColorSchemeProvider colorScheme="light">
      {/* <ActionToggle/> */}
      {/* <EmpStracture /> */}
      <BrowserRouter >
        <Routes>
          {/* <Route path='notification' Component={<EmpStracture />} /> */}
          {/* <Route path='help' Component={<EmpStracture />} /> */}
          <Route path='profile/' element={<Profile />} />
          <Route path='auth/' element={<Login />} />
          <Route path='auth/register' element={<Register />} />
          
          <Route path='/' element={<EmpStracture />} />
        </Routes>
      </BrowserRouter>
          {/* <Footer/> */}
      {/* <EmpStracture/> */}
   </ColorSchemeProvider>
  );
}

export default App;
