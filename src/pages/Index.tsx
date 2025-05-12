
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    document.title = "JEE - LIVEPHARMA";
  }, []);

  // Redirect to dashboard if authenticated, otherwise to login
  return <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />;
};

export default Index;
