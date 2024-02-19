import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import HeaderLayout from './Layouts/HeaderLayout';

const NotFoundPage = () => {
    return (
        <HeaderLayout className="mt-5 text-center">
            <Card style={{ width: '18rem' }} className="mx-auto">
                <Card.Body>
                    <Card.Title className="display-4">Oops!</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Page Not Found</Card.Subtitle>
                    <Card.Text>
                        The page you are looking for might be in another dimension.
                    </Card.Text>
                    <Link to="/">
                        <Button variant="primary">Go Home</Button>
                    </Link>
                </Card.Body>
            </Card>
        </HeaderLayout>
    );
};

export default NotFoundPage;
