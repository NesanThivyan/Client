import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/signin" replace />;

  try {
    const { role } = jwtDecode(token);   // payload must contain `role`
    return role === "admin" ? children : <Navigate to="/" replace />;
  } catch {
    return <Navigate to="/signin" replace />;
  }
}
