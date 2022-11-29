import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import { AuthContext } from '../../../../context/AuthProvider';

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const { data: booking = [], refetch, isLoading } = useQuery({
        queryKey: ['booking', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/booking/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    const handlePayment = () => {

    }
    return (
        <div className='mt-5'>
            <div className="container">
                <h5>My Orders</h5>
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            booking.map((product, idx) => <tr key={product?._id}>
                                <td>{idx + 1}</td>
                                <td>{product?.product_name}</td>
                                <td>{product?.product_price}</td>
                                <td>
                                    <button
                                        onClick={() => handlePayment()}
                                        className='btn btn-outline-danger btn-sm'>
                                        Pay
                                    </button>
                                </td>
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