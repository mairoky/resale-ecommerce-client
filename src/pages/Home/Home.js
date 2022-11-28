import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useLoaderData } from 'react-router-dom';
import AdvertiseProductCard from '../../components/AdvertiseProductCard/AdvertiseProductCard';
import Banner from '../../components/Banner/Banner';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import Loader from '../../components/Loader/Loader';
import './Home.css';

const Home = () => {
    const category = useLoaderData();

    const { data: products = [], isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/products');
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
        console.log(id);
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
        </div>
    );
};

export default Home;