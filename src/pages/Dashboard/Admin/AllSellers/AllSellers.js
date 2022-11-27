import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import Loader from '../../../../components/Loader/Loader';

const AllSellers = () => {
    const [deletingSeller, setDeletingSeller] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setDeletingSeller(null);
        setShow(false);
    };

    // Load Sellers Data
    const { data: sellers = [], refetch, isLoading } = useQuery({
        queryKey: ['sellers'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/users/sellers');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.error(error);
            }
        }
    });

    const handleDelete = (seller) => {
        // console.log(seller);
        fetch(`http://localhost:5000/users/${seller?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                if (data.deletedCount > 0) {
                    toast.success(`Buyer ${seller?.name} Deleted Successfully.`);
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='container mt-5'>
            <h5>Sellers List</h5>
            <Table responsive striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        sellers.map((seller, idx) => <tr key={seller?._id}>
                            <td>{idx + 1}</td>
                            <td>{seller?.name}</td>
                            <td>{seller?.email}</td>
                            <td><button onClick={() => {
                                setDeletingSeller(seller);
                                setShow(true);
                            }} className='btn btn-outline-danger btn-sm'><FaTrash /></button></td>
                        </tr>)
                    }
                </tbody>
            </Table>
            {
                deletingSeller && <DeleteConfirmationModal
                    title={`Are you sure you want to delete ${deletingSeller?.name}?`}
                    message={`Remember If you delete. It cannot be undone.`}
                    action={handleDelete}
                    modalData={deletingSeller}
                    show={show}
                    handleClose={handleClose}
                >
                </DeleteConfirmationModal>
            }
        </div>
    );
};

export default AllSellers;