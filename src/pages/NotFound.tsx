
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-primary-500 mb-4">404</h1>
        <p className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</p>
        <p className="text-gray-600 mb-6">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Button asChild>
          <Link to="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
