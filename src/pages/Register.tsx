import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../services/authServices';
import { AppDispatch, RootState } from '../store/store';

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required'),
    username: Yup.string()
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), ''], 'Passwords must match')
        .required('Confirm Password is required'),
});

const initialValues = {
    name: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};

const Register = () => {
    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector((state: RootState) => state.auth.error)

    const handleSubmit = (values: typeof initialValues) => {
        dispatch(register(values));
    };

    return (
        <div
            className="hero min-h-screen"
            style={{
                backgroundImage: "url(https://images3.alphacoders.com/112/thumb-1920-1120397.png)",
            }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className=' w-full p-4'>
                <div className=" md:w-[25rem] w-full mx-auto p-4 bg-white border shadow-md rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">Register</h1>
                    {error && <div className=" text-red-600">{error}</div>}
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {() => (
                            <Form>
                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Name</label>
                                    <Field
                                        id="name"
                                        name="name"
                                        type="text"
                                        className="input input-bordered w-full"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-red-600 text-sm" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                                    <Field
                                        id="username"
                                        name="username"
                                        type="text"
                                        className="input input-bordered w-full"
                                    />
                                    <ErrorMessage name="username" component="div" className="text-red-600 text-sm" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="input input-bordered w-full"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-600 text-sm" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                    <Field
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="input input-bordered w-full"
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                    <Field
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        className="input input-bordered w-full"
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-600 text-sm" />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary w-full"
                                >
                                    Register
                                </button>
                                <a
                                    href='/login'
                                    className="btn btn-primary w-full mt-3"
                                >
                                    Login
                                </a>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Register;
