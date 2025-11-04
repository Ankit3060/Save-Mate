import { useState } from 'react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import Home from './Pages/Home';
import Layout from './Layout/Layout';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import VerifyOtp from './Pages/VerifyOtp';
import ForgetPassword from './Pages/ForgetPassword';
import ResetPassword from './Pages/ResetPassword';
import Profile from './Pages/Profile';
import UpdateProfile from './Pages/UpdateProfile';
import AddTransaction from './Components/AddTransaction';
import ViewTransaction from './Components/ViewTransaction';
import ViewParticularTransaction from './Components/ViewParticulaTransaction';

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
            <Route path="/reset-password/:token" element={<ResetPassword />} />
            <Route path="/user/profile" element={<Profile />} />
            <Route path="user/update/profile" element={<UpdateProfile />} />
            <Route path="/transaction/add" element={<AddTransaction />} />
            <Route path='/transaction/view' element={<ViewTransaction />} />
            <Route path='/transaction/view/:id' element={<ViewParticularTransaction />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
    </>
  )
}

export default App
