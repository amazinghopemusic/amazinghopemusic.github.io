importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyDvAE8hv4ijQ-Lih9cm2xRpf-gFMfWTRnQ",
  authDomain: "musicteamportalpushapp.firebaseapp.com",
  projectId: "musicteamportalpushapp",
  storageBucket: "musicteamportalpushapp.firebasestorage.app",
  messagingSenderId: "831045230249",
  appId: "1:831045230249:web:298ed083c299e1b8d413b8"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Background message:", payload);

  const notificationTitle = payload.notification?.title || "New notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: payload.notification?.icon || "assets/icon-192.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});