import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';

// TODO: Social Login
const Signup = () => {
    // Get AuthContext Data
    const { createUser, socialLogin, updateUserProfile, setLoading } = useContext(AuthContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [userEmail, setUserEmail] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [token] = useToken(userEmail);
    if (token) {
        navigate(from, { replace: true });
    }

    // Handle Signup Form
    const handleSignup = (data) => {
        // console.log('form data', data);
        const { name, email, password, role } = data;
        createUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                toast.success(`${name} your ${role} account created successfully.`);
                handleProfileUpdate(name, email, role);
                reset();

            })
            .catch(err => {
                console.error(err.message);
                toast.error(err.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    // Update user profile
    const handleProfileUpdate = (name, email, role) => {
        const profile = {
            displayName: name,
        }
        updateUserProfile(profile)
            .then(() => {
                saveUserToDB(name, email, role);
            })
            .catch(err => console.error(err));
    }

    // Handle Google Login
    const handleGoogleLogIn = () => {

    }

    // Save user to the Database
    const saveUserToDB = (name, email, role) => {
        const user = {
            name,
            email,
            role
        };
        fetch('http://localhost:5000/users', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setUserEmail(email);
            })
    }


    return (
        <div className='my-5'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-7 col-12 m-auto">
                        <div className="card border-0 py-4">
                            <form onSubmit={handleSubmit(handleSignup)}>
                                <div className="card-body">
                                    <div className="text-center">
                                        <h3>Create Account</h3>
                                    </div>
                                    <hr />
                                    <div className="form-group mt-2">
                                        <label htmlFor="role">Select your role</label>
                                        <select {...register('role')} className="form-select" id='role' defaultValue={'buyer'}>
                                            <option value="buyer">Buyer</option>
                                            <option value="seller">Seller</option>
                                        </select>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="name">Name</label>
                                        <input {...register('name', {
                                            required: "Name is Required."
                                        })} type="text" id="name" className="form-control" />
                                        {errors.name && <p className='text-danger m-0'>{errors.name.message}</p>}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="email">Email</label>
                                        <input {...register('email')} type="email" id="email" className="form-control" />
                                        {errors.email && <p className='text-danger m-0'>{errors.email.message}</p>}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="password">Password</label>
                                        <input {...register('password')} type="password" id="password" className="form-control" required />
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="w-50 btn btn-dark mt-3">Register</button>
                                        <Link to="/login" className="d-block mt-2">Already have an Account? <strong>Login Now</strong></Link>
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

export default Signup;