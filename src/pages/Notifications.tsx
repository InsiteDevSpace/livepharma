
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlertList from "@/components/dashboard/AlertList";
import { useNotifications } from "@/contexts/NotificationContext";
import { Bell } from "lucide-react";
import { toast } from "sonner";

const Notifications = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();
  const [activeTab, setActiveTab] = useState("all");

  const allNotifications = notifications;
  const unreadNotifications = notifications.filter(notif => !notif.read);
  const lowStockNotifications = notifications.filter(notif => 
    notif.message.toLowerCase().includes("stock") && 
    notif.type === "warning"
  );
  const expiryNotifications = notifications.filter(notif => 
    notif.message.toLowerCase().includes("expir") && 
    (notif.type === "warning" || notif.type === "danger")
  );
  
  const handleMarkAllAsRead = () => {
    markAllAsRead();
    toast.success("All notifications marked as read");
  };

  const getActiveNotifications = () => {
    switch (activeTab) {
      case "unread":
        return unreadNotifications;
      case "stock":
        return lowStockNotifications;
      case "expiry":
        return expiryNotifications;
      default:
        return allNotifications;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            Stay updated with important alerts
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={handleMarkAllAsRead} 
          disabled={unreadCount === 0}
        >
          Mark all as read
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b pb-3">
          <CardTitle>Notification Center</CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <Tabs defaultValue="all" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="all">
                  All
                </TabsTrigger>
                <TabsTrigger value="unread">
                  Unread {unreadCount > 0 && `(${unreadCount})`}
                </TabsTrigger>
                <TabsTrigger value="stock">Low Stock</TabsTrigger>
                <TabsTrigger value="expiry">Expiry</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <AlertList />
            </TabsContent>
            
            <TabsContent value="unread">
              {unreadNotifications.length > 0 ? (
                <AlertList notifications={unreadNotifications} />
              ) : (
                <div className="text-center py-12">
                  <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">No unread notifications</h3>
                  <p className="text-gray-500">You're all caught up!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="stock">
              {lowStockNotifications.length > 0 ? (
                <AlertList notifications={lowStockNotifications} />
              ) : (
                <div className="text-center py-12">
                  <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">No stock alerts</h3>
                  <p className="text-gray-500">All products are sufficiently stocked</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="expiry">
              {expiryNotifications.length > 0 ? (
                <AlertList notifications={expiryNotifications} />
              ) : (
                <div className="text-center py-12">
                  <Bell className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">No expiry alerts</h3>
                  <p className="text-gray-500">No products are nearing expiration</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;
