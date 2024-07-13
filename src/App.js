import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import './global.css';
import './font.css';
import Header from './components/Header/Header';
import TypeBox from './components/TypeBox/TypeBox';
import OutputBox from './components/OutputBox/OutputBox';
import LoginBox from './components/LoginBox/LoginBox';
import RegisterBox from './components/RegisterBox/RegisterBox';

const Main = ({ addMessage, messages }) => (
    <>
        <TypeBox addMessage={addMessage} />
        <OutputBox messages={messages} />
    </>
);

const App = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (userMessage) => {
        const newMessage = {
            user: userMessage,
            output: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea, eligendi repellat cupiditate eum blanditiis omnis nemo. Ut, quos nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea, eligendi repellat.'
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <Router>
            <div className='App'>
                <Header />
                <Routes>
                    <Route path="/login" element={<LoginBox />} />
                    <Route path="/register" element={<RegisterBox />} />
                    <Route path="/" element={<Main addMessage={addMessage} messages={messages} />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
