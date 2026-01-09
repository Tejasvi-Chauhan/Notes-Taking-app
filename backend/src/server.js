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


//  FOR COOKIE (VERY IMPORTANT)

app.set("trust proxy", 1);

const corsOptions = {
origin: process.env.CLIENT_ORIGIN, //frontend ka url
  credentials: true,
};

app.use(cors(corsOptions));




app.use(express.json());
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(rateLimiter);

app.use("/api/notes", notesRoutes);
app.use("/auth", authRoutes);
app.use("/api", testRoutes);



connectDB().then(()=>{
    app.listen(PORT, () => {
     console.log(`App is listening on port ${PORT}`);
});

})
.catch((err)=>{
    console.error("Failed to connect to the database", err);
});


