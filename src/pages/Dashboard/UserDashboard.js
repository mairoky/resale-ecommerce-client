import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
            <div>
                <h1>{user?.displayName}, Welcome to your Dashboard!</h1>
            </div>
        </div>
    );
};

export default UserDashboard;