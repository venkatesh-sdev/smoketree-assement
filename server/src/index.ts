// src/index.ts
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config({ path: __dirname + "/.env" });

import userRoutes from "./routes/userRoutes";
import addressRoutes from "./routes/addressRoutes";
import sequelize from "./database";
import path from "path";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);

// Sync database and start server
sequelize
  .sync()
  .then(() => {
    app.listen(port, () => {
      console.log(process.env.JWT_SECRET as string);
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });
