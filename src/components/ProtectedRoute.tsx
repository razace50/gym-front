import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
};

type User = {
  role: "SUPER_ADMIN" | "ADMIN" | "RECEPTIONIST" | "TRAINER" | "MEMBER";
};

const getHomeRoute = (role: User["role"]) => {
  if (role === "TRAINER") return "/trainer-dashboard";
  if (role === "MEMBER") return "/member-dashboard";
  return "/dashboard";
};

export default function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");

  if (!token || !userData) {
    return <Navigate to="/login" replace />;
  }

  let user: User;

  try {
    user = JSON.parse(userData);
  } catch {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={getHomeRoute(user.role)} replace />;
  }

  return <>{children}</>;
}