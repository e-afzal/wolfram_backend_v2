// PACKAGES
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// MODEL
import Project from "../models/projectModel.js";

const getFeaturedProjects = asyncHandler(async (req, res) => {
  try {
    const featuredProjects = await Project.find().select(
      "_id name area price units "
    );
    res.status(200).json(featuredProjects);
  } catch {
    res.status(404);
    throw new Error("Projects not found..");
  }
});

const getProjectById = asyncHandler(async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select(
      "carouselImg logoImg developer name price pricePerSqFt status deliveryDate units bedrooms description amenities planBooking planHandover planComplete"
    );
    res.status(200).json(project);
  } catch (err) {
    res.status(404);
    throw new Error("Project not found..");
  }
});

export { getFeaturedProjects, getProjectById };
