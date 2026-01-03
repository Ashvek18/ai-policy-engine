import mongoose from "mongoose";
import app from "./app.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
.then(() => {
console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () =>
        console.log(`Server is running on port ${process.env.PORT}`)
    );
}).catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});