
import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-700">JEE - LIVEPHARMA</h1>
          <p className="text-gray-600">Pharmacy Stock Management System</p>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
