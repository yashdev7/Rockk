import React from "react";
import { Navbar, Container } from "react-bootstrap";

import { Row, Col, Button, Form } from "react-bootstrap";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  FaFacebookF,
  FaTwitter,
  FaGoogle,
  FaInstagram,
  FaLinkedin,
  FaGithub,
} from "react-icons/fa";

function Footer() {
  return (
    <Navbar
      className="bg-light align-items-center justify-content-center"
    >
      <footer className="text-center">
        <Container className="p-1">
          <div>
            <a
              href="https://github.com/your-github-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <FaGithub className="m-2" />
            </a>
            <a
              href="https://www.linkedin.com/in/your-linkedin-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <FaLinkedin className="m-2" />
            </a>
            <a
              href="https://www.facebook.com/your-facebook-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <FaFacebookF className="m-2" />
            </a>
            <a
              href="https://twitter.com/your-twitter-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <FaTwitter className="m-2" />
            </a>
            <a
              href="https://www.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <FaGoogle className="m-2" />
            </a>
            <a
              href="https://www.instagram.com/your-instagram-username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-black"
            >
              <FaInstagram className="m-2" />
            </a>
          </div>

          <section className="">
            <Form>
              <Row className="d-flex justify-content-center align-items-center">
                <Col size="auto">
                  <p className="pt-2">
                    <strong>Sign up for our newsletter</strong>
                  </p>
                </Col>

                <Col md="5" start>
                  <Form.Group className="mb-4">
                    <Form.Control type="email" placeholder="Email address" />
                  </Form.Group>
                </Col>

                <Col size="auto">
                  <Button variant="outline-dark" type="submit" className="mb-4">
                    Subscribe
                  </Button>
                </Col>
              </Row>
            </Form>
          </section>
        </Container>

        <div
          className="text-center p-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © 2024 Copyright :&nbsp;
          <a className="text-dark" href="https://google.com/">
            MediaAmp.co.in
          </a>
        </div>
      </footer>
    </Navbar>
  );
}

export default Footer;
