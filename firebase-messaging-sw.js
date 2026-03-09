importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js");

// Same sender ID as in app.js config
firebase.initializeApp({
  messagingSenderId: "831045230249"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  console.log("[firebase-messaging-sw.js] Background message:", payload);

  const notificationTitle = payload.notification?.title || "New notification";
  const notificationOptions = {
    body: payload.notification?.body || "",
    icon: payload.notification?.icon || "assets/icon-192.png"
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});