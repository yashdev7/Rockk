import React from 'react'
import { useNavigate } from 'react-router-dom'
const Sitemap = () => {

    const linkStyle = {
        textDecoration: 'none',
        color: 'text-secondary',
        cursor: 'pointer',
    };
    const navigate = useNavigate();

    const handleDashboard = () => {
        navigate('/dashboard');
    }
    const handleLogin = () => {
        navigate('/login');
    }

    const handleSignup = () => {
        navigate('/signup');
    }

    const handleResetPassword = () => {
        navigate('/resetpassword');
    }

    const handleForgotPassword = () => {
        navigate('/forgotpassword')
    }

    const handleAddClients = () => {
        navigate('/clients')
    }

    const handleAddTasks = () => {
        navigate('/tasks')
    }

    const handleAddProjects = () => {
        navigate('/projects')
    }

    const handleAddUsers = () => {
        navigate('/users')
    }

    return (
        <div className='container w-5 p-5 '>
            <div className='fs-3 p-2'>
                Sitemap
            </div>
            <div className='fs-5 container m-2'>
                MAIN NAVIGATION
                <div className='fs-6 ms-4' >
                    <div style={linkStyle} onClick={handleDashboard}>Dashboard</div>
                    <div style={linkStyle} onClick={handleLogin}>Login</div>
                    <div style={linkStyle} onClick={handleSignup}>Signup</div>
                    <div style={linkStyle} onClick={handleResetPassword}>Reset Password</div>
                    <div style={linkStyle} onClick={handleForgotPassword}>Forgot Password</div>
                    <div style={linkStyle} onClick={handleAddClients}>Add Clients</div>
                    <div style={linkStyle} onClick={handleAddTasks}>Add Tasks</div>
                    <div style={linkStyle} onClick={handleAddProjects}>Add Projects</div>
                    <div style={linkStyle} onClick={handleAddUsers}>Add Users</div>
                </div>
            </div>
        </div >
    )
}

export default Sitemap