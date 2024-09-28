import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import userRoute from "./routes/userRoute.js";
import { checkUser } from "./middlewares/authMiddleWare.js";
import cookieParser from "cookie-parser";
import orderRoute from "./routes/orderRoute.js";
import cors from "cors";
import pageRoute from './routes/pageRoute.js';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import cartRoute from "./routes/cartRoute.js"
import productRoute from "./routes/productRoute.js"

// import methodOverride from 'method-override';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

//db connection
conn();

const app = express();
const PORT = process.env.PORT || 3000;

//static dosyası
app.use(cors({
  origin: "http://localhost:5173", // frontend URL'ini buraya koy
  credentials: true, // cookie'lerin frontend ile paylaşılmasına izin ver
}));
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload({useTempFiles: true}));
// app.use(methodOverride('_method', {
//     methods: ['POST', 'GET']
// }));

//routes
app.use('*', checkUser);
app.use(pageRoute);
app.use("/users", userRoute);
app.use("/orders", orderRoute);
app.use("/cart",cartRoute);
app.use("/product",productRoute);
app.use("/checkout", stripeRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
