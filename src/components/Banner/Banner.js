import React from 'react';
import bannerImage from '../../assets/images/hero-banner.svg';
import './Banner.css';

const Banner = () => {
    return (
        <div className='container py-5'>
            <div className="row align-items-center">
                <div className="col-md-6 col-12 py-5">
                    <div className="banner-content">
                        <h1 className='text-uppercase'>Buy Premium <br /><span> Motor Bike</span></h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, inventore modi mollitia iusto minus voluptate?</p>
                    </div>
                </div>
                <div className="col-md-6 col-12">
                    <div className="banner-img">
                        <img className='img-fluid' src={bannerImage} alt="ReBuy Bike" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Banner;