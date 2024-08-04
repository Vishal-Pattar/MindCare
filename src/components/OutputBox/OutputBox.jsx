import React, { useState, useEffect, useRef } from 'react';
import WelcomeBox from '../WelcomeBox/WelcomeBox';
import './OutputBox.css';
import img from '../../assets/logo.png';
import Loader from '../../assets/loader.gif';
import Markdown from 'markdown-to-jsx';
import withAuthorization from '../../utils/withAuthorization';
import { Permissions } from '../../utils/roles';

const OutputBox = ({ messages }) => {
    const [showWelcomeBox, setShowWelcomeBox] = useState(true);
    const containerRef = useRef(null);

    useEffect(() => {
        if (messages.length > 0) {
            setShowWelcomeBox(false);
        } else {
            setShowWelcomeBox(true);
        }
    }, [messages]);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
    }, [messages]);

    return showWelcomeBox ? (
        <WelcomeBox />
    ) : (
        <div className='outputbox__container' ref={containerRef}>
            {messages.map((msg, index) => (
                <div className='outputbox__content' key={index}>
                    <span>
                        <img src={img} alt='output' className='outputbox__image' />
                        <div className='outputbox__textspace'>{msg.user}</div>
                    </span>
                    <span>
                        <img src={img} alt='output' className='outputbox__image' />
                        <div className='outputbox__textspace outputbox__textspace_output'>
                            {msg.loading ? (
                                <img src={Loader} alt='loading' className='loader' />
                            ) : (
                                <Markdown>{msg.output}</Markdown>
                            )}
                        </div>
                    </span>
                </div>
            ))}
        </div>
    );
};

export default withAuthorization(Permissions.User_Access)(OutputBox);