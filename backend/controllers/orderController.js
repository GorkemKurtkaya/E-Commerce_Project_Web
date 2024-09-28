import Order from "../models/ordermodel.js";
import User from "../models/usermodel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";
import mongoose from "mongoose";
import Product from "../models/productmodel.js";


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








//halledicem
const purchaseProduct = async (req, res) => {
    try {
        const { userid } = req.params; // url'den gelen userid
        const { productIds } = req.body; // body'den gelen ürün id'leri

        const user = await User.findById(userid);
        if (!user) {
            return res.status(404).json({
                succeeded: false,
                message: "User not found"
            });
        }

        for (const productid of productIds) {
            const product = await Order.findById(productid);
            if (!product) {
                return res.status(404).json({
                    succeeded: false,
                    message: `Product with ID ${productid} not found`
                });
            }

            // productId değerini doğru bir şekilde karşılaştırıyoruz
            const purchasedProduct = user.purchasedProducts.find(p => {
                return p.productId && p.productId.equals(product._id); // Doğrudan product._id kullanıyoruz
            });

            console.log("Purchased Product:", purchasedProduct);

            if (!purchasedProduct) {
                user.purchasedProducts.push({ productId: product._id });
                console.log("Added productId:", product._id);
            } else {
                console.log("Product already purchased:", purchasedProduct.productId);
            }

            product.purchaseCount = (product.purchaseCount || 0) + 1;
            await product.save();
        }

        await user.save();

        res.status(201).json({
            succeeded: true,
            message: "Products purchased successfully",
            purchasedProducts: user.purchasedProducts
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
};





export { createProduct, purchaseProduct };