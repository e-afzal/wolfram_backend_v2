// PACKAGES
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// MODEL
import Property from "../models/propertyModel.js";

const getNeighbourhood = asyncHandler(async (req, res) => {
  /* Extract 'neighbourhood' from client URL and search property 'area'.
  E.g. 'Arabian-Ranches' is split and joined to form 'Arabian Ranches'.
  */
  const extract = req.params.keyword.split("-").join(" ");
  const properties = await Property.find({
    area: new RegExp(`.*${extract}.*`, "i"),
  }).select("_id name area price bathrooms bedrooms buildUp image");

  if (properties.length === 0) {
    res.status(404);
    throw new Error("Neighbourhood not found.");
  } else {
    res.json(properties);
  }
});

export { getNeighbourhood };
