import mongoose from "mongoose";
import { config } from "dotenv";
config();

const DB_URL = process.env.MONGO_URL;

export const db = await mongoose
    .connect(DB_URL, { serverSelectionTimeoutMS: 5000 })
    .then((conn) => {
        console.log("✅ MongoDB connected:", conn.connection.host);
        return conn;
    })
    .catch((err) => {
        console.error("❌ MongoDB connection error:", err.message);
        process.exit(1);
    });