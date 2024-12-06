import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import Url from "@/models/Url";
import { nanoid } from "nanoid";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { originalUrl } = req.body;

  if (!originalUrl) {
    return res.status(400).json({ message: "Original URL is required" });
  }

  try {
    await connectToDatabase();

    const shortId = nanoid(6); // Generate a short unique ID
    const newUrl = new Url({ originalUrl, shortId });

    await newUrl.save();

    res.status(201).json({ shortUrl: `${process.env.BASE_URL}/${shortId}` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
