import React, { useState } from 'react';
import './SignBox.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterBox = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [coupon, setCoupon] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!username || !password || !email || !coupon) {
            setError('All fields are required');
            return;
        }
        
        try {
            const url = 'http://localhost:5000/api/users/register';
            const response = await axios.post(url, { username, password, email, coupon });
            if (response.status === 201) {
                navigate('/login');
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
        <div className='signerror__container'>
            <div className='signbox__container'>
                <div className='signbox__title'>Sign up for an account!</div>
                <div className='signbox__email signbox__input'>
                    <label htmlFor="username">*Username</label>
                    <input
                        type='text'
                        id='username'
                        placeholder='Enter your Username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />
                </div>
                <div className='signbox__password signbox__input'>
                    <label htmlFor="pass">*Password</label>
                    <input
                        type='password'
                        id='pass'
                        placeholder='Enter your Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </div>
                <div className='signbox__coupon signbox__input'>
                    <label htmlFor="email">*Email</label>
                    <input
                        type='email'
                        id='email'
                        placeholder='Enter your Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />
                </div>
                <div className='signbox__coupon signbox__input'>
                    <label htmlFor="coupon">
                        *Coupon <span>[Enter your coupon code to avail credits]</span>
                    </label>
                    <input
                        type='text'
                        id='coupon'
                        placeholder='Enter your Coupon code'
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value)}
                        required={true}
                    />
                </div>
                <button className='signbox__button' onClick={handleRegister}>Create Account</button>
            </div>
            <div className='signbox__footer'>Already have an account? <Link to='/login'>Log in</Link></div>
            {error && <div className='signbox__errorbox'>{error}</div>}
        </div>
    )
}

export default RegisterBox;