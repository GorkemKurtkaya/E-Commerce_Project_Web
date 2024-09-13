import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import userRoute from './routes/userRoute.js';
// import { checkUser } from './middlewares/authMiddleWare.js';





dotenv.config();

//db connection
conn();

const app = express();
const PORT = process.env.PORT || 3000;



//static dosyası
app.use(express.static('public'));
app.use(express.json());


// app.use('*', checkUser); 
app.use("/users",userRoute);





app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});