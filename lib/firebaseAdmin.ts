import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const serviceAccount = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT;

if (!serviceAccount) {
  throw new Error("FIREBASE_ADMIN_SERVICE_ACCOUNT is not configured");
}

const credential = JSON.parse(serviceAccount);

if (typeof credential.private_key === "string") {
  credential.private_key = credential.private_key.replace(/\\n/g, "\n");
}

const app = getApps()[0] ?? initializeApp({ credential: cert(credential) });

// This is the project's named Firestore database; the default database is unused.
export const watchatlaspreference = getFirestore(app, "watchatlaspreference");
