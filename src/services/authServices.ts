import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { Dispatch } from 'redux';
import { setCredentials, logout, setLoading, setError } from '../store/reducers/authReducers';
import { jwtDecode } from 'jwt-decode';

export const BASE_URL = 'http://localhost:5000/api/';

interface Credentials {
    username: string;
    password: string;
}

interface UserData {
    name: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface Token {
    id: string;
    name: string;
    username: string;
    email: string;
    exp: number;
    [key: string]: any;
}

const getTokenFromCookie = (): string | undefined => {
    return Cookies.get('token');
};

export const login = (credentials: Credentials) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`${BASE_URL}login`, credentials, {
            withCredentials: true
        });
        const token = getTokenFromCookie();
        if (token) {
            dispatch(setCredentials({ token }));
        } else {
            console.warn('Token not found in cookies after login');
        }
        dispatch(setLoading(false));
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Login failed:', error.response?.data);
            dispatch(setError('Login failed: ' + (error.response?.data.message || 'Unknown error')));
        } else {
            console.error('Login failed:', (error as Error).message);
            dispatch(setError('Login failed: ' + (error as Error).message));
        }

        dispatch(setLoading(false));
    }
};

export const register = (userData: UserData) => async (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`${BASE_URL}register`, userData, {
            withCredentials: true
        });
        const token = getTokenFromCookie();
        if (token) {
            dispatch(setCredentials({ token }));
        } else {
            console.warn('Token not found in cookies after registration');
        }
        dispatch(setLoading(false));
        return response.data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Register failed:', error.response?.data);
            dispatch(setError('Register failed: ' + (error.response?.data.message || 'Unknown error')));
        } else {
            console.error('Register failed:', (error as Error).message);
            dispatch(setError('Register failed: ' + (error as Error).message));
        }

        dispatch(setLoading(false));
    }
};

export const checkTokenExpiration = () => (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    const token = getTokenFromCookie();
    if (token) {
        const decoded = jwtDecode<Token>(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
            dispatch(logout());
            Cookies.remove('token');
        } else {
            dispatch(setCredentials({ token }));
        }
    }
    dispatch(setLoading(false));
};

export const logoutApp = () => (dispatch: Dispatch) => {
    dispatch(setLoading(true));
    Cookies.remove('token');
    dispatch(logout());
    dispatch(setLoading(false));
};
