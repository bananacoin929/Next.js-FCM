"use client";

import React from "react";
import dynamic from "next/dynamic";

// Dynamically import the Firebase notification logic
const NotificationLogic = dynamic(() => import("./NotificationLogic"), { ssr: false });

const NotificationButton: React.FC = () => {
  return (
    <div>
      <h1>Enable Notifications</h1>
      <NotificationLogic />
    </div>
  );
};

export default NotificationButton;