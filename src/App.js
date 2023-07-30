import React from 'react';
import { ColorSchemeProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmpStracture from './pages/EmpStracture';
import Profile from './pages/Profile';
import Login from './auth/Login';
import Register from './auth/Signup';
import { setTreeDataa } from './actions';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  // const dispatch = useDispatch();
  // const booleanValue = useSelector((state) => state.booleanReducer.booleanValue);
  // const dispatch = useDispatch();

  return (
    <ColorSchemeProvider colorScheme="light">
      <BrowserRouter>
        <Routes>
          <Route path="profile/" element={<Profile />} />
          <Route path="auth/" element={<Login />} />
          <Route path="auth/register" element={<Register />} />
          <Route path="/" element={<EmpStracture />} />
        </Routes>
      </BrowserRouter>
      {/* <button onClick={() => dispatch(increment)}>plus</button> */}
      {/* <button onClick={()=>dispatch(setTreeDataa())}>Set True</button> */}
    </ColorSchemeProvider>
  );
}

export default App;
