import express from "express";
import { Server } from "http";
import dbConnection from "./src/config/database";
import path from "path";
import dotenv from "dotenv";
import i18n from 'i18n';

import mountRoutes from "./src";
const app: express.Application = express();
app.use(express.json({ limit: "10kb" }));
let server: Server;

dotenv.config();
i18n.configure({
  locales: ['en', 'ar'],
  directory: path.join(__dirname, 'locales'),
  defaultLocale: 'en',
  queryParameter: 'lang'
});
app.use(i18n.init);

dbConnection();
mountRoutes(app);

server = app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${process.env.PORT}`);
});

process.on("unhandledRejection", (error: Error) => {
  console.error(`unhandledRejection ${error.name} | ${error.message}`);
  server.close(() => {
    console.error("shutting the application down");
    process.exit(1);
  });
});
