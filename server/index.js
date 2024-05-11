import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import AuthRoute from "./Routes/AuthRoute.js";
import postRoutes from "./Routes/posts.js";
import cors from "cors";
dotenv.config();

// Routes

const app = express();

// MiddleWares
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: "https://sharezone-inky.vercel.app/",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Listening ${process.env.PORT} `)
    )
  )
  .catch((err) => console.log(err));

app.use("/auth", AuthRoute);
app.use("/posts", postRoutes);
