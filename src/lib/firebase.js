/**
 * Firebase config — paste your project values here.
 *
 * How to get these:
 * 1. Go to console.firebase.google.com
 * 2. Create a project (or open yours)
 * 3. Project Settings → Your Apps → Add Web App
 * 4. Copy the firebaseConfig object below
 * 5. In Firebase console: Enable "Email/Password" under Authentication → Sign-in method
 * 6. Create a Firestore Database (start in production mode, or test mode for now)
 */

import { initializeApp, getApps } from 'firebase/app';
import { getAuth }                from 'firebase/auth';
import { getFirestore }           from 'firebase/firestore';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FB_API_KEY,
  authDomain:        import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FB_APP_ID,
};

// Only initialise if config is present — prevents crashing the public site
// when env vars are not yet set.
export const FB_READY = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

let app, auth, db;

if (FB_READY) {
  app  = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db   = getFirestore(app);
} else {
  auth = null;
  db   = null;
}

export { auth, db };
