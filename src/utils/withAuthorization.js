import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { rolePermissions } from './roles';
import AuthContext from '../context/AuthContext';
import AlertBox from '../components/AlertBox/AlertBox';

const withAuthorization = (requiredPermission) => (WrappedComponent) => {
  return (props) => {
    const { ussr, login } = useContext(AuthContext);

    useEffect(() => {
      const username = sessionStorage.getItem('username');
      const authToken = sessionStorage.getItem('authToken');

      if (!ussr && username && authToken) {
        const fetchUserRole = async () => {
          try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/admin/role`, {
              headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json',
              }
            });

            if (response.data && response.data.role) {
              login({ ...response.data });
            }
          } catch (err) {
            console.error('Failed to fetch user role:', err.message);
          }
        };

        fetchUserRole();
      }
    }, [ussr, login]);

    if (!ussr) {
      return <AlertBox variant="error" component="context">Access Denied: You must be logged in to access this page.</AlertBox>;
    }

    if (!rolePermissions[ussr.role]?.includes(requiredPermission)) {
      return <AlertBox variant="error" component="context">Access Denied: You do not have the necessary permissions to access this page.</AlertBox>;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthorization;