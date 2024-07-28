import React, { useState, useEffect } from 'react';
import './Users.css';
import Toggle from '../Custom/Toggle';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleToggle = async (index) => {
        const updatedUsers = [...users];
        const userToUpdate = updatedUsers[index];
        try {
            await axios.put(`http://localhost:5000/api/users/toggle-permit/${userToUpdate.username}`);
            // Update the local state to reflect the change
            userToUpdate.permit = !userToUpdate.permit;
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
                            <th>Fname</th>
                            <th>Lname</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Permit</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.coupon}</td>
                                <td>{user.role}</td>
                                <td>{user.personal_details.first_name}</td>
                                <td>{user.personal_details.last_name}</td>
                                <td>{user.personal_details.age}</td>
                                <td>{user.personal_details.gender}</td>
                                <td className='center'>
                                    <Toggle permit={user.permit} onClick={() => handleToggle(index)} />
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

export default Users;
