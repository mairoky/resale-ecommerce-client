import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { MdVerifiedUser, MdFavoriteBorder, MdReportProblem } from 'react-icons/md';
import './ProductCard.css';

const ProductCard = ({ product, setProduct, setShow, handleWishlist, handleReportProduct }) => {
    // console.log(product);
    const { _id, product_name, product_image, original_price, resale_price, location, seller_name, seller_email, purchase_year, number, createdAt } = product;

    const { data: seller = [] } = useQuery({
        queryKey: ['seller', seller_email],
        queryFn: async () => {
            try {
                const res = await fetch(`http://localhost:5000/users/${seller_email}`);
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.error(error);
            }
        }
    });

    return (
        <div className='col-md-6 col-12'>
            <div className="product-card p-3 d-flex align-items-center rounded">
                <div className="col-md-6 col-12">
                    <div className="product-image rounded">
                        <img className='img-fluid' src={product_image} alt="" />
                    </div>
                    <div className='mt-2 d-flex justify-content-between'>
                        <div>
                            <h5
                                className='m-0'>
                                {seller_name}
                                {
                                    seller?.seller_status === 'verified' &&
                                    <MdVerifiedUser className='ms-2 verify-icon' />
                                }
                            </h5>
                            <p className='m-0'>{number}</p>
                        </div>

                    </div>
                </div>
                <div className="col-md-6 col-12 text-center">
                    <div className="product-info">
                        <h5>{product_name}</h5>
                        <p className='m-0'>Purchase Date: {purchase_year}</p>
                        <p className='m-0 fw-semibold'>Buying Price: {original_price}</p>
                        <p className='m-0 fw-semibold'>Selling Price: {resale_price}</p>
                        <p className='m-0'>Location: {location}</p>
                        <div className='mt-2'>
                            <button
                                onClick={() => handleReportProduct(_id)}
                                className='btn btn-sm btn-danger me-2'>
                                <MdReportProblem />
                            </button>
                            <button
                                onClick={() => handleWishlist(product)}
                                className='btn btn-sm btn-outline-danger me-2'>
                                <MdFavoriteBorder />
                            </button>
                            <button
                                onClick={() => {
                                    setProduct(product);
                                    setShow(true);
                                }}
                                className="btn btn-outline-dark">
                                Book Now
                            </button>
                        </div>
                        <div>
                            <p className='m-0'><small>Posted: {createdAt}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;