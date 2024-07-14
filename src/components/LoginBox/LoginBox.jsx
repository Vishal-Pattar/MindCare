import React from 'react';
import './LoginBox.css';
import { Link } from 'react-router-dom';

const LoginBox = () => {
    return (
        <>
        <div className='loginbox__container'>
            <div className='loginbox__title'>Please Login to Continue</div>
            <div className='loginbox__email loginbox__input'>
                <label for="email">Email</label>
                <input type='email' id='email' placeholder='Enter your email address' />
            </div>
            <div className='loginbox__password loginbox__input'>
                <label for="pass">Password</label>
                <input type='password' id='pass' placeholder='Enter Password' />
            </div>
            <button className='loginbox__button'>Login</button>
        </div>
        <div className='loginbox__footer'>No account yet? <Link to='/register'>Register</Link></div>  
        </>
    )
}

export default LoginBox;