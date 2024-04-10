import mongoose from "mongoose";
import { DB_NAME } from "../constant";

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(connectionInstance.connection.port);
  } catch (error) {
    console.error("something went wrong while connecting to DB");
  }
};

export default connectDB;
