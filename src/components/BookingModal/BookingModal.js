import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

const BookingModal = ({ user, product, show, handleClose, handleBooking }) => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    // Handle Booking Modal
    const handleBookingModal = (data) => {
        const bookingProduct = {
            buyer_name: user?.displayName,
            buyer_email: user?.email,
            product_id: product?._id,
            product_name: product?.product_name,
            product_image: product?.product_image,
            product_price: product?.resale_price,
            buyer_number: data.number,
            buyer_location: data.location,
            booking_time: new Date().toLocaleString()
        }
        handleBooking(bookingProduct);
        reset();
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Booked your Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(handleBookingModal)}>
                    <div className="form-group mt-2">
                        <label htmlFor="name">Name</label>
                        <input {...register('name')} type="text" id="name" className="form-control" defaultValue={user?.displayName} disabled />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="email">Email</label>
                        <input {...register('email')} type="email" id="email" className="form-control" defaultValue={user?.email} disabled />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="product_name">Product Name</label>
                        <input {...register('product_name')} type="text" id="product_name" className="form-control" defaultValue={product?.product_name} disabled />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="product_price">Product Price</label>
                        <input {...register('product_price')} type="text" id="product_price" className="form-control" defaultValue={product?.resale_price} disabled />
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="number">Number</label>
                        <input {...register('number')} type="text" id="number" className="form-control" />
                        {errors.number && <p className='text-danger m-0'>{errors.number.message}</p>}
                    </div>
                    <div className="form-group mt-2">
                        <label htmlFor="location">Location</label>
                        <input {...register('location')} type="text" id="location" className="form-control" />
                        {errors.location && <p className='text-danger m-0'>{errors.location.message}</p>}
                    </div>

                    <div className="text-center">
                        <button type="submit" className="w-50 btn btn-dark mt-2">Submit</button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    );
};

export default BookingModal;