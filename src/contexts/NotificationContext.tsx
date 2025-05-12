
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'danger' | 'info';
  timestamp: string;
  read: boolean;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismissNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  useEffect(() => {
    // Mock notifications data
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Low Stock Alert',
        message: 'Paracetamol stock is below 5 units',
        type: 'warning',
        timestamp: new Date(Date.now() - 20 * 60000).toISOString(), // 20 minutes ago
        read: false
      },
      {
        id: '2',
        title: 'Expiry Alert',
        message: 'Ibuprofen expired yesterday',
        type: 'danger',
        timestamp: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
        read: false
      },
      {
        id: '3',
        title: 'Restock Reminder',
        message: 'Amoxicillin needs to be reordered',
        type: 'info',
        timestamp: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
        read: false
      },
      {
        id: '4',
        title: 'New Supplier',
        message: 'MediPharma has been added as a supplier',
        type: 'info',
        timestamp: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
        read: true
      },
      {
        id: '5',
        title: 'Expiry Alert',
        message: 'Vitamin C will expire in 7 days',
        type: 'warning',
        timestamp: new Date(Date.now() - 2 * 24 * 3600000).toISOString(), // 2 days ago
        read: true
      }
    ];
    
    setNotifications(mockNotifications);
  }, []);

  const unreadCount = notifications.filter(notif => !notif.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, read: true }))
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        dismissNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
