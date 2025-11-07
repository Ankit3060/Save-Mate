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
import EditTransaction from './Components/EditTransaction';
import Bin from './Components/Bin';
import Dashboard from './Components/Dashboard';
import WeeklyReport from './Components/WeeklyReport';
import MonthlyReport from './Components/MonthlyReport';
import YearlyReport from './Components/YearlyReport';
import ScrollToTop from './Layout/ScrollToTop'
import About from './Pages/About';
import ContactUs from './Pages/ContactUs';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<><Layout /> <ScrollToTop /> </>}>
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
            <Route path='/transaction/edit/:id' element={<EditTransaction />} />
            <Route path='/bin' element={<Bin />} />
            <Route path="/dashboard" element={ <Dashboard />} />
            <Route path='/report/weekly' element={<WeeklyReport />} />
            <Route path='/report/monthly' element={<MonthlyReport />} />
            <Route path='/report/yearly' element={<YearlyReport />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<ContactUs />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
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
