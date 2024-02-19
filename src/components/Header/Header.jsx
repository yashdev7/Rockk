import { useState, useContext } from "react";
import {
  Navbar,
  Nav,
  NavbarText,
  Button,
  Col,
  Container,
} from "react-bootstrap";
import { faCog, faUser, faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Offcanvas from "react-bootstrap/Offcanvas";
import SideBar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import AuthContext from '../../AuthContext/AuthContext';
function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const handleSettings = () => {
    navigate("/settings");
  };

  const handleProfileview = () => {
    navigate("/profileview");
  };

  const { logoutUser } = useContext(AuthContext);

  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <div className="d-flex ">
          <Navbar.Brand href="/">
            <img
              src="/timesheets_logo.png"
              style={{ width: "100%", maxWidth: "120px" }}
              alt=""
            />
          </Navbar.Brand>

          {/* Dropdown */}
          <Nav className="ml-auto">
            <Button variant="" onClick={handleShow} size="lg">
              <FontAwesomeIcon icon={faBars} />
            </Button>

            <Offcanvas show={show} onHide={handleClose}>
              <SideBar />
            </Offcanvas>
          </Nav>
        </div>
        <div className="">
          <NavbarText className="text-center text-md-left fs-4 fs-md-3 fs-lg-2 d-none d-md-block">
            Timesheet Management System
          </NavbarText>
        </div>

        <div>
          <Col
            xs={12}
            md={6}
            lg={4}
            className="d-flex align-items-center justify-content-end"
          >
            <Nav.Link href="" className="m-2 p-1" onClick={handleSettings}>
              <FontAwesomeIcon icon={faCog} size="lg" />
            </Nav.Link>
            <Nav.Link href="" className="p-1" onClick={handleProfileview}>
              <FontAwesomeIcon icon={faUser} size="lg" />
            </Nav.Link>
            <Nav.Link href="" className="p-1" onClick={logoutUser}>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            </Nav.Link>
          </Col>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
