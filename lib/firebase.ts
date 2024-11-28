import { getMessaging, getToken, onMessage } from "firebase/messaging";
import firebaseApp from "./initFirebase";
import { NotificationPayloadType } from "@/types/NotificatinPayloadType";

const isBrowser =
  typeof window !== "undefined" && typeof navigator !== "undefined";

let messaging: ReturnType<typeof getMessaging> | null = null;
messaging = getMessaging(firebaseApp); // Initialize messaging only in the browser

// Request permission to send notifications
export const requestNotificationPermission = async (): Promise<
  string | null
> => {
  if (!isBrowser || !messaging) {
    console.warn("Notifications are not supported in this environment.");
    return null;
  }

  try {
    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
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

export const onMessageListener = (): Promise<NotificationPayloadType | null> =>
  new Promise((resolve) => {
    onMessage(messaging!, (payload) => {
      if (payload.notification) {
        // Narrow the type to ensure notification is not undefined
        const { title = "No title", body = "No body", icon } = payload.notification;

        resolve({
          notification: {
            title,
            body,
            icon,
          },
        });
      } else {
        console.warn("No notification payload received.");
        resolve(null);
      }
    });
  });