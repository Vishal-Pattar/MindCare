import React, { useState } from 'react';
import './SignBox.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginBox = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const url = process.env.NODE_ENV === 'development' 
                ? 'http://localhost:5000/api/auth/login' 
                : '/api/auth/login';
            const response = await axios.post(url,
                { username, password },
                { withCredentials: true }
            );
            if (response.status === 200) {
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.msg);
            } else {
                setError('Server error');
            }
        }
    };

    return (
        <>
            <div className='signbox__container'>
                <div className='signbox__title'>Please Login to Continue</div>
                <div className='signbox__email signbox__input'>
                    <label htmlFor="username">Username</label>
                    <input
                        type='text'
                        id='username'
                        placeholder='Enter your Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className='signbox__password signbox__input'>
                    <label htmlFor="pass">Password</label>
                    <input
                        type='password'
                        id='pass'
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className='signbox__button' onClick={handleLogin}>Login</button>
            </div>
            <div className='signbox__footer'>No account yet? <Link to='/register'>Register</Link></div>
            {error && <div className='signbox__errorbox'>{error}</div>}
        </>
    );
};

export default LoginBox;
