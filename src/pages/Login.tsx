import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../services/authServices'; // Adjust the import path as needed
import { AppDispatch, RootState } from '../store/store';

const validationSchema = Yup.object({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required'),
});

const initialValues = {
    username: '',
    password: '',
};

const Login = () => {
    const dispatch = useDispatch<AppDispatch>();
    const error = useSelector((state: RootState) => state.auth.error)

    const handleSubmit = (values: typeof initialValues) => {
        dispatch(login(values));
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
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                {error && <div className=" text-red-600">{error}</div>}
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form>
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
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    className="input input-bordered w-full"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-600 text-sm" />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                            >
                                Login
                            </button>
                            <a
                                href='/register'
                                className="btn btn-primary w-full mt-3"
                            >
                                Register
                            </a>
                        </Form>
                    )}
                </Formik>
            </div>
            </div>
        </div>
    );
};

export default Login;
