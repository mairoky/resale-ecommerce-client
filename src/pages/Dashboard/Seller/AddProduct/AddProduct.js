import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loader from '../../../../components/Loader/Loader';
import { AuthContext } from '../../../../context/AuthProvider';

const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const imgbbHostKey = process.env.REACT_APP_IMGBB_API_KEY;
    const freeImageHost = process.env.REACT_APP_IMAGE_HOST_API_KEY;

    // Load Category
    const { data: category = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: async () => {
            try {
                const res = await fetch('http://localhost:5000/category');
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.error(error);
            }
        }
    });

    const handleAddProduct = (data) => {
        // console.log(data);
        const createdAt = new Date().toLocaleDateString();
        const image = data.product_image[0];
        // console.log(image);
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgbbHostKey}`;
        // const url = `https://freeimage.host/api/1/upload/?key=${freeImageHost}`;

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                // console.log(imgData);
                if (imgData.success) {
                    // console.log(imgData.data.url);
                    const product = {
                        product_name: data.product_name,
                        original_price: data.original_price,
                        resale_price: data.resale_price,
                        product_image: imgData.data.url,
                        description: data.description,
                        location: data.location,
                        number: data.number,
                        product_category_id: data.product_category_id,
                        product_condition: data.product_condition,
                        purchase_year: data.purchase_year,
                        seller_name: user?.displayName,
                        seller_email: user?.email,
                        status: 'Available',
                        createdAt: createdAt
                    }
                    // Save Product data to the DB
                    fetch('http://localhost:5000/products', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('accessToken')}`
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(result => {
                            // console.log(result);
                            toast.success(`Product: ${data.product_name} is added successfully`);
                            reset();
                            navigate('/dashboard/my-products');
                        })
                }
            })
    }

    if (isLoading) {
        return <Loader></Loader>
    }

    return (
        <div className='my-5'>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-7 col-12 m-auto">
                        <div className="card border-0 py-4">
                            <form onSubmit={handleSubmit(handleAddProduct)}>
                                <div className="card-body">
                                    <div className="text-center">
                                        <h3>Add Your Product</h3>
                                    </div>
                                    <hr />
                                    <div className="form-group mt-2">
                                        <label htmlFor="product_name">Product Name</label>
                                        <input {...register('product_name', { required: 'Name is Required.' })} type="text" id="product_name" className="form-control" />
                                        {errors.product_name && <p className='text-danger m-0'>{errors.product_name.message}</p>}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="original_price">Product Original Price</label>
                                        <input {...register('original_price', { required: 'Price is Required.' })} type="text" id="original_price" className="form-control" />
                                        {errors.original_price && <p className='text-danger m-0'>{errors.original_price.message}</p>}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="resale_price">Product Resale Price</label>
                                        <input {...register('resale_price', { required: 'Price is Required.' })} type="text" id="resale_price" className="form-control" />
                                        {errors.resale_price && <p className='text-danger m-0'>{errors.resale_price.message}</p>}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="product_condition">Choose Product Condition</label>
                                        <select {...register('product_condition')} className="form-select" id='product_condition' defaultValue={'good'}>
                                            <option value="excellent">Excellent</option>
                                            <option value="good">Good</option>
                                            <option value="fair">Fair</option>
                                        </select>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="purchase_year">Purchase Year</label>
                                        <input {...register('purchase_year', { required: 'Purchase Year is Required.' })} type="date" id="purchase_year" className="form-control" />
                                        {errors.purchase_year && <p className='text-danger m-0'>{errors.purchase_year.message}</p>}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="product_category_id">Choose Product Category</label>
                                        <select {...register('product_category_id', { required: 'Category is Required.' })} className="form-select" id='product_category_id'>
                                            {
                                                category.map(ctr => <option
                                                    key={ctr?._id}
                                                    value={ctr?._id}
                                                >{ctr?.category_name}
                                                </option>)
                                            }
                                        </select>
                                        {errors.product_category_id && <p className='text-danger m-0'>{errors.product_category_id.message}</p>}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="product_image" className="form-label">Upload Product Image</label>
                                        <input {...register('product_image', { required: 'Image is Required.' })} className="form-control" type="file" id="product_image" />
                                        {errors.product_image && <p className='text-danger m-0'>{errors.product_image.message}</p>}
                                    </div>
                                    <div className="form-group mt-2">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                placeholder="Product Description"
                                                id="description"
                                                {...register('description')}
                                                style={{ height: 100 }} required />
                                            <label htmlFor="description">Details of Product</label>
                                        </div>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="number">Mobile Number</label>
                                        <input {...register('number', { required: 'Number is Required.' })} type="text" id="number" className="form-control" />
                                        {errors.number && <p className='text-danger m-0'>{errors.number.message}</p>}
                                    </div>
                                    <div className="form-group mt-2">
                                        <label htmlFor="location">Location</label>
                                        <input {...register('location', { required: 'Location is Required.' })} type="text" id="location" className="form-control" />
                                        {errors.location && <p className='text-danger m-0'>{errors.location.message}</p>}
                                    </div>
                                    <div className="text-end">
                                        <button type="submit" className="w-50 btn btn-dark mt-3">Add Product</button>
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

export default AddProduct;