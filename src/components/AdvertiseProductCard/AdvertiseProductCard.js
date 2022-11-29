import React from 'react';
import Card from 'react-bootstrap/Card';

const AdvertiseProductCard = ({ product }) => {
    const { product_name, product_image, product_condition, resale_price } = product;
    return (
        <div className="col-lg-4 col-md-6 col-12">
            <Card className='rounded border-0 position-relative'>
                <Card.Img className='p-3 rounded' variant="top" src={product_image} />
                <Card.Body>
                    <Card.Title className='text-center'>{product_name}</Card.Title>
                    <div className='d-flex justify-content-between'>
                        <p className="fw-semibold">Price: {resale_price} bdt</p>
                        <p>Condition: {product_condition}</p>
                    </div>
                    <div className='advertise-block position-absolute top-0 end-0 p-1 bg-danger rounded text-white'>
                        Advertise Item
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default AdvertiseProductCard;