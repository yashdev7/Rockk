import React from 'react';
import HeaderLayout from "../Layouts/HeaderLayout";
import { Card } from 'react-bootstrap';
import './Profileview.css';

const Profileview = () => {
  return (
    <HeaderLayout>
      <div className="d-flex justify-content-center align-items-center">
        <Card className="profile-card">
          <Card.Body>
            <Card.Title className="name">Main Hero</Card.Title>
            <Card.Subtitle className="mb-2 text-muted designation">Manager</Card.Subtitle>
            <Card.Text>
              <div className="info">
                Information
                <div className="detail">Email: example@example.com</div>
                <div className="detail">Phone: 123-456-7890</div>
              </div>
              <div className="info">
                Projects
                <div className="detail">Recent Projects</div>
              </div>
              <div className="info">
                Tasks
                <div className="detail">Recent Tasks</div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </HeaderLayout>
  );
};

export default Profileview;
