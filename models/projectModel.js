// PACKAGE
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    developer: {
      type: String,
      default: "-",
    },
    name: {
      type: String,
      required: true,
    },
    priceFrom: {
      type: String,
      required: true,
      default: "-",
    },
    pricePerSqFt: {
      type: String,
      default: "Request for price",
    },
    status: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: String,
      required: true,
      default: "-",
    },
    units: {
      type: Number,
      required: true,
      default: 0,
    },
    bedrooms: {
      type: String,
      required: true,
      default: "-",
    },
    description: {
      type: String,
      default: "-",
    },
    amenities: {
      type: Array,
    },
    planBooking: {
      type: Number,
      default: 0,
    },
    planHandover: {
      type: Number,
      default: 0,
    },
    planComplete: {
      type: Number,
      default: 0,
    },
    map: {
      long: {
        type: String,
        default: "-",
      },
      lat: {
        type: String,
        default: "-",
      },
    },
    carouselImg: [String],
    logoImg: String,
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
