import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './global.css';
import './font.css';
import Header from './components/Header/Header';
import LoginBox from './components/SignBox/LoginBox';
import RegisterBox from './components/SignBox/RegisterBox';
import HomeArea from './components/HomeArea/HomeArea';
import Admin from './components/Admin/Admin'
import Users from './components/Admin/Users/Users';
import Coupon from './components/Admin/Coupon/Coupon';
import Session from './components/Admin/Session/Session';
import ChatHistory from './components/Admin/ChatHistory/ChatHistory';

const App = () => {
    return (
        <Router>
            <div className='App'>
                <Header />
                <Routes>
                    <Route path="/admin" element={<Admin />}>
                        <Route path="users" element={<Users />} />
                        <Route path="coupons" element={<Coupon />} />
                        <Route path="sessions" element={<Session />} />
                        <Route path="history/:sessionId" element={<ChatHistory />} />
                    </Route>
                    <Route path="/login" element={<LoginBox />} />
                    <Route path="/register" element={<RegisterBox />} />
                    <Route path="/" element={<HomeArea />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;