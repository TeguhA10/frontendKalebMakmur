import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { logoutApp, Token } from '../services/authServices'; // Adjust the import path as needed
import { AppDispatch } from '../store/store';

const Dashboard = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [data, setData] = useState<Token | null>(null);

    useEffect(() => {
        const token = document.cookie
            .split('; ')
            .find(row => row.startsWith('token='))
            ?.split('=')[1];

        if (token) {
            try {
                const decoded: Token = jwtDecode(token);
                setData(decoded);
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, []);

    const handleLogout = () => {
        dispatch(logoutApp());
    };

    return (
        <div>
            <div className="p-4">
                <div className="card bg-base-100 border w-full shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{data ? `Welcome, ${data.name}` : 'Welcome'}</h2>
                        <p>Informatios user: {data?.email}, {data?.username}</p>
                        <p>This application was developed as part of the selection process to meet the requirements for a job application.</p>
                        <div className="card-actions justify-end">
                            <button onClick={handleLogout} className="btn btn-error">Logout!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
