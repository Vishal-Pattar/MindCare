import { useState } from 'react';
import axios from 'axios';

const useMessages = () => {
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem('authToken');

    const addMessage = async (userMessage) => {
        const tempMessageId = Date.now();
        setMessages(prevMessages => [...prevMessages, { id: tempMessageId, user: userMessage, output: 'Loading...', loading: true }]);

        try {
            const url = '/.netlify/functions/generate';

            const response = await axios.post(url, { prompt: userMessage, authToken: token });
            setMessages(prevMessages => 
                prevMessages.map(msg => 
                    msg.id === tempMessageId ? { ...msg, output: response.data.text, loading: false } : msg
                )
            );
        } catch (error) {
            console.error('Error generating content:', error);
            setMessages(prevMessages => 
                prevMessages.map(msg => 
                    msg.id === tempMessageId ? { ...msg, output: 'Error generating content. Please try again.', loading: false } : msg
                )
            );
        }
    };

    const clearMessages = () => {
        setMessages([]);
    };

    return [messages, addMessage, clearMessages];
};

export default useMessages;