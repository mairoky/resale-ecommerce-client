import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader/DashboardHeader';
import Header from '../components/Header/Header';


const Dashboard = () => {

    return (
        <>
            <DashboardHeader></DashboardHeader>
            <Outlet></Outlet>
        </>
    );
};

export default Dashboard;