import React from 'react';
import './WelcomeBox.css';
import withAuthorization from '../../utils/withAuthorization';
import { Permissions } from '../../utils/roles';

const WelcomeBox = () => {
  return (
    <div className='welcomebox__container'>
        <div className='welcomebox__header'>Welcome to Your Mental Health Companion!</div>
        <div className='welcomebox__content'>
            <p>We understand that life can sometimes be overwhelming, and it's important to have someone to talk to. Our AI chatbot is here to provide you with support, guidance, and a listening ear.</p>
            <p>Whether you're feeling anxious, stressed, or simply need someone to share your thoughts with, our chatbot is designed to help you navigate through these feelings. Remember, you are not alone, and taking the first step towards better mental health is commendable.</p>
            <p>Feel free to start a conversation, ask questions, or share what’s on your mind. Your well-being is our priority, and we're here to support you every step of the way.</p>
        </div>
    </div>
  )
}

export default withAuthorization(Permissions.User_Access)(WelcomeBox);