import React, { useState, useEffect } from 'react';
import { getCookie, setCookie, removeCookie } from './cookieService';

const refreshToken = async (expiredToken) => {
    try {
        const response = await fetch('http://3.13.185.49/refresh-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: expiredToken }),
        });

        if (response.ok) {
            const { newToken } = await response.json();
            return newToken;
        } else {
            throw new Error('Token refresh failed');
        }
    } catch (error) {
        throw new Error('Error refreshing token:', error);
    }
};

const handleToken = () => {
    const [token, setToken] = useState('');

    useEffect(() => {
        const storedToken = getCookie('jwtToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await fetch('http://3.13.185.49/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({}),
            });

            if (response.ok) {
                const { token } = await response.json();
                setCookie('jwtToken', token);
                setToken(token);
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const handleLogout = () => {
        removeCookie('jwtToken');
        setToken('');
    };
    useEffect(() => {
        const checkTokenExpiration = async () => {
            try {
                const response = await fetch('http://3.13.185.49/check-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token }),
                });

                if (response.ok) {
                    const { isTokenExpired } = await response.json();

                    if (isTokenExpired) {
                        const newToken = await refreshToken(token);
                        setCookie('jwtToken', newToken);
                        setToken(newToken);
                    }
                } else {
                    throw new Error('Token check failed');
                }
            } catch (error) {
                console.error('Error checking token:', error);
            }
        };

        checkTokenExpiration();
    }, [token]);


    return (
        <div>
            {token ? (
                <div>
                    <p>Welcome! Your JWT Token: {token}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Login</button>
            )}
        </div>
    );
};

export default handleToken;
