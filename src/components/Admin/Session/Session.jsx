import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Session.css';
import axios from 'axios';
import formatDateTime from '../../../utils/formatDateTime';

const Session = () => {
    const [sessions, setSessions] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sessions');
                setSessions(response.data);
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };
        fetchSessions();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredSessions = sessions.filter(session =>
        session.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleShowClick = (sessionId) => {
        navigate(`/admin/history/${sessionId}`);
    };

    return (
        <>
            <div className="session__container">
                <span className='session__title'>Session</span>
                <div className='session__search'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='session__searchInput'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
            </div>
            <div className='session__box'>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Session-ID</th>
                            <th>Logged-In</th>
                            <th>Logged-Out</th>
                            <th>History</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSessions.map((session, index) => (
                            <tr key={session._id}>
                                <td>{index + 1}</td>
                                <td>{session.username}</td>
                                <td>{session.session_id}</td>
                                <td>{formatDateTime(session.logged_in)}</td>
                                <td>{formatDateTime(session.logged_out)}</td>
                                <td>
                                    <button
                                        className='session__btn'
                                        onClick={() => handleShowClick(session.session_id)}
                                    >
                                        Show
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Session;