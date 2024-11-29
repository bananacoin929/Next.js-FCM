"use client";

import { useEffect } from "react";
import NotificationButton from "../components/NotificationButton";

// Custom hook to register the service worker
const useServiceWorker = () => {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
};

export default function HomePage() {
  useServiceWorker();

  return (
    <main>
      <h1>Firebase Notifications in Next.js</h1>
      <NotificationButton />
    </main>
  );
}