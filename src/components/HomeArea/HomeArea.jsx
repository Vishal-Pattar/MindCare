import React from 'react';
import OutputBox from '../OutputBox/OutputBox';
import TypeBox from '../TypeBox/TypeBox';
import useMessages from '../../hooks/useMessages';

const HomeArea = () => {
    const [messages, addMessage] = useMessages();

    return (
        <>
            <TypeBox addMessage={addMessage} />
            <OutputBox messages={messages} />
        </>
    );
};

export default HomeArea;