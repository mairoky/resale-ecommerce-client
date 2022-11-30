import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Loader from '../../../../components/Loader/Loader';
import { AuthContext } from '../../../../context/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: booking = [], isLoading, refetch } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/booking/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })


    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='mt-5'>
            <div className="container">
                <h5>My Orders</h5>
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Action</th>
                            <th>Transaction ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking.map((product, idx) => <tr key={product?._id}>
                                <td>{idx + 1}</td>
                                <td><img className='rounded-circle' style={{ width: '50px', height: '50px' }} src={product?.product_image} alt="" /></td>
                                <td>{product?.product_name}</td>
                                <td>{product?.product_price}</td>
                                <td>
                                    {
                                        !product?.paid && <Link to={`/dashboard/payment/${product?._id}`}>
                                            <button
                                                className='btn btn-outline-danger btn-sm'>
                                                Pay
                                            </button>
                                        </Link>
                                    }
                                    {
                                        product?.paid && <button
                                            className='btn btn-sm btn-danger' disabled>Paid</button>
                                    }
                                </td>
                                <td>{product?.transaction_id}</td>
                            </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default MyOrders;