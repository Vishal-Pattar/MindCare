import React, { useState } from 'react';
import './App.css';
import './global.css';
import './font.css';
import Header from './components/Header/Header';
import TypeBox from './components/TypeBox/TypeBox';
// import WelcomeBox from './components/WelcomeBox/WelcomeBox';
import OutputBox from './components/OutputBox/OutputBox';

const App = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = (userMessage) => {
        const newMessage = {
            user: userMessage,
            output: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea, eligendi repellat cupiditate eum blanditiis omnis nemo. Ut, quos nihil. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi ea, eligendi repellat cupiditate eum blanditiis omnis nemo. Ut, quos nihil.'
        };
        setMessages([...messages, newMessage]);
    };

    return (
        <div className='App'>
            <Header />
            <TypeBox addMessage={addMessage} />
            <OutputBox messages={messages} />
        </div>
    )
}

export default App;