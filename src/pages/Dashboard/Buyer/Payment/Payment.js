import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
    const product = useLoaderData();
    // console.log(product);
    // const navigation = useNavigation();
    // if (navigation.state === "loading") {
    //     return <Loader></Loader>
    // }
    return (
        <div className='my-5'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-7 col-12 m-auto">
                        <div className="card border-0 py-4">
                            <div className="card-body">
                                <div className="text-center">
                                    <h3>Payment</h3>
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="name">Product Name</label>
                                    <input type="text" id="name" className="form-control" defaultValue={product?.product_name} disabled />
                                </div>
                                <div className="form-group mt-2">
                                    <label htmlFor="price">Price</label>
                                    <input type="text" id="price" className="form-control" defaultValue={product?.product_price} disabled />
                                </div>
                                <div className='mt-3'>
                                    <Elements stripe={stripePromise}>
                                        <CheckoutForm product={product} />
                                    </Elements>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;