import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OutputBox from '../OutputBox/OutputBox';
import TypeBox from '../TypeBox/TypeBox';
import axios from 'axios';
import useMessages from '../../hooks/useMessages';

const HomeArea = () => {
    const [messages, addMessage, clearMessages] = useMessages();
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const url = process.env.NODE_ENV === 'development' 
                ? 'http://localhost:5000/api/auth/user' 
                : '/api/auth/user';
                const response = await axios.get(url, { withCredentials: true });
                if (response.data.username) {
                    setUsername(response.data.username);
                } else {
                    navigate('/login');
                }
            } catch (error) {
                console.error(error);
                navigate('/login');
            }
        };

        fetchUser();
    }, [navigate]);

    return (
        <>
            <TypeBox addMessage={addMessage} />
            <OutputBox messages={messages} />
        </>
    )
}

export default HomeArea;