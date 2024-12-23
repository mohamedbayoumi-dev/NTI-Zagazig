import express from "express";
import { Server } from "http";
import dbConnection from "./src/config/database";
import hpp from "hpp";
import path from "path";
import dotenv from "dotenv";
import i18n from "i18n";
import mountRoutes from "./src";
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app: express.Application = express();
app.use(cors({
  origin: ['http://localhost:4200'],
  allowedHeaders: ['X-CSRF-Token', 'Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));
app.use(cookieParser());

app.use(express.json({ limit: "10kb" }));
app.use(express.static('uploads'))
// hpp()                         // one result
// hpp({whitelist:['','']})     // more result
app.use(hpp({ whitelist: ["name"]}));

let server: Server;
dotenv.config();
i18n.configure({
  locales: ["en", "ar"],
  directory: path.join(__dirname, "locales"),
  defaultLocale: "en",
  queryParameter: "lang",
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
