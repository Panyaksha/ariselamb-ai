import type { NextApiRequest, NextApiResponse } from "next";
import { adminDb } from "@/config/firebaseAdmin";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({ error: "UID is required" });
    }

    const ref = adminDb.ref(`users/${uid}/saran`);
    const snapshot = await ref.once("value");

    if (!snapshot.exists()) {
      return res.status(404).json({ error: "No saran found" });
    }

    return res.status(200).json({
      uid,
      saran: snapshot.val(),
    });
  } catch (error: any) {
    console.error("Firebase error:", error);
    return res.status(500).json({ error: error.message });
  }
}
