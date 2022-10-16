import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";

export function RequireAuth({ children }) {
  const auth = useAuth();

  if (!auth.userName) {
    return <Navigate to="/" />;
  }
  return children;
}
