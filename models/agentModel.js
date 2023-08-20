// PACKAGE
import mongoose from "mongoose";

const agentSchema = new mongoose.Schema(
  {
    agentID: {
      type: Number,
      required: true,
      unique: true,
    },
    contact: {
      type: String,
      required: true,
      default: "+971 50 123 45 67",
    },
    email: {
      type: String,
      required: true,
      default: "agent@email.com",
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    listings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Property" }],
    description: {
      type: String,
      default: "No description available.",
    },
  },
  { timestamps: true }
);

const Agent = mongoose.model("Agent", agentSchema);

export default Agent;
