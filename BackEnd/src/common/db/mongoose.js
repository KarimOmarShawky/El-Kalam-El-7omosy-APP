import mongoose from "mongoose";
import {config} from "dotenv";
config();
export const db = await mongoose.connect(process.env.MONGO_URL);