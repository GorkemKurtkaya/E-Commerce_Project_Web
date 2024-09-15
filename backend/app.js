import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import userRoute from "./routes/userRoute.js";
import { checkUser } from "./middlewares/authMiddleWare.js";
import cookieParser from "cookie-parser";
import orderRoute from "./routes/orderRoute.js";
// import methodOverride from 'method-override';

dotenv.config();

//db connection
conn();

const app = express();
const PORT = process.env.PORT || 3000;

//static dosyası
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(fileUpload({
//     useTempFiles:true
// }));
// app.use(methodOverride('_method', {
//     methods: ['POST', 'GET']
// }));

// app.use('*', checkUser);
app.use("/users", userRoute);
app.use("/orders", orderRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
