// ===== 1. Firebase config (from Firebase console) =====
const firebaseConfig = {
  apiKey: "AIzaSyDvAE8hv4ijQ-Lih9cm2xRpf-gFMfWTRnQ",
  authDomain: "musicteamportalpushapp.firebaseapp.com",
  projectId: "musicteamportalpushapp",
  storageBucket: "musicteamportalpushapp.firebasestorage.app",
  messagingSenderId: "831045230249",
  appId: "1:831045230249:web:298ed083c299e1b8d413b8"
};

// ===== 2. Initialize Firebase & Messaging =====
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// ===== 3. Register service workers =====
async function registerServiceWorkers() {
  if (!("serviceWorker" in navigator)) {
    console.log("Service workers not supported");
    return null;
  }

  // Main service worker (for caching, etc.)
  await navigator.serviceWorker.register("service-worker.js");

  // Firebase messaging service worker
  const reg = await navigator.serviceWorker.register("firebase-message-sw.js");
  messaging.useServiceWorker(reg);

  return reg;
}

// ===== 4. UI elements =====
const notifyBtn = document.getElementById("notifyBtn");
const statusEl = document.getElementById("status");

function setStatus(msg) {
  statusEl.textContent = msg;
  console.log(msg);
}

// ===== 5. Request notification permission & get token =====
async function enableNotifications() {
  try {
    if (!("Notification" in window)) {
      setStatus("Notifications are not supported in this browser.");
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      setStatus("Notification permission denied.");
      return;
    }

    const token = await messaging.getToken({
      vapidKey: "BHvo6e4UeUYecrm6vWRkOv6HHGijS86jQGWJKvPmIH7lDTD-5XPyUz_T-xNHjKJIO92fmCtoviVZi_WxanrTprU"
    });

    if (!token) {
      setStatus("No token received. Check your Firebase config.");
      return;
    }

    setStatus("Device token:\n" + token + "\n\nStore this on your server to send pushes.");
    notifyBtn.disabled = true;
  } catch (err) {
    console.error(err);
    setStatus("Error enabling notifications. Error: " + err.message);
  }
}

// ===== 6. Foreground message handler =====
messaging.onMessage(payload => {
  console.log("Message received in foreground:", payload);
  const { title, body } = payload.notification || {};
  if (title) {
    new Notification(title, { body });
  }
});

// ===== 7. Init =====
window.addEventListener("load", async () => {
  await registerServiceWorkers();
  setStatus("Ready. Tap 'Enable Notifications' to subscribe.");
});

notifyBtn.addEventListener("click", enableNotifications);