import React from 'react';
import OutputBox from '../OutputBox/OutputBox';
import TypeBox from '../TypeBox/TypeBox';
import useMessages from '../../hooks/useMessages';
import { triggerFetchCredits } from '../../hooks/useCredits';
import withAuthorization from '../../utils/withAuthorization';
import { Permissions } from '../../utils/roles';

const HomeArea = () => {
    const [messages, addMessage] = useMessages();
    triggerFetchCredits();
    return (
        <>
            <TypeBox addMessage={addMessage} />
            <OutputBox messages={messages} />
        </>
    );
};

export default withAuthorization(Permissions.User_Access)(HomeArea);