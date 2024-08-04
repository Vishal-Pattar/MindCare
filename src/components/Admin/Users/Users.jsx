import React, { useState, useEffect } from 'react';
import './Users.css';
import Toggle from '../Custom/Toggle';
import axios from 'axios';
import withAuthorization from '../../../utils/withAuthorization';
import { Permissions } from '../../../utils/roles';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users`);
            setUsers(response.data.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleRefresh = () => {
        fetchUsers();
    }

    const handleToggle = async (user) => {
        const updatedUsers = users.map(u =>
            u.username === user.username ? { ...u, permit: !u.permit } : u
        );

        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/users/permit`, {username : user.username});
            setUsers(updatedUsers);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <div className="users__container">
                <span className='users__title'>Users</span>
                <div className='users__search'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='users__searchInput'
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    <button className='users__button' onClick={handleRefresh}>Refresh</button>
                    <div className='users__checkbox'>Show</div>
                </div>
            </div>
            <div className='users__box'>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Coupon</th>
                            <th>Role</th>
                            <th>Permit</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user.username}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.coupon}</td>
                                <td>{user.role}</td>
                                <td className='center'>
                                    <Toggle permit={user.permit} onClick={() => handleToggle(user)} />
                                </td>
                                <td><button className='users__btn'>Edit</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default withAuthorization(Permissions.Admin_Access)(Users);