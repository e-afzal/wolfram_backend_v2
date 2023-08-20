// PACKAGE
import express from "express";
const router = express.Router();

// IMPORTS
import {
  getProperties,
  getListings,
  search,
  getPropertyById,
} from "../controllers/propertyController.js";

// ROUTES
router.route("/").get(getProperties);
router.route("/listings").get(getListings);
router.route("/search").post(search);
router.route("/:id").get(getPropertyById);

export default router;
