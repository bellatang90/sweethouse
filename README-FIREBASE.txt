HOW TO MAKE ORDERS UNIVERSAL (visible from any device)
=======================================================

The site currently runs in "local mode": orders and admin toggles only
live in the browser they were made in. To share them across all devices,
connect a free Firebase database:

1. Go to https://console.firebase.google.com and sign in with Google.
2. "Add project" → name it (e.g. sweethouse) → Analytics not needed → Create.
3. Left sidebar: Build → Firestore Database → "Create database"
   → choose a location near you → "Start in production mode" → Enable.
4. Open the "Rules" tab, replace everything with the rules below, click Publish:

   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /orders/{id}   { allow read, write: if true; }
       match /archive/{id}  { allow read, write: if true; }
       match /settings/{id} { allow read, write: if true; }
     }
   }

5. Click the gear icon (Project settings) → "Your apps" → the web icon </>
   → register the app (no hosting needed) → copy the firebaseConfig object.
6. Open sweethouse-config.js in your repo, replace `null` with that object,
   commit and push. Done — the admin page will show "cloud sync: on".

NOTE ON SECURITY: these rules let anyone with the keys read/write the
database. For a small home bakery that's usually an acceptable trade-off,
but customer names + phone numbers are stored there. If you want it locked
down properly (admin login required to read orders), ask Claude to add
Firebase Authentication.
