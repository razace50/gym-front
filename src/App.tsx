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
import MemberDetails from "./components/pages/MemberDetails";
import TrainerDashboard from "./components/pages/TrainerDashboard";
import MemberDashboard from "./components/pages/MemberDashboard";
import NotificationsPage from "./components/pages/NotificationsPage";

function App() {
  const location = useLocation();

  const dashboardPaths = [
    "/dashboard",
    "/members",
    "/admins",
    "/payments",
    "/settings",
    "/trainer-dashboard",
    "/member-dashboard",
    "/dashboard-trainers",
    "/dashboard-memberships",
    "/attendance",
    "/notifications",
  ];

  const hideNavAndFooter = dashboardPaths.some((path) =>
    location.pathname === path || location.pathname.startsWith(path + "/")
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
            <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "TRAINER"]}>
              <DashboardLayout>
                <Members />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard-trainers"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"]}>
              <DashboardLayout>
                <TrainersPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard-memberships"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"]}>
              <DashboardLayout>
                <MembershipsPage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "TRAINER"]}>
              <DashboardLayout>
                <AttendancePage />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admins"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN"]}>
              <DashboardLayout>
                <Admins />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"]}>
              <DashboardLayout>
                <Payment />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
  path="/members/:id"
  element={
    <ProtectedRoute allowedRoles={["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "TRAINER", "MEMBER"]}>
      <DashboardLayout>
        <MemberDetails />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/dashboard-attendance"
  element={
    <ProtectedRoute
      allowedRoles={["SUPER_ADMIN", "ADMIN", "RECEPTIONIST", "TRAINER"]}
    >
      <DashboardLayout>
        <AttendancePage />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/trainer-dashboard"
  element={
    <ProtectedRoute allowedRoles={["TRAINER"]}>
      <DashboardLayout>
        <TrainerDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/member-dashboard"
  element={
    <ProtectedRoute allowedRoles={["MEMBER"]}>
      <DashboardLayout>
        <MemberDashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>
<Route
  path="/notifications"
  element={
    <ProtectedRoute
      allowedRoles={["SUPER_ADMIN", "ADMIN", "RECEPTIONIST"]}
    >
      <DashboardLayout>
        <NotificationsPage />
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
