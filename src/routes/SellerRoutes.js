import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { AuthContext } from '../context/AuthProvider';
import useCheckUserRole from '../hooks/useCheckUserRole';

const SellerRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    const [isSeller, userLoading] = useCheckUserRole(user?.email);

    if (loading || userLoading) {
        return <Loader></Loader>
    }

    if (!user && !isSeller) {
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children;

};

export default SellerRoutes;