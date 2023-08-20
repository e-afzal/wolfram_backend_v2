// PACKAGE
import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    transaction: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    refNo: {
      type: Number,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    completion: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    buildUp: {
      type: Number,
      required: true,
    },
    parking: {
      type: Number,
      required: true,
    },
    image: {
      type: Array,
      required: true,
    },
    features: {
      type: Array,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Property = mongoose.model("Property", propertySchema);

export default Property;
