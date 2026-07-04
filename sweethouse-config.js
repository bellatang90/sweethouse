// ============================================================
// SweetHouse cloud sync — makes orders & toggles UNIVERSAL
// (visible from every browser/device, not just one).
//
// Until you fill this in, the site runs in "local mode":
// everything works, but data stays in each visitor's browser.
//
// SETUP (about 5 minutes, free) — full steps in README-FIREBASE.txt:
//   1. Go to console.firebase.google.com → "Add project"
//   2. Build → Firestore Database → Create database (production mode)
//   3. Rules tab → paste the rules from README-FIREBASE.txt → Publish
//   4. Project settings (gear icon) → Your apps → Web app (</>) →
//      register it, then copy the `firebaseConfig` object shown
//   5. Replace `null` below with that object and push this file.
//
// Example of what it should look like when done:
// export const FIREBASE_CONFIG = {
//   apiKey: "AIzaSy...",
//   authDomain: "sweethouse-xxxxx.firebaseapp.com",
//   projectId: "sweethouse-xxxxx",
//   storageBucket: "sweethouse-xxxxx.appspot.com",
//   messagingSenderId: "1234567890",
//   appId: "1:1234567890:web:abc123",
// };
// ============================================================
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyC69SeQqQoiw0Q8aSdX7Wx1Pl50eCrse7M",
  authDomain: "sweethouse-a4d83.firebaseapp.com",
  projectId: "sweethouse-a4d83",
  storageBucket: "sweethouse-a4d83.firebasestorage.app",
  messagingSenderId: "565129514757",
  appId: "1:565129514757:web:6e3eaf931ddafd7285316c",
  //measurementId: "G-B093QR03D1"
};
