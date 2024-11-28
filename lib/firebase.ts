import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "./initFirebase";

const messaging = getMessaging(firebaseApp);

// Request permission to send notifications
export const requestNotificationPermission = async (): Promise<string | null> => {
  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEYConsole
    });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn("No registration token available. Request permission to generate one.");
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// Listen for foreground messages
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });