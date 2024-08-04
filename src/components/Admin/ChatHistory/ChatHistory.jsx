import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ChatHistory.css';
import Markdown from 'markdown-to-jsx';
import formatDateTime from '../../../utils/formatDateTime';
import withAuthorization from '../../../utils/withAuthorization';
import { Permissions } from '../../../utils/roles';

const ChatHistory = () => {
    const { sessionId } = useParams();
    const [chatHistory, setChatHistory] = useState([]);
    const [sessionLoggedInDatetime, setSessionLoggedInDatetime] = useState('');
    const [sessionLoggedOutDatetime, setSessionLoggedOutDatetime] = useState('');
    const [error, setError] = useState('');

    // Fetch chat history based on sessionId
    useEffect(() => {
        const fetchChatHistory = async () => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/history`, { sessionId });
                setChatHistory(response.data.history);
                setSessionLoggedInDatetime(response.data.session.logged_in);
                setSessionLoggedOutDatetime(response.data.session.logged_out);
            } catch (err) {
                setError('Error fetching chat history');
                console.error(err);
            }
        };

        fetchChatHistory();
    }, [sessionId]);

    useEffect(() => {
        const chatHistoryElements = document.querySelectorAll('.chathistory__response');
        if (chatHistoryElements.length > 0) {
            chatHistoryElements[chatHistoryElements.length - 1].classList.add('chathistory__response--last');
        }
    }, [chatHistory]);

    return (
        <>
            <div className='chathistory__container'>
                <span className='chathistory__title'>Chat History</span>
            </div>
            <div className='chathistory__box'>
                <div className='chathistory__datetime'>Session Created at: {formatDateTime(sessionLoggedInDatetime)}</div>
                {chatHistory.map((chat, index) => (
                    <div key={index} className='chathistory__item'>
                        <div className='chathistory__prompt'>{chat.prompt}</div>
                        <div className='chathistory__response'>
                            <pre><Markdown>{chat.response}</Markdown></pre>
                        </div>
                    </div>
                ))}
                <div className='chathistory__datetime'>Session Ended at: {formatDateTime(sessionLoggedOutDatetime)}</div>
            </div>
        </>
    );
}

export default withAuthorization(Permissions.Admin_Access)(ChatHistory);