import express from "express";
import cors from "cors";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimter.js";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
const ports = process.env.PORT || 5000;



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use("/api/notes", notesRoutes);

connectDB().then(()=>{
    app.listen(ports, () => {
     console.log(`App is listening on port ${ports}`);
});

})


