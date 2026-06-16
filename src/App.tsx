import { Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Classes from "./components/Classes";
import Trainers from "./components/Trainers";
import Services from "./components/Services";
import Membership from "./components/Membership";
import Contact from "./components/Contact";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import DashboardLayout from "./components/layouts/DashboardLayout";
import Dashboard from "./components/pages/Dashboard";
import Members from "./components/pages/Members";
import ProtectedRoute from "./components/ProtectedRoute";
import Admins from "./components/pages/Admins";
import Payment from "./components/pages/Payment";
import Settings from "./components/pages/Settings";
import TrainersPage from "./components/pages/TrainersPage";
import MembershipsPage from "./components/pages/MembershipsPage";
import AttendancePage from "./components/pages/AttendancePage";

function App() {
  const location = useLocation();

  const dashboardPaths = [
    "/dashboard",
    "/members",
    "/admins",
    "/payments",
    "/settings",
    "/dashboard-trainers",
    "/dashboard-memberships",
    "/attendance",
  ];

  const hideNavAndFooter = dashboardPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideNavAndFooter && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/services" element={<Services />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/members"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Members />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard-trainers"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TrainersPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard-memberships"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <MembershipsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AttendancePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admins"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Admins />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Payment />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>

      {!hideNavAndFooter && <Footer />}
    </>
  );
}

export default App;
