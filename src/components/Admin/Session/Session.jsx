import React, { useState, useEffect } from 'react';
import './Session.css';
import axios from 'axios';

const Session = () => {
    const [session, setSession] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sessions');
                setSession(response.data);
            } catch (error) {
                console.error('Error fetching Session:', error);
            }
        };
        fetchSession();
    }, []);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredSession = session.filter(session => 
        session.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                            <th>SessionID</th>
                            <th>AuthToken</th>
                            <th>CreatedAt</th>
                            <th>LoggedOutAt</th>
                            <th>History</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSession.map((session, index) => (
                            <tr key={session._id}>
                                <td>{index + 1}</td>
                                <td>{session.username}</td>
                                <td>{session.session_id}</td>
                                <td>{session.token}</td>
                                <td>{session.logged_in}</td>
                                <td>{session.logged_out}</td>
                                <td><button className='session__btn'>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Session;