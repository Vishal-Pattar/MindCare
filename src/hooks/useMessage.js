import { useState } from 'react';
import axios from 'axios';

const useMessages = () => {
    const [messages, setMessages] = useState([]);

    const addMessage = async (userMessage) => {
        const tempMessageId = Date.now();
        setMessages(prevMessages => [...prevMessages, { id: tempMessageId, user: userMessage, output: 'Loading...', loading: true }]);

        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/generate`, { prompt: userMessage });
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

    return [messages, addMessage];
};

export default useMessages;