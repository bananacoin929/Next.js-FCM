"use client";

import React, { useState, useEffect } from "react";
import { requestNotificationPermission, onMessageListener } from "../lib/firebase";

// Define a type for the notification state
interface Notification {
  title: string;
  body: string;
  icon?: string; // Optional
}

const NotificationLogic: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<Notification | null>(null);

  const handleRequestPermission = async () => {
    const token = await requestNotificationPermission();
    setToken(token);
  };

  useEffect(() => {
    const handleForegroundNotification = async () => {
      const notificationPayload = await onMessageListener();
      if (notificationPayload?.notification) {
        console.log("aaa")
        setNotification(notificationPayload.notification);
      }
    };

    handleForegroundNotification();
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

export default NotificationLogic;