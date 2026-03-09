# My Push App (PWA + Firebase Cloud Messaging)

A lightweight, installable Progressive Web App (PWA) built with HTML, CSS, and JavaScript, featuring Firebase Cloud Messaging (FCM) push notifications. Designed for Android home‑screen installation and optimized for ministry, music, and media use cases.

---

## Features

- Installable Android‑style PWA  
- Push notifications (foreground and background)  
- Firebase Cloud Messaging integration  
- Offline caching via Service Worker  
- Custom app icons (192×192 and 512×512)  
- Works on GitHub Pages, Netlify, Vercel, or Firebase Hosting  

---

## Project Structure

```
my-push-app/
│
├── index.html
├── app.js
├── manifest.json
├── service-worker.js
├── firebase-messaging-sw.js
│
└── assets/
    ├── icon-192.png
    └── icon-512.png
```

---

## Setup Instructions

### 1. Clone or download the project

```
git clone https://github.com/<your-username>/<your-repo>.git
```

### 2. Add your Firebase configuration

In app.js, replace the placeholder values:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Add your Web Push Certificate (VAPID Key)

Also in app.js:

```javascript
vapidKey: "YOUR_VAPID_KEY"
```

Find this in:  
Firebase Console → Project Settings → Cloud Messaging → Web Push certificates

### 4. Add your Sender ID to the service worker

In firebase-messaging-sw.js:

```javascript
firebase.initializeApp({
  messagingSenderId: "YOUR_SENDER_ID"
});
```

---

## Hosting

This app must be served over HTTPS. You can host it on:

### GitHub Pages

1. Push your code  
2. Go to Settings → Pages  
3. Select `main` branch → `/root`  
4. Save  

Your app will be live at:

```
https://<username>.github.io/<repo>/
```

### Netlify / Vercel

Drag‑and‑drop the folder or connect your repo.

---

## Installing the App (Android)

1. Open your hosted URL in Chrome  
2. Tap the menu (⋮)  
3. Select Add to Home Screen  
4. Launch it like a native app  

---

## Enabling Push Notifications

1. Open the app  
2. Tap Enable Notifications  
3. The app will request permission  
4. A device token will appear  
5. Use this token to send notifications

---

## Sending a Push Notification

Use Postman or your backend to send a POST request:

```
POST https://fcm.googleapis.com/fcm/send
```

Headers:

```
Authorization: key=YOUR_SERVER_KEY
Content-Type: application/json
```

Body:

```json
{
  "to": "DEVICE_TOKEN_HERE",
  "notification": {
    "title": "Hello!",
    "body": "This is a push notification.",
    "icon": "/assets/icon-192.png"
  }
}
```

Your Server Key is found in:  
Firebase Console → Project Settings → Cloud Messaging → Cloud Messaging API (Legacy)

---

## Testing Checklist

- App loads over HTTPS  
- Service worker registers  
- Manifest loads correctly  
- App installs on Android  
- Notification permission works  
- Token is generated  
- Push notification arrives (foreground)  
- Push notification arrives (background)  

---

## Contributing

Feel free to fork, modify, and submit pull requests. This project is intentionally simple so it can be extended for:

- Worship music apps  
- Devotional push reminders  
- Team communication tools  
- Event announcements  
- Media distribution  

---

## License

MIT License — free to use and modify.