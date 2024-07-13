import React, { useRef, useEffect } from 'react';
import './TypeBox.css';
import { FiPlus } from "react-icons/fi";
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import { Tooltip } from 'react-tooltip';

const TypeBox = ({ addMessage }) => {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;

        const resizeTextarea = () => {
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
                textarea.scrollTop = textarea.scrollHeight;
            }
        };

        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                if (event.shiftKey) {
                    return;
                }
                event.preventDefault();
                handleSendMessage();
            }
        };

        if (textarea) {
            textarea.addEventListener('input', resizeTextarea);
            textarea.addEventListener('keydown', handleKeyDown);
            resizeTextarea();

            return () => {
                textarea.removeEventListener('input', resizeTextarea);
                textarea.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, []);

    const handleSendMessage = () => {
        if (textareaRef.current) {
            addMessage(textareaRef.current.value);
            textareaRef.current.value = '';
            textareaRef.current.style.height = 'auto';
        }
    };

    return (
        <div className="typebox__container">
            <div className="typebox__textarea">
                <div className='typebox__newchat' data-tooltip-id="typebox_newchat" data-tooltip-content="New Chat">
                    <Tooltip id="typebox_newchat" className='typebox_tooltip'/>
                    <FiPlus className='typebox__icon' />
                </div>
                <textarea rows={1} ref={textareaRef} placeholder='Send a Message.....'></textarea>
                <div className='typebox__submit' data-tooltip-id="typebox_submit" data-tooltip-content="Send Message" onClick={handleSendMessage}>
                    <Tooltip id="typebox_submit" className='typebox_tooltip'/>
                    <MdSubdirectoryArrowLeft className='typebox__icon'/>
                </div>
            </div>
            <div className='typebox__footer'>
                Open source AI chatbot built with React and Node.js
            </div>
        </div>
    );
};

export default TypeBox;