import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loader from '../../../../components/Loader/Loader';
import Table from 'react-bootstrap/Table';
import { FaTrash } from 'react-icons/fa';
import DeleteConfirmationModal from '../../../../components/DeleteConfirmationModal/DeleteConfirmationModal';
import toast from 'react-hot-toast';

const AllBuyers = () => {
    const [deletingBuyer, setDeletingBuyer] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setDeletingBuyer(null);
        setShow(false);
    };


    // Load Buyers Data
    const { data: buyers = [], refetch, isLoading } = useQuery({
        queryKey: ['buyers'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/users/buyers');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.error(error);
            }
        }
    });

    const handleDelete = (buyer) => {
        // console.log(buyer);
        fetch(`http://localhost:5000/users/${buyer?._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    toast.success(`Buyer ${buyer?.name} Deleted Successfully.`);
                    refetch();
                }
            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='container mt-5'>
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
                        buyers.map((buyer, idx) => <tr key={buyer?._id}>
                            <td>{idx + 1}</td>
                            <td>{buyer?.name}</td>
                            <td>{buyer?.email}</td>
                            <td><button onClick={() => {
                                setDeletingBuyer(buyer);
                                setShow(true);
                            }} className='btn btn-outline-danger btn-sm'><FaTrash /></button></td>
                        </tr>)
                    }
                </tbody>
            </Table>
            {
                deletingBuyer && <DeleteConfirmationModal
                    title={`Are you sure you want to delete ${deletingBuyer?.name}?`}
                    message={`Remember If you delete. It cannot be undone.`}
                    action={handleDelete}
                    modalData={deletingBuyer}
                    show={show}
                    handleClose={handleClose}
                >
                </DeleteConfirmationModal>
            }
        </div>
    );
};

export default AllBuyers;