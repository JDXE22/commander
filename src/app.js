import express from "express";
import "dotenv/config";
import { commandRouter } from "./router/router.js";
import { validationErrors}  from "./utils/errors.js";
import { corsMiddleware } from "./utils/middlewares/cors.js";

export const createApp = ({ commandModel }) => {
  const app = express();

  const PORT = process.env.PORT || 1234;

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use(validationErrors);

  app.use(corsMiddleware())

  app.use("/command", commandRouter({ commandModel }));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
