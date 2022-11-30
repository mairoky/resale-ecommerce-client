import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ product }) => {
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);

    const stripe = useStripe();
    const elements = useElements();

    const navigate = useNavigate();

    // console.log(product);
    const { _id, product_price, product_name, buyer_email, product_id } = product;

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch('https://resale-ecommerce-server.vercel.app/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ product_price })
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [product_price]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setCardError(error.message);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setCardError('');
        }
        setProcessing(true);
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: product_name,
                        email: buyer_email
                    },
                },
            },
        );

        if (confirmError) {
            setCardError(confirmError.message);
            return;
        }

        if (paymentIntent.status === "succeeded") {
            // console.log(card);
            // store payment info in the database
            const payment = {
                product_name,
                product_price,
                buyer_email,
                booking_id: _id,
                product_id,
                transaction_id: paymentIntent.id
            }
            fetch('https://resale-ecommerce-server.vercel.app/payments', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data);
                    if (data.insertedId) {
                        toast.success(`Congrats! your payment completed. Your Transaction Id: ${paymentIntent.id}`);
                        navigate('/dashboard/my-orders');
                    }
                })
        }
        setProcessing(false);


    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '18px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {
                    cardError && <p className='m-0 text-danger'>{cardError}</p>
                }
                <button
                    type="submit"
                    className="w-50 btn btn-dark mt-3"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay Now
                </button>
            </form>
        </>

    );
};

export default CheckoutForm;