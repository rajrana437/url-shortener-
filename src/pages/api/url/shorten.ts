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

    // Check if the URL already exists in the database
    const existingUrl = await Url.findOne({ originalUrl });

    if (existingUrl) {
      // If the URL exists, return the existing short URL
      return res.status(200).json({
        shortUrl: `${process.env.BASE_URL}/${existingUrl.shortId}`,
      });
    }

    // If the URL does not exist, create a new short ID
    const shortId = nanoid(6); // Generate a short unique ID
    const newUrl = new Url({ originalUrl, shortId });

    await newUrl.save();

    res.status(201).json({
      shortUrl: `${process.env.BASE_URL}/${shortId}`,
    });
  } catch (error) {
    console.error("Error in URL shortener handler:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
