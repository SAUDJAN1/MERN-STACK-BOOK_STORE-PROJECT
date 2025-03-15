import express from "express";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import Routing from "./Routes/authRoutes.js";
dotenv.config({ path: ".env" });
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1", Routing);
import Mongoose from "./Database/mongodb.js";
Mongoose().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is Running at Port: ${process.env.PORT}`.bgGreen);
  });
});
