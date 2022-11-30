import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import Table from 'react-bootstrap/Table';
import toast from 'react-hot-toast';
import Loader from '../../../../components/Loader/Loader';
import { AuthContext } from '../../../../context/AuthProvider';

const MyWishlist = () => {

    const { user } = useContext(AuthContext);
    const { data: wishlist = [], refetch, isLoading } = useQuery({
        queryKey: ['wishlist', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://resale-ecommerce-server.vercel.app/wishlist/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })

    // Handle Remove
    const handleDelete = (id) => {
        fetch(`https://resale-ecommerce-server.vercel.app/wishlist/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.deletedCount > 0) {
                    toast.success(`Remove from Wishlist.`);
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='mt-5'>
            <div className="container">
                <h5>My Wishlist</h5>
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Sale Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            wishlist.map((product, idx) => <tr key={product?._id}>
                                <td>{idx + 1}</td>
                                <td>{product?.name}</td>
                                <td>{product?.price}</td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(product?._id)}
                                        className='btn btn-outline-danger btn-sm'>
                                        Remove
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

export default MyWishlist;