// @/pages/api/ringkasan-gejala-user/index.ts

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { uid } = req.query;

    if (!uid) {
      return res.status(400).json({ error: "uid parameter is required" });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/riwayat-gejala-user?uid=${uid}`);

    if (!response.ok) {
      return res.status(500).json({ error: "Failed to fetch riwayat data" });
    }

    const data = await response.json();

    const saranObj = data?.saran;

    if (!saranObj) {
      return res.status(404).json({ error: "No saran found for this UID" });
    }

    const ringkasanList = Object.values(saranObj).map((item: any) => {
      const pola = item.pola_makan?.join(", ") || "-";
      return `• ${item.durasi}, ${item.gejala} → ${pola}`;
    });

    const ringkasan_text = ringkasanList.join("\n");

    return res.status(200).json({
      uid,
      ringkasan_text,
    });

  } catch (error) {
    console.error("Error ringkasan:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
