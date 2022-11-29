import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import Blog from "../pages/Blog/Blog";
import AllBuyers from "../pages/Dashboard/Admin/AllBuyers/AllBuyers";
import AllSellers from "../pages/Dashboard/Admin/AllSellers/AllSellers";
import ReportedItems from "../pages/Dashboard/Admin/ReportedItems/ReportedItems";
import MyOrders from "../pages/Dashboard/Buyer/MyOrders/MyOrders";
import AddProduct from "../pages/Dashboard/Seller/AddProduct/AddProduct";
import MyBuyers from "../pages/Dashboard/Seller/MyBuyers/MyBuyers";
import MyProducts from "../pages/Dashboard/Seller/MyProducts/MyProducts";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import ProductByCategory from "../pages/ProductByCategory/ProductByCategory";
import Signup from "../pages/Signup/Signup";
import AdminRoutes from "./AdminRoutes";
import BuyerRoutes from "./BuyerRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import SellerRoutes from "./SellerRoutes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
                loader: () => fetch('http://localhost:5000/category')
            },
            {
                path: '/category/:id',
                element: <ProtectedRoutes><ProductByCategory></ProductByCategory></ProtectedRoutes>,
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`)
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
                path: '/dashboard',
                element: <ProtectedRoutes><UserDashboard></UserDashboard></ProtectedRoutes>
            },
            {
                path: '/dashboard/all-sellers',
                element: <AdminRoutes><AllSellers></AllSellers></AdminRoutes>
            },
            {
                path: '/dashboard/all-buyers',
                element: <AdminRoutes><AllBuyers></AllBuyers></AdminRoutes>
            },
            {
                path: '/dashboard/reported-items',
                element: <AdminRoutes><ReportedItems></ReportedItems></AdminRoutes>
            },
            {
                path: '/dashboard/add-product',
                element: <SellerRoutes><AddProduct></AddProduct></SellerRoutes>
            },
            {
                path: '/dashboard/my-products',
                element: <SellerRoutes><MyProducts></MyProducts></SellerRoutes>
            },
            {
                path: '/dashboard/my-buyers',
                element: <SellerRoutes><MyBuyers></MyBuyers></SellerRoutes>
            },
            {
                path: '/dashboard/my-orders',
                element: <BuyerRoutes><MyOrders></MyOrders></BuyerRoutes>
            }
        ]
    },
    {
        path: '*',
        element: <NotFound></NotFound>
    }
])