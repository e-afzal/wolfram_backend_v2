// PACKAGE
import express from "express";
const router = express.Router();

// IMPORT
import {
  getFeaturedProjects,
  getProjectById,
} from "../controllers/projectController.js";

// ROUTES
router.route("/").get(getFeaturedProjects);
router.route("/:id").get(getProjectById);

export default router;
