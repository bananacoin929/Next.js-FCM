import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "./initFirebase";
import { NotificationPayloadType } from "../types/NotificatinPayloadType";

const isBrowser =
  typeof window !== "undefined" && typeof navigator !== "undefined";

let messaging: ReturnType<typeof getMessaging> | null = null;
if (isBrowser) {
  messaging = getMessaging(firebaseApp); // Initialize messaging only in the browser
}

// Request permission to send notifications
export const requestNotificationPermission = async (): Promise<string | null> => {
  if (!isBrowser || !messaging) {
    console.warn("Notifications are not supported in this environment.");
    return null;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });
    if (token) {
      console.log("FCM Token:", token);
      return token;
    } else {
      console.warn(
        "No registration token available. Request permission to generate one."
      );
      return null;
    }
  } catch (error) {
    console.error("Error getting FCM token:", error);
    return null;
  }
};

// Listen for foreground messages
export const onMessageListener = (): Promise<NotificationPayloadType | null> =>
  new Promise((resolve) => {
    onMessage(messaging!, (payload) => {
      // Only handle notifications if the app is in the foreground
      if (document.visibilityState === "visible" && payload.notification) {
        const { title = "No title", body = "No body", icon } = payload.notification;

        resolve({
          notification: {
            title,
            body,
            icon,
          },
        });
      } else {
        console.log("Notification ignored because app is not in the foreground.");
        resolve(null); // Ignore background notifications
      }
    });
  });