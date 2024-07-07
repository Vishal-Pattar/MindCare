import React from 'react';
import './App.css';
import './global.css';
import './font.css';
import Header from './components/Header/Header';
import TypeBox from './components/TypeBox/TypeBox';

const App = () => {
  return (
    <div className='App'>
      <Header />
      <TypeBox />
    </div>
  )
}

export default App