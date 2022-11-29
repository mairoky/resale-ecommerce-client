import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/AuthProvider';
import toast from 'react-hot-toast';
import useToken from '../../hooks/useToken';
// TODO: SocialLogin
const Login = () => {

    // Get Auth Context Data
    const { loginUser, socialLogin, setLoading } = useContext(AuthContext);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [loginUserEmail, setLoginUserEmail] = useState('');

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const [token] = useToken(loginUserEmail);
    if (token) {
        navigate(from, { replace: true });
    }

    // Handle Login Form
    const handleLogin = (data) => {
        // console.log(data);
        const { email, password } = data;
        loginUser(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                setLoginUserEmail(email);
                // navigate(from, { replace: true });
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
    // Handle Google Login
    const handleGoogleLogIn = () => {

    }


    return (
        <div className='my-5'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-7 col-12 m-auto">
                        <div className="card border-0 py-4">
                            <form onSubmit={handleSubmit(handleLogin)}>
                                <div className="card-body">
                                    <div className="text-center">
                                        <h3>Login</h3>
                                    </div>
                                    <hr />
                                    <div className="form-group mt-2">
                                        <label htmlFor="email">Email</label>
                                        <input {...register('email', { required: 'Email is Required.' })} type="email" id="email" className="form-control" />
                                        {errors.email && <p className='text-danger m-0'>{errors.email.message}</p>}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="password">Password</label>
                                        <input {...register('password', { required: 'Password is Required.' })} type="password" id="password" className="form-control" />
                                        {errors.password && <p className='text-danger m-0'>{errors.password.message}</p>}
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="w-50 btn btn-dark mt-3">Login</button>
                                        <Link to="/signup" className="d-block mt-2">Don't have Account? <strong>Signup Now</strong></Link>
                                    </div>
                                    <hr />
                                    <div className="text-center">
                                        <Link onClick={handleGoogleLogIn} className="w-50 btn btn-outline-dark"><FaGoogle /> Login with Google</Link>
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