import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = () => {
    return (
        <div className='col-md-6 col-12'>
            <div className="row">
                <div className="col-md-6 col-12">
                    <div className="product-image">
                        <img src="" alt="" />
                    </div>
                </div>
                <div className="col-md-6 col-12 text-center">
                    <div className="product-card">
                        <h3>Name</h3>
                        <h5>Price: </h5>
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