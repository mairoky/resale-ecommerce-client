import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaTwitter, FaInstagram } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <div className="footer-top py-4">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="about text-center mb-4">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt velit, ratione magni ad quos doloremque accusantium doloribus tempore in sit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt velit, ratione magni ad quos doloremque accusantium doloribus tempore in sit.</p>
                                <div className="social-media">
                                    <ul className='list-inline'>
                                        <li>
                                            <Link to="/"><FaFacebook /></Link>
                                        </li>
                                        <li>
                                            <Link to="/"><FaInstagram /></Link>
                                        </li>
                                        <li>
                                            <Link to="/"><FaTwitter /></Link>
                                        </li>
                                        <li>
                                            <Link to="/"><FaYoutube /></Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="footer-info-single">
                                <h5>Help Center</h5>
                                <ul className="list-unstyled">
                                    <li><Link to="/">How to Pay</Link></li>
                                    <li><Link to="/">FAQ's</Link></li>
                                    <li><Link to="/">Sitemap</Link></li>
                                    <li><Link to="/">Delivery Info</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="footer-info-single">
                                <h5>Information</h5>
                                <ul className="list-unstyled">
                                    <li><Link to="/">About Us</Link></li>
                                    <li><Link to="/">FAQ's</Link></li>
                                    <li><Link to="/">Sell Your Items</Link></li>
                                    <li><Link to="/">Contact Us</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="footer-info-single">
                                <h5>Security &amp; privacy</h5>
                                <ul className="list-unstyled">
                                    <li><Link to="/">Terms Of Use</Link></li>
                                    <li><Link to="/">Privacy Policy</Link></li>
                                    <li><Link to="/">Return / Refund Policy</Link></li>
                                    <li><Link to="/">Store Locations</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-12">
                            <div className="footer-info-single">
                                <h5>Payment</h5>
                                <p>Sample HTML page with Twitter's Bootstrap. Code example of Easy Sticky Footer using HTML, Javascript, jQuery, and CSS.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-bottom py-3">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <p className="text-center m-0">Copyright © 2023. ReBuy Bike.</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;