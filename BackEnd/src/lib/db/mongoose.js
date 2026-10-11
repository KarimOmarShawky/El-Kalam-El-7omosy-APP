import mongoose from 'mongoose';
import {env} from '../config/env.js';

const DB_URL = env.db.url;

let dbConnection;

try {
    dbConnection = await mongoose.connect(DB_URL, { serverSelectionTimeoutMS: 5000 });
} catch (error) {
    console.warn('MongoDB connection failed:', error.message);
}

export const db = dbConnection ?? mongoose.connection;