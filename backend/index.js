import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import tweetRoute from "./routes/tweetRoute.js";
import cors from "cors";
import multer from "multer";
import path from "path";

dotenv.config({
    path:".env"
})
databaseConnection();
const app = express(); 

// Define storage for the uploaded profile images
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads'); // Uploads will be stored in the 'uploads' directory
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Unique filename for each uploaded file
    }
});

// Initialize multer middleware for handling profile picture uploads
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // Limit file size to 5 MB
    }
});

// Middlewares
app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:"http://localhost:3000",
    credentials:true
}
app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/tweet", tweetRoute);

// Profile picture upload route




app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
}); 