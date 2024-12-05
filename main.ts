import express from "express";
import dbConnection from "./src/config/database";
import dotenv from "dotenv"
import mountRoutes from "./src";
const app: express.Application = express();

app.use(express.json({ limit: "10kb" }));
dotenv.config()
dbConnection();
mountRoutes(app);


app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});
