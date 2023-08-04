import React from 'react';
import { ColorSchemeProvider } from '@mantine/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import EmpStracture from './pages/EmpStracture';
import Profile from './pages/Profile';
import Login from './auth/Login';
import Register from './auth/Signup';

function App() {

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
    </ColorSchemeProvider>
  );
}

export default App;
