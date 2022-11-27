import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

const UserDashboard = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className='container mt-5'>
            <div className='row align-items-center'>
                <div className="col-10 mx-auto">
                    <h1 className='text-center'><strong>{user?.displayName}</strong>, Welcome to your Dashboard!</h1>
                </div>

            </div>
        </div>
    );
};

export default UserDashboard;