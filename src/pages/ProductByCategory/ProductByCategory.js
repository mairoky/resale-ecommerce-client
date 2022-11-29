import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import BookingModal from '../../components/BookingModal/BookingModal';
import ProductCard from '../../components/ProductCard/ProductCard';
import { AuthContext } from '../../context/AuthProvider';


const ProductByCategory = () => {
    const { user } = useContext(AuthContext);
    const products = useLoaderData();
    const [product, setProduct] = useState(null);
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setProduct(null);
        setShow(false);
    };
    const navigate = useNavigate();

    const handleBooking = (bookingProduct) => {
        // console.log('booking data', bookingProduct);
        fetch('http://localhost:5000/booking', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(bookingProduct)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    setProduct(null);
                    toast.success('Your Booking Confirmed.');
                    navigate('/dashboard/my-orders');
                } else {
                    toast.error(data.message);
                }
            })
    }

    return (
        <section className='category-product my-5'>
            <div className="container">
                <div className="row">
                    {
                        products.map(product => <ProductCard
                            key={product?._id}
                            product={product}
                            setProduct={setProduct}
                            setShow={setShow}
                        ></ProductCard>)
                    }
                </div>
            </div>
            {
                product && <BookingModal
                    user={user}
                    product={product}
                    handleClose={handleClose}
                    show={show}
                    handleBooking={handleBooking}
                ></BookingModal>
            }
        </section>
    );
};

export default ProductByCategory;