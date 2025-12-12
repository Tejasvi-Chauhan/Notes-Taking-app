import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimter.js";




const app = express();
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || "*" // Allow requests from the frontend origin
}));
app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectDB().then(()=>{
    app.listen(PORT, () => {
     console.log(`App is listening on port ${PORT}`);
});

})
.catch((err)=>{
    console.error("Failed to connect to the database", err);
});


