import React from 'react';
import './CategoryCard.css';

const CategoryCard = ({ ctr, handleCategory }) => {
    const { _id, category_name, category_image } = ctr;
    return (
        <div className='col-lg-3 col-md-6 col-12'>
            <div onClick={() => handleCategory(_id)} className="category-card border-0 rounded py-3 d-flex justify-content-evenly align-items-center">
                <img className='img-fluid rounded-circle w-25 h-25' src={category_image} alt="" />
                <h4>{category_name}</h4>
            </div>
        </div>
    );
};

export default CategoryCard;