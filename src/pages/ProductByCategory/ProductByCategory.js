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

    // Handle Wishlist Product
    const handleWishlist = (wishlistProduct) => {
        // console.log(wishlistProduct);
        const { product_name, resale_price, number } = wishlistProduct;
        const wishList = {
            name: product_name,
            price: resale_price,
            seller_number: number,
            buyer_email: user?.email
        }
        // console.log(wishList);
        fetch('https://resale-ecommerce-server.vercel.app/wishlist', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(wishList)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Product Added to Wishlist');
                } else {
                    toast.error(data.message);
                }
            })
    }

    const handleBooking = (bookingProduct) => {
        // console.log('booking data', bookingProduct);
        fetch('https://resale-ecommerce-server.vercel.app/booking', {
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

    const handleReportProduct = (id) => {
        // console.log(id);
        // TODO: - Report To Admin
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
                            handleWishlist={handleWishlist}
                            handleReportProduct={handleReportProduct}
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