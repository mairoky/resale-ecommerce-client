import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useCheckUserRole from '../hooks/useCheckUserRole';

const BuyerRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();
    const [isBuyer] = useCheckUserRole(user?.email);

    if (!user && !isBuyer) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;

};

export default BuyerRoutes;