import React, { useState, useEffect } from 'react';
import './OutputBox.css';
import img from '../../assets/logo.png';
import Loader from '../../assets/loader.gif'; // Add a loader gif to your assets

const OutputBox = ({ messages }) => {
    const [displayMessages, setDisplayMessages] = useState([]);

    useEffect(() => {
        if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            setDisplayMessages((prevMessages) => [...prevMessages, { ...lastMessage, display: false }]);

            setTimeout(() => {
                setDisplayMessages((prevMessages) =>
                    prevMessages.map((msg, index) =>
                        index === prevMessages.length - 1 ? { ...msg, display: true } : msg
                    )
                );
            }, 2000);
        }
    }, [messages]);

    return (
        <div className='outputbox__container'>
            {displayMessages.map((msg, index) => (
                <div className='outputbox__content' key={index}>
                    <span>
                        <img src={img} alt='output' className='outputbox__image' />
                        <div className='outputbox__text'>
                            <span>{msg.user}</span>
                        </div>
                    </span>
                    <span>
                        <img src={img} alt='output' className='outputbox__image' />
                        <div className='outputbox__text'>
                            {msg.display ? (
                                msg.output.split(' ').map((word, i) => (
                                    <span key={i} className='word' style={{ '--word-index': i }}>{word} </span>
                                ))
                            ) : (
                                <img src={Loader} alt='loading' className='loader' />
                            )}
                        </div>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default OutputBox;