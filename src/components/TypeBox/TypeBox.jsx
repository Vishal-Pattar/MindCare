import React, { useRef, useEffect } from 'react';
import './TypeBox.css';
import { FiPlus } from "react-icons/fi";
import { MdSubdirectoryArrowLeft } from "react-icons/md";
import { Tooltip } from 'react-tooltip';

const TypeBox = () => {
    const textareaRef = useRef(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            const resizeTextarea = () => {
                textarea.style.height = 'auto';
                textarea.style.height = `${textarea.scrollHeight}px`;
                textarea.scrollTop = textarea.scrollHeight;
            };

            textarea.addEventListener('input', resizeTextarea);
            resizeTextarea();

            return () => {
                textarea.removeEventListener('input', resizeTextarea);
            };
        }
    }, []);

    return (
        <div className="typebox__container">
            <div className="typebox__textarea">
                <div className='typebox__newchat' data-tooltip-id="typebox_newchat" data-tooltip-content="New Chat">
                    <Tooltip id="typebox_newchat" className='typebox_tooltip'/>
                    <FiPlus className='typebox__icon' /></div>
                <textarea rows={1} ref={textareaRef} placeholder='Send a Message.....'></textarea>
                <div className='typebox__submit' data-tooltip-id="typebox_submit" data-tooltip-content="Send Message">
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
