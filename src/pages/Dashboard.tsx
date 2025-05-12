
import { useNavigate } from "react-router-dom";
import { 
  Package, AlertTriangle, Clock, TrendingUp, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/dashboard/StatCard";
import AlertList from "@/components/dashboard/AlertList";
import { useAuth } from "@/contexts/AuthContext";

// Import chart components
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from "recharts";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Mock data for charts
  const salesData = [
    { name: "Jan", sales: 5400, stock: 9000 },
    { name: "Feb", sales: 6200, stock: 8700 },
    { name: "Mar", sales: 6800, stock: 9200 },
    { name: "Apr", sales: 5900, stock: 8900 },
    { name: "May", sales: 6300, stock: 8500 },
    { name: "Jun", sales: 7100, stock: 8200 },
  ];

  const topSellingProducts = [
    { name: "Paracetamol", value: 124 },
    { name: "Vitamin C", value: 98 },
    { name: "Ibuprofen", value: 86 },
    { name: "Amoxicillin", value: 65 },
    { name: "Omeprazole", value: 52 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <p className="text-muted-foreground">{user?.pharmacyName} Dashboard</p>
        </div>
        <Button 
          onClick={() => navigate("/products/add")}
          className="flex items-center"
        >
          <Plus size={18} className="mr-1" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Out of Stock"
          value="12"
          description="Products that need reordering"
          icon={Package}
          className="bg-red-50"
        />
        <StatCard
          title="Expiring Soon"
          value="27"
          description="Products expiring in 30 days"
          icon={Clock}
          className="bg-amber-50"
        />
        <StatCard
          title="Low Stock"
          value="15"
          description="Products below threshold"
          icon={AlertTriangle}
          className="bg-blue-50"
        />
        <StatCard
          title="Total Inventory Value"
          value="$24,650"
          description="Based on purchase price"
          icon={TrendingUp}
          className="bg-green-50"
          trend={{ value: 8.2, isPositive: true }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Sales vs. Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="#2474F5" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="stock" 
                    stroke="#A6C8FB" 
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topSellingProducts} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2474F5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Alerts</CardTitle>
          <Button variant="link" size="sm" onClick={() => navigate("/notifications")}>
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <AlertList limit={3} showActions={false} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
