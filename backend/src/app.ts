import express from "express";
import cors from "cors";
import userRoute from "./routes/user.route";
import cookieParser from "cookie-parser";
import path from "path";
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/user", userRoute);

export { app };
