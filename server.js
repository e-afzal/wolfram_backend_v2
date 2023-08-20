import express from "express";
import colors from "colors";
import path from "path";
const app = express();
import { config } from "dotenv";

// LOCAL IMPORTS
import connectDB from "./config/db.js";
import agentRoutes from "./routes/agentRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import propertyRoutes from "./routes/propertyRoutes.js";
import neighbourhoodRoutes from "./routes/neighbourhoodRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

config();
connectDB();
app.use(express.json());

// ROUTES
app.use("/api/status", (req, res) => res.send("API is live"));
app.use("/api/properties", propertyRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/neighbourhood", neighbourhoodRoutes);

// ERROR HANDLERS
app.use(notFound);
app.use(errorHandler);

// LISTENER
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.yellow.bold
  )
);
