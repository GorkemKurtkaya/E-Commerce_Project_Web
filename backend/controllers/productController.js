import User from "../models/usermodel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import mongoose from "mongoose";
import Product from "../models/productmodel.js";


//Siparis Olusturma
const createProduct = async (req, res) => {
    
    if (req.user.role !== "admin") {
        return res.status(403).json({
            succeeded: false,
            message: "Access denied"
        });
    }

    const result = await cloudinary.uploader.upload(req.files.imageUri.tempFilePath, {
        use_filename: true,
        folder: "Baskisanati"
    });
    

    try {
        // Zorunlu alanların kontrolü
        if (!req.body.title || !req.body.desc || !req.body.category || !req.body.price || !req.files.imageUri) {
            return res.status(400).json({
                succeeded: false,
                message: "All fields are required"
            });
        }


        await Product.create({
            title: req.body.title,
            desc:req.body.desc,
            category: req.body.category,
            price: req.body.price,
            imageUri: result.secure_url
        });

        fs.unlinkSync(req.files.imageUri.tempFilePath);

        res.status(201).json({
            succeeded: true,
            Order: {
                title: req.body.title,
                desc:req.body.desc,
                category: req.body.category,
                price: req.body.price,
                imageUri: result.secure_url
            },
            message: "Product created successfully"
        });



    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
};




export{
    createProduct,
}