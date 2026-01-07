import { Navigate } from "react-router";
import { useEffect, useState } from "react";
import api from "../lib/Api";
import FullScreenSpinner from "./FullScreenSpinner";

const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    api
      .get("/auth/check-auth", { withCredentials: true })
      .then(() => setAuthorized(true))
      .catch(() => setAuthorized(false))
      .finally(() => setLoading(false));
  }, []);

 if (loading) return <FullScreenSpinner />;

 // or spinner

  return authorized ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
