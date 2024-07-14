import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className='header__container'>
        <div className='header__title roboto-regular'>Creative Minds AI Chat</div>
        <Link to="/login">
            <button className='header__button roboto-regular'>Login</button>
        </Link>
    </div>
  );
}

export default Header;
