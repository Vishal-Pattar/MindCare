import React, { useState } from 'react';
import './Admin.css';
import { IoMdCloseCircle } from "react-icons/io";
import { ImMenu } from "react-icons/im";
import Referral from './Referral/Referral';
import ChatHistory from './ChatHistory/ChatHistory';

const AdminPanel = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    }

    return (
        <div className='admin-panel'>
            <div className='admin-sidebar' style={{ width: isSidebarOpen ? '20vw' : '4vw' }}>
                {isSidebarOpen ? (
                    <div className="sidebar">
                        <div className='sidebar-header'>
                            <div>Menus</div>
                            <IoMdCloseCircle className='close-button' onClick={toggleSidebar} />
                        </div>
                        <div className="menu-item">Users</div>
                        <div className="menu-item">Referral</div>
                        <div className="menu-item">Sessions</div>
                        <div className="menu-item">Chat History</div>
                    </div>
                ) : (
                    <div className='menu-button-container'>
                        <ImMenu className='menu-button' onClick={toggleSidebar} />
                    </div>
                )}
            </div>
            <div className='admin__container' style={{ width: isSidebarOpen ? '80vw' : '96vw' }} >
                {/* <Referral /> */}
                <ChatHistory />
            </div>
        </div>
    );
}

export default AdminPanel;