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
            const url = '/.netlify/functions/login';
            const response = await axios.post(url,
                { username, password },
                { withCredentials: true }
            );
            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('authToken', token);
                navigate('/');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                setUsername('');
                setPassword('');
                setError(error.response.data.msg);
            } else {
                setError('Server error');
            }
        }
    };

    const handleInputChange = (setter) => (event) => {
        setter(event.target.value);
        setError('');
    };

    return (
        <div className='signerror__container'>
            <div className='signbox__container'>
                <div className='signbox__title'>Please Login to Continue</div>
                <div className='signbox__email signbox__input'>
                    <label htmlFor="username">Username</label>
                    <input
                        type='text'
                        id='username'
                        placeholder='Enter your Username'
                        value={username}
                        onChange={handleInputChange(setUsername)}
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
                        onChange={handleInputChange(setPassword)}
                        required
                    />
                </div>
                <button className='signbox__button' onClick={handleLogin}>Login</button>
            </div>
            <div className='signbox__footer'>No account yet? <Link to='/register'>Register</Link></div>
            {error && <div className='signbox__errorbox'>{error}</div>}
        </div>
    );
};

export default LoginBox;