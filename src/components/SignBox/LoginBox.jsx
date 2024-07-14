import React from 'react';
import './SignBox.css';
import { Link } from 'react-router-dom';

const LoginBox = () => {
    return (
        <>
        <div className='signbox__container'>
            <div className='signbox__title'>Please Login to Continue</div>
            <div className='signbox__email signbox__input'>
                <label for="email">Email</label>
                <input type='email' id='email' placeholder='Enter your email address' />
            </div>
            <div className='signbox__password signbox__input'>
                <label for="pass">Password</label>
                <input type='password' id='pass' placeholder='Enter Password' />
            </div>
            <button className='signbox__button'>Login</button>
        </div>
        <div className='signbox__footer'>No account yet? <Link to='/register'>Register</Link></div>  
        </>
    )
}

export default LoginBox;