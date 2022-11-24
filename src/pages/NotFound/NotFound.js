import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <section className='page-note-found'>
            <div className="container">
                <div className="row">
                    <div className="col-10 mx-auto">
                        <div>
                            <div className="not-found-bg">
                                <h1 className="text-center">404</h1>
                            </div>
                            <div className="content-box-404 text-center">
                                <h3>Look like you're lost!</h3>
                                <p>The page you are looking for not available!</p>
                                <Link to="/" className="link-404 btn btn-outline-dark">Go to Home</Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;