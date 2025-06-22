import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import authService from "../appwrite/auth"; 
import LoadingSpinner from "./Loading"
const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await authService.getCurrentUser();
        setIsAuthenticated(!!user);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <LoadingSpinner/>; // Optional loading
  }

  return isAuthenticated ? children : <Navigate to="/signup" replace />;
};

export default ProtectedRoute;