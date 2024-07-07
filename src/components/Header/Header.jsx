import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className='header__container'>
        <span className='header__title roboto-regular'>ChatGPT</span>
        <button className='header__button roboto-regular'>Login</button>
    </div>
  )
}

export default Header;