import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Layout from './Layout/Layout';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import VerifyOtp from './Pages/VerifyOtp';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<><Layout /> </>}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/forgot-password" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
