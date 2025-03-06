import mongoose, { Schema } from "mongoose";

const SavedLinksSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  folder: {
    type: String,
  },
  platform: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedLinks =
  mongoose.models.SavedLinks || mongoose.model("SavedLinks", SavedLinksSchema);
export default SavedLinks;
