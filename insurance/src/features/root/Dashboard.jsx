import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './../form/SignIn';
import SignUp from './../form/SignUp';
import ForgotPassword from './../form/ForgotPassword';
import Recovery from './../form/Recovery';
import NotFound from '../errors/NotFound';
import Home from '../home/Home';

const Dashboard = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Dashboard;
