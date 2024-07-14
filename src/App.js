import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './global.css';
import './font.css';
import Header from './components/Header/Header';
import TypeBox from './components/TypeBox/TypeBox';
import OutputBox from './components/OutputBox/OutputBox';
import LoginBox from './components/SignBox/LoginBox';
import RegisterBox from './components/SignBox/RegisterBox';
import useMessage from './hooks/useMessage';

const Main = ({ addMessage, messages }) => (
    <>
        <TypeBox addMessage={addMessage} />
        <OutputBox messages={messages} />
    </>
);

const App = () => {
    const [messages, addMessage] = useMessage();

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
