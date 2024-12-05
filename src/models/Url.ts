import mongoose, { Schema, model, models } from "mongoose";

interface IUrl {
  originalUrl: string;
  shortId: string;
}

const UrlSchema = new Schema<IUrl>({
  originalUrl: { type: String, required: true },
  shortId: { type: String, required: true, unique: true },
});

const Url = models.Url || model<IUrl>("Url", UrlSchema);

export default Url;
