import mongoose from "mongoose";
import { ENV, DB_NAME } from "../config/env.js";

const url = `mongodb://localhost:27017/${DB_NAME}`;

const connectDB = async () => {
  try {
    await mongoose.connect(url);
    console.log(`MongoDB connected successfully in ${ENV} mode`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
