import { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';
import {registerUser as registerUserAPI, loginUser as loginUserAPI} from '../services/api.js';
import { AuthContext } from './authContext.js';


//authProvider component to wrap the app
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //check for existing token on app load
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken){
            //decode token to get user info
            try{
                const decoded = jwtDecode(storedToken);
            
            //check if token is expired
            if (decoded.exp * 1000 < Date.now()) {
                //token expired, clear it
                localStorage.removeItem('token');
                setLoading(false);

            } else {
                //token valid, set user and token
                setToken(storedToken);
                setUser(decoded.user);
                setLoading(false);
            }
        } catch (err) {
            console.error('Error decoding token: ', err);
            localStorage.removeItem('token');
            setLoading(false);
        }
        } else {
            setLoading(false);
        }
    }, []);

    //register user function
     const register = async (name, email, password) => {
    try {
      setError(null);
      setLoading(true);

      // Call API to register user
      const data = await registerUserAPI(name, email, password);

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Decode token to get user info
      const decoded = jwtDecode(data.token);

      // Update state
      setToken(data.token);
      setUser(decoded.user);
      setLoading(false);

      return { success: true };
    } catch (err) {
      const errorMsg = err.response?.data?.errors?.[0]?.msg || 'Registration failed';
      setError(errorMsg);
      setLoading(false);
      return { success: false, error: errorMsg };
    }
  };

    //login user function
    const login = async (email, password) => {
        try {
            setError(null);
            setLoading(true);

            // Call API to login user
            const data = await loginUserAPI(email, password);

            // Store token in localStorage
            localStorage.setItem('token', data.token);

            // Decode token to get user info
            const decoded = jwtDecode(data.token);

            // Update state
            setToken(data.token);
            setUser(decoded.user);
            setLoading(false);

            return { success: true };
        } catch (err) {
            const errorMsg = err.response?.data?.errors?.[0]?.msg || 'Login failed';
            setError(errorMsg);
            setLoading(false);
            return { success: false, error: errorMsg };
        }
    };

    //logout user function
    const logout = () => {
        //clear token from localStorage
        localStorage.removeItem('token');

        //clear state
        setToken(null);
        setUser(null);
        setError(null);
    };

    //context value
    const value = {
        user,
        token,
        loading,
        error,
        register,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
