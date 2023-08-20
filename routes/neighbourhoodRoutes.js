// PACKAGE
import express from "express";
const router = express.Router();

// IMPORT
import { getNeighbourhood } from "../controllers/neighbourhoodController.js";

// ROUTE
router.route("/:keyword").get(getNeighbourhood);

export default router;
