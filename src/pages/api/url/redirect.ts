import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/db";
import Url from "@/models/Url";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shortId } = req.query;

  try {
    await connectToDatabase();

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({ message: "URL not found" });
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
