import React, { useState } from 'react';
import './Admin.css';
import { IoMdCloseCircle } from "react-icons/io";
import { ImMenu } from "react-icons/im";
import Coupon from './Coupon/Coupon';
import ChatHistory from './ChatHistory/ChatHistory';
import Users from './Users/Users';
import Session from './Session/Session';

const AdminPanel = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [selectedMenuItem, setSelectedMenuItem] = useState('Users'); // Default to 'Users'

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleMenuClick = (menuItem) => {
        setSelectedMenuItem(menuItem);
    };

    return (
        <div className='admin-panel'>
            <div className='admin-sidebar' style={{ width: isSidebarOpen ? '20vw' : '4vw' }}>
                {isSidebarOpen ? (
                    <div className="sidebar">
                        <div className='sidebar-header'>
                            <div>Menus</div>
                            <IoMdCloseCircle className='close-button' onClick={toggleSidebar} />
                        </div>
                        <div className="menu-item" onClick={() => handleMenuClick('Users')}>Users</div>
                        <div className="menu-item" onClick={() => handleMenuClick('Coupon')}>Coupon</div>
                        <div className="menu-item" onClick={() => handleMenuClick('Sessions')}>Sessions</div>
                        <div className="menu-item" onClick={() => handleMenuClick('ChatHistory')}>Chat History</div>
                    </div>
                ) : (
                    <div className='menu-button-container'>
                        <ImMenu className='menu-button' onClick={toggleSidebar} />
                    </div>
                )}
            </div>
            <div className='admin__container' style={{ width: isSidebarOpen ? '80vw' : '96vw' }}>
                {selectedMenuItem === 'Users' && <Users />}
                {selectedMenuItem === 'Coupon' && <Coupon />}
                {selectedMenuItem === 'Sessions' && <Session />}
                {selectedMenuItem === 'ChatHistory' && <ChatHistory />}
            </div>
        </div>
    );
};

export default AdminPanel;