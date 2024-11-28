"use client";

import React, { useEffect, useState } from "react";
import {
  requestNotificationPermission,
  onMessageListener
} from "../lib/firebase";

const NotificationButton: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notification, setNotification] = useState<any>(null);

  const handleRequestPermission = async () => {
    const token = await requestNotificationPermission();
    setToken(token);
  };

  useEffect(() => {
    onMessageListener().then((payload) => {
      console.log("Received foreground message:", payload);
      setNotification(payload.notification);
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
        </div>
      )}
    </div>
  );
};

export default NotificationButton;
