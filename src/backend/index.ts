// index.ts
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import CORE_DB from "./models/server.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (_req, res) => res.send("Server is running"));

const startServer = async () => {
  try {
    await CORE_DB.authenticate();
    console.log("Database connected");
    await CORE_DB.sync({ alter: true });
    console.log("Models synchronized");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

startServer();
