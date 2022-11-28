import React from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';

const ProductByCategory = () => {
    const products = useLoaderData();
    return (
        <section className='category-product my-5'>
            <div className="container">
                <div className="row">
                    {
                        products.map(product => <ProductCard
                            key={product?._id}
                            product={product}
                        ></ProductCard>)
                    }
                </div>
            </div>
        </section>
    );
};

export default ProductByCategory;