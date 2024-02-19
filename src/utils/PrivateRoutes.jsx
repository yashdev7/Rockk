import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';

// Create a context to hold the token value
const AuthTokenContext = createContext();

const PrivateRoutes = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState(null);
    const navigate = useNavigate();
    const authTokens = JSON.parse(localStorage.getItem('authTokens'));
    const accessToken = authTokens?.access_token;
    const refreshToken = authTokens?.refresh_token;
    useEffect(() => {
        const checkToken = async () => {
            try {
                if (!accessToken) {
                    throw new Error('Access token not found in local storage');
                }

                const response = await fetch('http://3.13.185.49/check-token', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                if (response.ok) {
                    setAuthToken(accessToken); // Set the token to state
                } else if (response.status === 401) {
                    const response = await fetch('http://3.13.185.49/check-token', {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${refreshToken}`,
                        },
                    });
                    if (response.message == 'false') {
                        navigate('/login')
                        return
                    }
                    refreshAccessToken();
                    throw new Error('Token is expired');
                } else {
                    throw new Error('Failed to check token');
                }
            } catch (error) {
                console.error('Error checking token:', error);
                if (error.message === 'Token is expired') {
                } else {
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        checkToken();

        // Set interval to refresh token every 15 minutes
        const refreshTokenInterval = setInterval(refreshAccessToken, 15 * 60 * 1000);

        // Cleanup function to clear interval
        return () => clearInterval(refreshTokenInterval);
    }, []);

    const refreshAccessToken = async (refreshToken) => {
        try {
            const response = await fetch('http://3.13.185.49/refresh-token', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log(response);
            if (response.ok) {
                const newTokens = await response.json();
                const newAccessToken = newTokens.access_token;
                setAuthToken(newAccessToken);
                // Update localStorage with new tokens
                localStorage.setItem('authTokens', JSON.stringify({
                    access_token: newAccessToken,
                    refresh_token: refreshToken
                }));
            } else {
                throw new Error('Failed to refresh token');
            }
        } catch (error) {
            console.error('Error refreshing token:', error);
            navigate('/login');
        }
    };


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthTokenContext.Provider value={authToken}>
            <Outlet />
        </AuthTokenContext.Provider>
    );
};

// Custom hook to access the token value
export const useAuthToken = () => useContext(AuthTokenContext);

export default PrivateRoutes;
