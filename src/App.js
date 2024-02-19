import { AuthProvider } from "../src/AuthContext/AuthContext.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Users from "./components/Users/Users";
import Clients from "./components/Clients/Clients";
import Projects from "./components/Projects/Projects";
import Project from "./components/ProjectMain/Project.jsx";
import Task from "./components/Task/Main.jsx";
import T from "./components/T/Task.jsx";
import Taaa from "./components/TAAA/Taskk.jsx";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import NotFoundPage from "./components/NotFoundPage";
import Grid from "./components/Dashboard/Grid";
import PrivateRoutes from "./utils/PrivateRoutes";
import Dashboard from "./components/Dashboard/Dashboard";
import Sitemap from "./components/Sitemap";
import Charts from "./components/Dashboard/Charts";
import Settings from "./components/Settings/Settings";
import Profileview from "./components/Profile/Profileview.jsx";
import ViewTimesheet from "./components/ViewTimesheet/ViewTimesheet";
import MyApprovals from "./components/MyApprovals/MyApprovals";
import TimesheetReport from "./components/TimesheetReport/TimesheetReport.jsx";
import ApprovalReport from "./components/ApprovalReport/ApprovalReport.jsx";
import ScheduleReports from "./components/ScheduleReports/ScheduleReports.jsx";
import EditTimesheet from "./components/EditTimesheet/EditTimesheet.jsx";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ fontFamily: "Poppins, sans-serif" }}>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/users" element={<Users />} />
              <Route path="/task" element={<Task />} />
              <Route path="/tasks" element={<T />} />
              <Route path="/taaa" element={<Taaa />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/project" element={<Project />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="*" element={<NotFoundPage />} />
              <Route path="/grid" element={<Grid />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/charts" element={<Charts />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profileview" element={<Profileview />} />
              <Route path="/viewtimesheet" element={<ViewTimesheet />} />
              <Route path="/editTimesheet/:id" element={<EditTimesheet />} />
              <Route path="/myapprovals" element={<MyApprovals />} />
              <Route path="/timesheetreport" element={<TimesheetReport />} />
              <Route path="/approvalreport" element={<ApprovalReport />} />
              <Route path="/schedulereports" element={<ScheduleReports />} />
            </Route>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/sitemap" element={<Sitemap />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}
