importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js"
);

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBen3zHrTdgYrZdK4paON3i3PCSkSv2TWc",
  authDomain: "dental-2b618.firebaseapp.com",
  projectId: "dental-2b618",
  storageBucket: "dental-2b618.firebasestorage.app",
  messagingSenderId: "517887828515",
  appId: "1:517887828515:web:d6a968f8b8772e4006c796",
};

firebase.initializeApp(firebaseConfig);

// Background Message Handling
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
