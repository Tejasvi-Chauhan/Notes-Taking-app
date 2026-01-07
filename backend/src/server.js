import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimter.js";
import authRoutes from "./routes/authRoutes.js";
import testRoutes from "./routes/testRoutes.js";



const app = express();



app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN ,
    credentials: true,
  })
);



app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/notes", notesRoutes);
app.use("/auth", authRoutes);
app.use("/api", testRoutes);

app.use(rateLimiter);

connectDB().then(()=>{
    app.listen(PORT, () => {
     console.log(`App is listening on port ${PORT}`);
});

})
.catch((err)=>{
    console.error("Failed to connect to the database", err);
});


