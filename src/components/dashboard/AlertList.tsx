import { useNotifications, Notification } from "@/contexts/NotificationContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, formatDistanceToNow } from "date-fns";
import { X } from "lucide-react";

interface AlertListProps {
  limit?: number;
  showActions?: boolean;
}

const AlertList = ({ limit, showActions = true }: AlertListProps) => {
  const { notifications, markAsRead, dismissNotification } = useNotifications();
  
  // Apply limit if specified
  const displayNotifications = limit
    ? notifications.slice(0, limit)
    : notifications;

  // Function to get badge variant based on notification type
  const getBadgeVariant = (type: Notification["type"]) => {
    switch (type) {
      case "danger": return "destructive";
      case "warning": return "warning";
      case "info": default: return "secondary";
    }
  };

  // Custom badge for warning since it's not in the default variants
  const WarningBadge = ({ children }: { children: React.ReactNode }) => (
    <Badge className="bg-amber-500 hover:bg-amber-600">{children}</Badge>
  );

  // Render the badge based on type
  const renderBadge = (type: Notification["type"], label: string) => {
    if (type === "warning") {
      return <WarningBadge>{label}</WarningBadge>;
    }
    return <Badge variant={getBadgeVariant(type)}>{label}</Badge>;
  };

  // Format date for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    
    // If it's today, show the time
    if (date.toDateString() === now.toDateString()) {
      return format(date, "h:mm a");
    }
    
    // If it's within the last week, show relative time
    if (now.getTime() - date.getTime() < 7 * 24 * 60 * 60 * 1000) {
      return formatDistanceToNow(date, { addSuffix: true });
    }
    
    // Otherwise show the date
    return format(date, "MMM d");
  };

  if (displayNotifications.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No notifications to display
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {displayNotifications.map((notification) => (
        <li
          key={notification.id}
          className={`border rounded-lg p-4 bg-white ${
            notification.read ? "bg-opacity-60" : "shadow-sm"
          }`}
        >
          <div className="flex justify-between items-start">
            <div className={`flex-1 ${notification.read ? "text-gray-500" : ""}`}>
              <div className="flex items-center gap-2 mb-1">
                {renderBadge(
                  notification.type,
                  notification.type.charAt(0).toUpperCase() +
                    notification.type.slice(1)
                )}
                <span className="text-xs text-muted-foreground">
                  {formatDate(notification.timestamp)}
                </span>
              </div>
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">
                {notification.message}
              </p>
            </div>
            
            {showActions && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => dismissNotification(notification.id)}
              >
                <X size={16} />
              </Button>
            )}
          </div>
          
          {showActions && !notification.read && (
            <div className="mt-3 text-right">
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-primary"
                onClick={() => markAsRead(notification.id)}
              >
                Mark as read
              </Button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default AlertList;
