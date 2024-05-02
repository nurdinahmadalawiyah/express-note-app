import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: 'notesapp'
            })
        console.log("MongoDB Connected")
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

export default connectDB;