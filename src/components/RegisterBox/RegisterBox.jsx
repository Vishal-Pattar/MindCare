import React from 'react';
import './RegisterBox.css';
import { Link } from 'react-router-dom';

const RegisterBox = () => {
    return (
        <>
        <div className='registerbox__container'>
            <div className='registerbox__title'>Sign up for an account!</div>
            <div className='registerbox__email registerbox__input'>
                <label for="email">Email</label>
                <input type='email' id='email' placeholder='Enter your email address' />
            </div>
            <div className='registerbox__password registerbox__input'>
                <label for="pass">Password</label>
                <input type='password' id='pass' placeholder='Enter Password' />
            </div>
            <button className='registerbox__button'>Create Account</button>
        </div>
        <div className='registerbox__footer'>
            Already have an account? <Link to='/login'>Log in</Link></div>  
        </>
    )
}

export default RegisterBox;