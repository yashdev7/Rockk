import React, { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import AuthContext from '../../AuthContext/AuthContext';
import Marketing from '../Marketing/Marketing';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state && location.state.successMessage;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await loginUser(e);

      if (response && response.status === 200 && response.message && response.message[0] && response.message[0].access_token) {
        const { access_token, refresh_token } = response.message[0];
        localStorage.setItem('accessToken', access_token);
        localStorage.setItem('refreshToken', refresh_token);
        navigate('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const handleTryForFree = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    navigate('/forgotpassword');
  };

  return (
    <>
      {successMessage && (
        <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
          <Alert variant="success" onClose={() => console.log('Alert closed')} dismissible>
            <Alert.Heading>{successMessage}</Alert.Heading>
          </Alert>
        </div>
      )}
      <div className="d-flex flex-column flex-md-row " style={{ minHeight: '100vh' }}>
        <div className="col-md-6 m-3 d-flex align-items-center justify-content-center flex-column">
          <div className="h3 d-flex align-items-center justify-content-center ">Timesheets Login</div>
          <div className="p-4 border rounded bg-white shadow-sm w-50">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2" controlId="loginFormEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name="email" value={formData.email} onChange={handleInputChange} />
              </Form.Group>

              <Form.Group className="mb-2" controlId="loginFormPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" value={formData.password} onChange={handleInputChange} />
              </Form.Group>
              <input type="submit" value="Login" className="btn btn-dark bg-primary" />
              <div className="h6 m-3 text-decoration-underline" onClick={handleForgotPassword}>Forgot your password</div>
            </Form>
          </div>
          <div className="d-flex justify-content-center align-items-center m-2">
            <div className="h6">Not a Customer? </div>
            <Button variant="dark" type="button" className="m-2 bg-primary" onClick={handleTryForFree}>
              Try for Free
            </Button>
          </div>
        </div>
        <div className=" bg-white d-flex flex-column justify-content-center align-items-center">
          <Marketing />
        </div>
      </div>
    </>
  );
};

export default Login;
