import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css';
import axios from 'axios';
import useMessages from '../../hooks/useMessages';

const Header = () => {
  const [messages, addMessage, clearMessages] = useMessages();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const url = 'http://localhost:5000/api/users/logout';
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        localStorage.removeItem('authToken');
        clearMessages();
        setIsAuthenticated(false);
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
      {location.pathname === '/' && isAuthenticated && (
        <button className='header__button roboto-regular' onClick={handleLogout}>Logout</button>
      )}
      {location.pathname === '/' && !isAuthenticated && (
        <Link to="/login">
          <button className='header__button roboto-regular'>Login</button>
        </Link>
      )}
    </div>
  );
}

export default Header;