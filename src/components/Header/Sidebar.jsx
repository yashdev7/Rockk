import Offcanvas from "react-bootstrap/Offcanvas";
import { Nav, ListGroup, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const handleNewTimesheet = () => {
    navigate("/viewtimesheet");
  };
  const handleViewExisting = () => {
    navigate("/viewtimesheet");
  };
  const handleMyApprovals = () => {
    navigate("/myapprovals");
  };
  const handleClients = () => {
    navigate("/clients");
  };
  const handleProjects = () => {
    navigate("/projects");
  };
  const handleTasks = () => {
    navigate("/tasks");
  };
  const handleUsers = () => {
    navigate("/users");
  };
  const handleTimesheetReport = () => {
    navigate("/timesheetreport");
  };
  const handleApprovalReport = () => {
    navigate("/approvalreport");
  };
  const handleScheduleReport = () => {
    navigate("/schedulereports");
  };

  return (
    <>
      <Container fluid>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>TS Management System</Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          {/* Subheadings with submenus */}
          <ListGroup>
            {/* Timesheets */}
            <ListGroup.Item className="bg-secondary text-light">
              Timesheets
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="" onClick={handleNewTimesheet}>
                Add New Timesheets
              </Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="" onClick={handleViewExisting}>
                View Existing Timesheets
              </Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="" onClick={handleMyApprovals}>
                My Approvals
              </Nav.Link>
            </ListGroup.Item>

            {/* Management */}
            <ListGroup.Item className="bg-secondary text-light mt-3">
              Management
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="" onClick={handleClients}>
                Clients
              </Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="" onClick={handleProjects}>
                Projects
              </Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="" onClick={handleTasks}>
                Tasks
              </Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="" onClick={handleUsers}>
                Users
              </Nav.Link>
            </ListGroup.Item>

            {/* Reports */}
            <ListGroup.Item className="bg-secondary text-light mt-3">
              Reports
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="" onClick={handleTimesheetReport}>
                Timesheet Report
              </Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="" onClick={handleApprovalReport}>
                Approval Report
              </Nav.Link>
            </ListGroup.Item>
            <ListGroup.Item>
              <Nav.Link href="" onClick={handleScheduleReport}>
                Schedule Reports
              </Nav.Link>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Container>
    </>
  );
}

export default Sidebar;
