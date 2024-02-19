import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useState(() => {
    const storedTokens = localStorage.getItem('authTokens');
    return storedTokens ? JSON.parse(storedTokens) : null;
  });
  const [user, setUser] = useState(() => authTokens ? jwtDecode(authTokens.access_token) : null);
  const [loading, setLoading] = useState(true);

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const email = formData.get('email');
      const password = formData.get('password');

      const response = await fetch('http://3.13.185.49/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const responseData = await response.json();
      if (response.ok) {
        const tokenData = responseData.message[0];
        if (tokenData && tokenData.access_token) {
          const { access_token, refresh_token } = tokenData;
          setAuthTokens({ access_token, refresh_token });
          setUser(jwtDecode(access_token));
          localStorage.setItem('authTokens', JSON.stringify({ access_token, refresh_token }));
          navigate('/dashboard');
        } else {
          console.error('Access token not found in the response:', tokenData);
        }
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    navigate('/');
  };

  const updateToken = async () => {
    if (!authTokens || !authTokens.access_token || !isTokenExpired(authTokens.access_token)) {
      if (loading) {
        setLoading(false);
      }
      return;
    }

    try {
      const response = await fetch('http://3.13.185.49/refresh-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: authTokens.refresh_token })
      });

      const data = await response.json();
      if (response.ok && data.access) {
        setAuthTokens({ ...authTokens, access_token: data.access });
        setUser(jwtDecode(data.access));
        localStorage.setItem('authTokens', JSON.stringify({ ...authTokens, access_token: data.access }));
      } else {
        console.error('Failed to refresh token:', data);
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }

    if (loading) {
      setLoading(false);
    }
  };

  const isTokenExpired = (token) => {
    if (authTokens && authTokens.access_token && isTokenExpired(authTokens.access_token)) {
      updateToken();
    }
    if (!token) {
      return true;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  useEffect(() => {
    const storedTokens = localStorage.getItem('authTokens');
    // if (!storedTokens) {
    //   navigate('/login');
    // }
    setLoading(false);
  }, [authTokens, navigate]);

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
