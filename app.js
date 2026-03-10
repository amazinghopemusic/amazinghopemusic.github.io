// ===== 1. Firebase config (from Firebase console) =====
const firebaseConfig = {
  apiKey: "AIzaSyDvAE8hv4ijQ-Lih9cm2xRpf-gFMfWTRnQ",
  authDomain: "musicteamportalpushapp.firebaseapp.com",
  projectId: "musicteamportalpushapp",
  storageBucket: "musicteamportalpushapp.firebasestorage.app",
  messagingSenderId: "831045230249",
  appId: "1:831045230249:web:298ed083c299e1b8d413b8"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ===============================
// UI Helper
// ===============================
function setStatus(message) {
  const statusBox = document.getElementById("status");
  if (statusBox) statusBox.textContent = message;
}

// ===============================
// Enable Notifications
// ===============================
async function enableNotifications() {
  try {
    // 1. Ask for permission
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      setStatus("Notification permission denied.");
      return;
    }

    // 2. Get FCM token (Firebase will auto-load /firebase-messaging-sw.js)
    const token = await messaging.getToken({
      vapidKey: "BHvo6e4UeUYecrm6vWRkOv6HHGijS86jQGWJKvPmIH7lDTD-5XPyUz_T-xNHjKJIO92fmCtoviVZi_WxanrTprU"
    });

    if (!token) {
      setStatus("Failed to get device token.");
      return;
    }

    // 3. Show token
    setStatus("Device Token:\n" + token);

  } catch (error) {
    console.error("Notification error:", error);
    setStatus("Error enabling notifications. " + error.message);
  }
}

// ===============================
// Foreground Message Handler
// ===============================
messaging.onMessage((payload) => {
  console.log("Message received in foreground:", payload);

  // Show a notification while app is open
  new Notification(payload.notification.title, {
    body: payload.notification.body,
    icon: payload.notification.icon
  });
});

// ===============================
// Button Listener
// ===============================
document.getElementById("notifyBtn").addEventListener("click", enableNotifications);
