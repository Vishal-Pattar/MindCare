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
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate('/login');
            return;
        }

        const fetchUser = async () => {
            try {
                const url = '/.netlify/functions/authentication';
                const response = await axios.get(url, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    withCredentials: true
                });
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
    );
};

export default HomeArea;
