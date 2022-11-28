import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const AdvertiseProductCard = ({ product }) => {
    const { product_name, product_image, product_condition, resale_price } = product;
    return (
        <div className="col-lg-4 col-md-6 col-12">
            <Card className='rounded border-0'>
                <Card.Img className='p-3 rounded' variant="top" src={product_image} />
                <Card.Body>
                    <Card.Title>{product_name}</Card.Title>
                    <div className='d-flex justify-content-between'>
                        <p className="fw-semibold">Price: {resale_price} bdt</p>
                        <p>Condition: {product_condition}</p>
                    </div>
                    <Link to={``}>
                        <Button variant="outline-dark">Book Now</Button>
                    </Link>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdvertiseProductCard;