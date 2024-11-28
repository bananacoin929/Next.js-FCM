"use client";

import React, { useEffect, useState } from "react";
import { requestNotificationPermission, onMessageListener } from "../lib/firebase";

// Define the structure of the notification payload
export interface NotificationPayload {
  notification: {
    title: string;
    body: string;
    icon?: string; // Optional
  };
}

// Define a type for the notification state
interface Notification {
  title: string;
  body: string;
  icon?: string; // Optional
}

const NotificationButton: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const handleRequestPermission = async () => {
    const token = await requestNotificationPermission();
    setToken(token);
  };

  useEffect(() => {
    onMessageListener().then((payload: NotificationPayload) => {
      console.log("Received foreground message:", payload);

      // Extract notification details from the payload
      const notificationData: Notification = {
        title: payload.notification.title,
        body: payload.notification.body,
        icon: payload.notification.icon,
      };

      setNotification(notificationData);
    });
  }, []);

  return (
    <div>
      <button onClick={handleRequestPermission}>Enable Notifications</button>
      {token && <p>FCM Token: {token}</p>}
      {notification && (
        <div>
          <h4>Notification:</h4>
          <p>Title: {notification.title}</p>
          <p>Body: {notification.body}</p>
          {notification.icon && <img src={notification.icon} alt="Notification Icon" />}
        </div>
      )}
    </div>
  );
};

export default NotificationButton;