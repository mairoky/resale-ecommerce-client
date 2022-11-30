import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import AdvertiseProductCard from '../../components/AdvertiseProductCard/AdvertiseProductCard';
import Banner from '../../components/Banner/Banner';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Loader from '../../components/Loader/Loader';
import './Home.css';

const Home = () => {
    const category = useLoaderData();
    const navigate = useNavigate();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('https://resale-ecommerce-server.vercel.app/products');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.error(error);
            }

        }
    });

    // Handle Category Click
    const handleCategory = (id) => {
        navigate(`/category/${id}`);
    }

    if (isLoading) {
        return <Loader></Loader>
    }
    return (
        <div className='home'>
            <section className='banner'>
                <Banner />
            </section>
            {
                products && <section className='advertise my-5'>
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 text-end">
                                <h2>Featured Motor Bike <br />Only For You</h2>
                            </div>
                            <div className="col-lg-6">
                                <p className='m-0'>Product advertising promotes a brand's specific product rather than the brand itself. These advertisements focus on selling products based on their features..</p>
                            </div>
                        </div>
                        <div className="row mt-5">
                            {products.map(product => <AdvertiseProductCard
                                key={product?._id}
                                product={product}>
                            </AdvertiseProductCard>)}
                        </div>
                    </div>
                </section>
            }
            <section className='category py-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-md-7 m-auto text-center">
                            <h2>Explore Our Popular Category</h2>
                            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                        </div>
                    </div>
                    <div className="row g-3 mt-3">
                        {
                            category.map(ctr => <CategoryCard
                                key={ctr?._id}
                                ctr={ctr}
                                handleCategory={handleCategory}
                            >
                            </CategoryCard>)
                        }
                    </div>
                </div>
            </section>
            <section className="register py-5">
                <div className="container">
                    <div className="reg-container">
                        <div className="row p-5 align-items-lg-center">
                            <div className="col-lg-7 col-md-12 col-12 text-lg-start text-center">
                                <div className="section-heading">
                                    <h1 >Everyday New Product.<br />
                                        Ready to Buy & Sell?</h1>
                                    <h4>Get items delivered to your doorstep.</h4>
                                </div>
                            </div>
                            <div className="col-lg-5 col-md-12 col-12 text-lg-end text-center">
                                <Link to="/signup">
                                    <button className="btn btn-outline-dark fw-semibold py-2 px-4">Join Now</button>
                                </Link>

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div >
    );
};

export default Home;