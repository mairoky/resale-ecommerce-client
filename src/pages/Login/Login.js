import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Login = () => {
    // Handle Login Form
    const handleLogin = () => {

    }
    // Handle Google Login
    const handleGoogleLogIn = () => {

    }
    return (
        <div className='my-5'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-7 col-12 m-auto">
                        <div className="card border-0 py-4">
                            <form onSubmit={handleLogin}>
                                <div className="card-body">
                                    <div className="text-center">
                                        <h3>Login</h3>
                                    </div>
                                    <hr />
                                    <div className="form-group mt-2">
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" name="email" className="form-control" required />
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" name="password" className="form-control" required />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="w-50 btn btn-dark mt-3">Register</button>
                                        <Link to="/signup" className="d-block mt-2">Don't have Account?<span> <strong>Signup Now</strong></span></Link>
                                    </div>
                                    <hr />
                                    <div className="text-center">
                                        <Link onClick={handleGoogleLogIn} className="w-50 btn btn-outline-dark"><FaGoogle /> Signup with Google</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;