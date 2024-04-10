import { app } from "./app";
import dotenv from "dotenv";
import connectDB from "./db";

dotenv.config({ path: "./.env" });

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8080, () =>
      console.log(`server is running on port${process.env.PORT}`)
    );
  })
  .catch((error) => console.error("failed to connect to db", error));
