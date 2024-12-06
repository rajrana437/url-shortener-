import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import Url from "@/models/Url";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shortId } = req.query;

  console.log("Redirect handler called with shortId:", req.query);

  if (!shortId || typeof shortId !== "string") {
    return res.status(400).json({ message: "Invalid shortId" });
  }

  try {
    await connectToDatabase();

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    return res.redirect(301, url.originalUrl); // Use 301 for a permanent redirect
  } catch (error) {
    console.error("Error in redirect handler:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
