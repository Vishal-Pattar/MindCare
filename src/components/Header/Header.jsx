import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
import useMessages from '../../hooks/useMessages';

const Header = () => {
  const [messages, addMessage, clearMessages] = useMessages();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const url = '/.netlify/functions/logout';
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      if (response.status === 200) {
        localStorage.removeItem('authToken');
        clearMessages();
        navigate('/login');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='header__container'>
      <div className='header__title roboto-regular'>Creative Minds AI Chat</div>
      {location.pathname === '/login' && (
        <Link to="/register">
          <button className='header__button roboto-regular'>Register</button>
        </Link>
      )}
      {location.pathname === '/register' && (
        <Link to="/login">
          <button className='header__button roboto-regular'>Login</button>
        </Link>
      )}
      {location.pathname === '/' && (
        <button className='header__button roboto-regular' onClick={handleLogout}>Logout</button>
      )}
    </div>
  );
}

export default Header;