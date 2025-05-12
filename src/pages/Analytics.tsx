
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart, Download } from "lucide-react";
import {
  ResponsiveContainer,
  LineChart as RechartsLine,
  Line,
  BarChart as RechartsBar,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const mockSalesData = [
  { month: "Jan", sales: 5400, inventory: 9000 },
  { month: "Feb", sales: 6200, inventory: 8700 },
  { month: "Mar", sales: 6800, inventory: 9200 },
  { month: "Apr", sales: 5900, inventory: 8900 },
  { month: "May", sales: 6300, inventory: 8500 },
  { month: "Jun", sales: 7100, inventory: 8200 },
  { month: "Jul", sales: 8200, inventory: 7800 },
  { month: "Aug", sales: 7600, inventory: 8100 },
  { month: "Sep", sales: 8100, inventory: 7500 },
  { month: "Oct", sales: 7400, inventory: 7900 },
  { month: "Nov", sales: 7900, inventory: 7700 },
  { month: "Dec", sales: 8500, inventory: 7300 },
];

const mockCategoryData = [
  { name: "Pain Relief", value: 35 },
  { name: "Antibiotics", value: 20 },
  { name: "Supplements", value: 18 },
  { name: "Allergy", value: 12 },
  { name: "Digestive", value: 10 },
  { name: "Others", value: 5 },
];

const mockSupplierData = [
  { name: "MediPharm", value: 40 },
  { name: "PharmaCare", value: 30 },
  { name: "AllCure", value: 15 },
  { name: "VitaLife", value: 10 },
  { name: "Others", value: 5 },
];

const mockProductMovementData = [
  { name: "Fast Moving", value: 65, fill: "#4D90F7" },
  { name: "Medium Moving", value: 25, fill: "#A6C8FB" },
  { name: "Slow Moving", value: 10, fill: "#F87171" },
];

const COLORS = ["#4D90F7", "#A6C8FB", "#2474F5", "#F87171", "#34D399", "#FBBF24"];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState("yearly");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Analytics</h1>
        <div className="flex items-center gap-3">
          <Select
            defaultValue="yearly"
            onValueChange={(value) => setTimeRange(value)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="sales">
        <TabsList>
          <TabsTrigger value="sales" className="flex items-center">
            <LineChart className="mr-2 h-4 w-4" />
            Sales & Inventory
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Product Analysis
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales vs. Inventory Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLine
                    data={mockSalesData}
                    margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#2474F5"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                      name="Sales ($)"
                    />
                    <Line
                      type="monotone"
                      dataKey="inventory"
                      stroke="#A6C8FB"
                      strokeWidth={2}
                      name="Inventory Value ($)"
                    />
                  </RechartsLine>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={mockCategoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {mockCategoryData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supplier Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBar
                      data={mockSupplierData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 40 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis dataKey="name" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip />
                      <Bar
                        dataKey="value"
                        fill="#2474F5"
                        radius={[4, 4, 0, 0]}
                        name="Percentage (%)"
                      />
                    </RechartsBar>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Movement Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={mockProductMovementData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={140}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) =>
                        `${name} ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {mockProductMovementData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.fill}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBar
                      data={[
                        { name: "Paracetamol", units: 430 },
                        { name: "Amoxicillin", units: 350 },
                        { name: "Ibuprofen", units: 320 },
                        { name: "Vitamin C", units: 280 },
                        { name: "Loratadine", units: 230 },
                      ]}
                      margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis type="number" fontSize={12} />
                      <YAxis
                        dataKey="name"
                        type="category"
                        fontSize={12}
                        width={100}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="units"
                        fill="#2474F5"
                        radius={[0, 4, 4, 0]}
                        name="Units Sold"
                      />
                    </RechartsBar>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Slow Moving Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBar
                      data={[
                        { name: "Eye Drops", days: 65 },
                        { name: "Zinc Tablets", days: 52 },
                        { name: "Antifungal", days: 45 },
                        { name: "Antiseptic", days: 38 },
                        { name: "Bandages", days: 32 },
                      ]}
                      margin={{ top: 20, right: 30, left: 30, bottom: 40 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis type="number" fontSize={12} />
                      <YAxis
                        dataKey="name"
                        type="category"
                        fontSize={12}
                        width={100}
                      />
                      <Tooltip />
                      <Bar
                        dataKey="days"
                        fill="#F87171"
                        radius={[0, 4, 4, 0]}
                        name="Days in Stock"
                      />
                    </RechartsBar>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
