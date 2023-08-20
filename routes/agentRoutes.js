// PACKAGE
import express from "express";
const router = express.Router();

// IMPORT
import { getAgents, getAgentById } from "../controllers/agentController.js";

// ROUTES
router.route("/").get(getAgents);
router.route("/:id").get(getAgentById);

export default router;
