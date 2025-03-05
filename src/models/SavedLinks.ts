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
  },
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SavedLinks =
  mongoose.models.SavedLinks || mongoose.model("SavedLinks", SavedLinksSchema);
export default SavedLinks;
