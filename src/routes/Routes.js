import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import Blog from "../pages/Blog/Blog";
import AddProduct from "../pages/Dashboard/Seller/AddProduct/AddProduct";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Signup from "../pages/Signup/Signup";
import ProtectedRoutes from "./ProtectedRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <ProtectedRoutes><Dashboard></Dashboard></ProtectedRoutes>,
        children: [
            {
                path: '/dashboard/add-product',
                element: <AddProduct></AddProduct>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
])