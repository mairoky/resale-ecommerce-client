import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product }) => {
    // console.log(product);
    const { _id, product_name, product_image, original_price, resale_price, location, seller_name, purchase_year, number, createdAt } = product;
    return (
        <div className='col-md-6 col-12'>
            <div className="product-card p-3 d-flex align-items-center rounded">
                <div className="col-md-6 col-12">
                    <div className="product-image rounded">
                        <img className='img-fluid' src={product_image} alt="" />
                    </div>
                    <div className='mt-2 d-flex justify-content-between'>
                        <div>
                            <h5 className='m-0'>{seller_name}</h5>
                            <p className='m-0'>{number}</p>
                        </div>
                        <div>
                            <p className='m-0'><small>Posted: {createdAt}</small></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 col-12 text-center">
                    <div className="product-info">
                        <h3>{product_name}</h3>
                        <p>Buying Date: {purchase_year}</p>
                        <h5>Buying Price: {original_price}</h5>
                        <h5>Selling Price: {resale_price}</h5>
                        <h5>Location: {location}</h5>
                        <Link to={``}>
                            <button className="btn btn-outline-dark">Book Now</button>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductCard;