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
            Product: {
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

const updateProduct= async(req,res)=>{
    if (req.user.role !== "admin") {
        return res.status(403).json({
            succeeded: false,
            message: "Access denied"
        });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedProduct);
      } catch (err) {
        res.status(500).json(err);
      }
}

const deleteProduct=async(req,res)=>{
    if (req.user.role !== "admin") {
        return res.status(403).json({
            succeeded: false,
            message: "Access denied"
        });
    }
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
}

const getAProduct=async(req,res)=>{

    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
      } catch (err) {
        res.status(500).json(err);
      }
}

const getAllProduct=async(req,res)=>{
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
}



export{
    createProduct,
    updateProduct,
    deleteProduct,
    getAProduct,getAllProduct
}