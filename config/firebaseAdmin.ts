import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY!);

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: "https://ariselambapi-default-rtdb.firebaseio.com",
  });
}

export const adminDb = getDatabase();
