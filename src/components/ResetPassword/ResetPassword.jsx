import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Image } from 'react-bootstrap';

const ResetPassword = () => {
    return (

        <div className="bg-light overflow-hidden  " style={{ minHeight: '100vh' }}>
            <div className="row d-flex align-items-center justify-content-center ">
                <div className="col m-3  ">
                    <div className="d-flex align-items-center justify-content-center  flex-column ">
                        <div className='h3'>Reset Password</div>
                        <Form className="p-3 border rounded bg-white shadow-sm w-50">

                            <p className='h5'>
                                Enter a new Password
                            </p>

                            <Form.Group className="mb-2 " controlId="loginFormEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="email" placeholder="" />
                            </Form.Group>

                            <Form.Group className="mb-2" controlId="loginFormPassword">
                                <Form.Label>Re-type Password</Form.Label>
                                <Form.Control type="password" placeholder="" />
                            </Form.Group>

                            <Button variant="dark" type="submit" className={`bg-primary`}>
                                Reset Password
                            </Button>
                        </Form>


                    </div>
                </div>
                <div className="col bg-white d-flex flex-column justify-content-center align-items-center" >
                    <Image src="/timesheets_logo.png" alt="Logo" style={{ width: 250 }} />
                    <Image
                        src="/time2.png"
                        alt="Timesheet"
                        fluid
                        className="img-responsive"
                        style={{ width: 650 }}
                    />
                    <h6 className='m-4 h3 '>Start your free trial. No credit card required, no software to install</h6>

                    <div className='container h4  '>
                        With your trial, you get:
                        <div className='container h4'>
                            <p className='h6 pt-3'>
                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} /> Preloaded data or upload your own
                            </p>
                            <p className='h6'>
                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} /> Preconfigured processes, reports, and dashboards
                            </p>
                            <p className='h6'>
                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} /> Guided experiences for sales reps, leaders, and administrators
                            </p>
                            <p className='h6'>
                                <FontAwesomeIcon icon={faCheckCircle} style={{ color: 'green' }} /> Online training and live onboarding webinars
                            </p>
                        </div>

                    </div>
                    <Button variant="dark" type="submit" className={`m-2   bg-primary`} >
                        START MY FREE TRIAL
                    </Button>

                </div>
            </div>


        </div>

    );
}

export default ResetPassword;
