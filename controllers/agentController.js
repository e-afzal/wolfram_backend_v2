// PACKAGES
import mongoose from "mongoose";
import asyncHandler from "express-async-handler";

// MODELS
import Agent from "./../models/agentModel.js";

const getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select("name position _id image");
    res.status(200).json(agents);
  } catch (err) {
    res.status(404);
    throw new Error("Agents not found..");
  }
};

const getAgentById = asyncHandler(async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id)
      .select(
        "_id name position qualification language experience listings image"
      )
      .populate("listings", "name area category buildUp bedrooms price _id ");
    res.status(200).json(agent);
  } catch (err) {
    res.status(404);
    throw new Error("Agent not found..");
  }
});

export { getAgents, getAgentById };
