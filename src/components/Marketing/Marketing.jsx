import React from 'react'
import { Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';
const Marketing = () => {
    return (
        <div className='w-75'>
            <div className='d-flex justify-content-center align-items-center flex-column'>

                <Image src="/timesheets_logo.png" alt="Logo" style={{ width: 250 }} />
                <Image
                    src="/time2.png"
                    alt="Timesheet"
                    fluid
                    className="img-responsive"
                    style={{ width: 650 }}
                />
                <p className='m-4 h3 font-weight-bold'>Start your free trial. No credit card required, no software to install</p>

                <div className='h4' style={{ width: 650 }}>
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
                <Button variant="dark" type="submit" className={`  bg-primary`}>
                    START MY FREE TRIAL
                </Button>
            </div>
        </div>
    )
}

export default Marketing