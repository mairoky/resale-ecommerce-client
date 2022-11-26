import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <section className='page-note-found'>
            <div className="d-flex justify-content-center align-items-center h-100 w-100 content-box">
                <div className="content-box-404 text-center">
                    <h1 className='m-0'>404</h1>
                    <h3 className='m-0'>Look like you're lost!</h3>
                    <p>The page you are looking for not available!</p>
                    <Link to="/" className="link-404 btn btn-dark">Go to Home</Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;