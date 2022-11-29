import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthProvider';
import Table from 'react-bootstrap/Table';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../../../components/Loader/Loader';
import { FaTrash } from 'react-icons/fa';
import toast from 'react-hot-toast';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const { data: products = [], isLoading, refetch } = useQuery({
        queryKey: ['products', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products/${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    // Update Status
    const updateSoldStatus = (product) => {
        fetch(`http://localhost:5000/products/${product?._id}`, {
            method: 'PATCH',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`${product?.product_name} Sales Status Updated.`)
                }
            })
    }
    // Handle Advertise
    const handleAdvertise = (product) => {
        fetch(`http://localhost:5000/products/${product?._id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    refetch();
                    toast.success(`${product?.product_name} Successfully Advertise.`)
                }
            })
    }
    // Handle Delete
    const handleDelete = (product) => {
        fetch(`http://localhost:5000/products/${product?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product?.product_name} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='mt-5'>
            <div className="container">
                <h5>My Products</h5>
                <Table responsive striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Sale Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, idx) => <tr key={product?._id}>
                                <td>{idx + 1}</td>
                                <td>{product?.product_name}</td>
                                <td>{product?.resale_price}</td>
                                <td>{product?.status}</td>
                                <td>
                                    {
                                        product?.status === 'Available' && <button
                                            onClick={() => updateSoldStatus(product)}
                                            className='btn btn-outline-danger btn-sm me-2'>
                                            Update Sales Status
                                        </button>
                                    }
                                    {
                                        product?.status === 'Available' && !product?.advertise && <button
                                            onClick={() => handleAdvertise(product)}
                                            className='btn btn-outline-danger btn-sm me-2'>
                                            Advertise
                                        </button>
                                    }
                                    <button
                                        onClick={() => handleDelete(product)}
                                        className='btn btn-outline-danger btn-sm'>
                                        <FaTrash />
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

export default MyProducts;