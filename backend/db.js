import mongoose from "mongoose";


const conn =() => {
    mongoose.connect(process.env.DB_URI,{
        dbName: "Web_Projesi",
    })
    .then(() => {
        console.log("Database connected");
    })
    .catch((err) => {
        console.log(`Database connection failed, ${err}`);
    });
};


export default conn;