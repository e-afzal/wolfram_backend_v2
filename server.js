import express from "express";
const app = express();
import { config } from "dotenv";

config();

app.use("/", (req, res) => res.send("API is live"));

// SERVER LISTENING
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
