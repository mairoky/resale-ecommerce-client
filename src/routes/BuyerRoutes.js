import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { AuthContext } from '../context/AuthProvider';
import useCheckUserRole from '../hooks/useCheckUserRole';

const BuyerRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isBuyer, userLoading] = useCheckUserRole(user?.email);

    if (loading || userLoading) {
        return <Loader></Loader>
    }

    if (!user && !isBuyer) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;

};

export default BuyerRoutes;