import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import Layout from "../Layouts/Layout";
import Marketing from '../Marketing/Marketing';

const Signup = () => {
    const navigate = useNavigate();
    const [highlightInput, setHighlightInput] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [alertVariant, setAlertVariant] = useState('danger');
    const [alertMessage, setAlertMessage] = useState('');

    const [formData, setFormData] = useState({
        company_name: '',
        name: '',
        lastName: '',
        email: '',
        password: '',
        retype_password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setHighlightInput(false);
        setShowAlert(false);
    };

    const handleLogin = () => {
        navigate('/');
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.retype_password) {
            setHighlightInput(true);
            setShowAlert(true);
            setAlertVariant('danger');
            setAlertMessage("Passwords don't match. Please check and try again.");
            return;
        }

        try {
            const form = new FormData();
            form.append('company_name', formData.company_name);
            form.append('name', formData.name);
            form.append('last_name', formData.lastName);
            form.append('email', formData.email);
            form.append('password', formData.password);

            const response = await fetch('http://3.13.185.49/signup', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            const responseData = await response.json();

            if (response.ok) {
                setAlertVariant('success');
                setAlertMessage('Signup successful! Redirecting to login page...');
                setShowAlert(true);

                setTimeout(() => {
                    navigate('/login', { state: { successMessage: 'Successfully signed up. You can now log in!' } });
                }, 1000);
                console.log('Success');
            } else {
                setAlertVariant('danger');
                setAlertMessage(responseData.message || 'Signup failed. Please try again.');
                setShowAlert(true);
                console.error('Signup failed');
            }
        } catch (error) {
            setAlertVariant('danger');
            setAlertMessage('Error during signup. Please try again.');
            setShowAlert(true);
            console.error('Error during signup:', error);
        }
    };

    return (
        <>
            <Layout>
                {showAlert && (
                    <div style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 100 }}>
                        <Alert variant={alertVariant} onClose={() => setShowAlert(false)} dismissible>
                            <Alert.Heading>{alertMessage}</Alert.Heading>
                        </Alert>
                    </div>
                )}
                <div className="d-flex flex-row " style={{ minHeight: '100vh' }}>
                    <div className="col-md-6 m-3  d-flex align-items-center justify-content-center flex-column">
                        <div className='h3'>Timesheets Signup</div>
                        <Form className="p-4 border rounded bg-white shadow-sm w-50 " onSubmit={handleSignup}>
                            <Form.Group className="mb-2 " controlId="SignupFormCompanyName">
                                <Form.Label>Company Name</Form.Label>
                                <Form.Control type="text" name="company_name" value={formData.company_name} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="mb-2 " controlId="SignupFormFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="mb-2 " controlId="SignupFormLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="mb-1" controlId="SignupFormEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} className="mr-2" required />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="SignupFormPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" value={formData.password} onChange={handleChange} required />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="SignupFormRetypePassword">
                                <Form.Label>Retype Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="retype_password"
                                    value={formData.retype_password}
                                    onChange={handleChange}
                                    style={{ borderColor: highlightInput ? 'red' : null }}
                                    required
                                />
                                {highlightInput && (
                                    <div className="text-danger mt-2">
                                        Passwords don't match. Please check and try again.
                                    </div>
                                )}
                            </Form.Group>

                            <Button variant="dark" type="submit" className={` bg-primary`} onClick={handleSignup}>
                                Sign Up
                            </Button>
                        </Form>
                        <div className='d-flex justify-content-center align-items-center m-2'>
                            <div className='h6'>Already a Customer ? </div>
                            <Button variant="dark" type="submit" className={`m-2 bg-primary`} onClick={handleLogin}>
                                Login
                            </Button>
                        </div>
                    </div>

                    <div className="col bg-white d-flex flex-column justify-content-center align-items-center" >
                        <Marketing />
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Signup;
