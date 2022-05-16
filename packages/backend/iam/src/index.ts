import "dotenv/config";
import express from "express";
import morgan from "morgan";

import { ConnectMongoose } from "./models/mongoose";

// routes
import LoginRoutes from "./routes/login.routes";
import RefreshRoutes from "./routes/refresh.routes";
import RegisterRoutes from "./routes/register.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));

app.use("/login", LoginRoutes);
app.use("/refresh", RefreshRoutes);
app.use("/register", RegisterRoutes);

app.get("*", (_req, res) => {
  res.sendStatus(404);
});

(async () => {
  try {
    if (!process.env.IAM_PORT) return console.error("IAM port is missing");

    app.listen(process.env.IAM_PORT);
    console.log(`Server is listening on ${process.env.IAM_PORT}`);

    await ConnectMongoose();
    console.log("Connected to mongo atlas");
  } catch (error) {
    console.error("Error occurred while IAM starts");
    console.error(error);
  }
})();
