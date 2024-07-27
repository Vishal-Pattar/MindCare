import React, { useState, useEffect } from 'react';
import './Users.css';
import Toggle from '../Custom/Toggle';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/users');
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleToggle = (index) => {
        const updatedUsers = [...users];
        updatedUsers[index].permit = !updatedUsers[index].permit;
        setUsers(updatedUsers);
    };

    return (
        <>
            <div className="users__container">
                <span className='users__title'>Users</span>
            </div>
            <div className='users__box'>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Referral</th>
                            <th>Role</th>
                            <th>Total Sessions</th>
                            <th>Total Prompts</th>
                            <th>Sessions Credits</th>
                            <th>Permit</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.referral}</td>
                                <td>{user.role}</td>
                                <td className='center'>{user.totalSessions}</td>
                                <td className='center'>{user.totalPrompts}</td>
                                <td className='center'>{user.sessionCredits}</td>
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