import Order from "../models/ordermodel.js";
import User from "../models/usermodel.js";
import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

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
        if (!req.body.name || !req.body.category || !req.body.price || !req.files.imageUri) {
            return res.status(400).json({
                succeeded: false,
                message: "All fields are required"
            });
        }


        await Order.create({
            name: req.body.name,
            category: req.body.category,
            price: req.body.price,
            imageUri: result.secure_url
        });

        fs.unlinkSync(req.files.imageUri.tempFilePath);

        res.status(201).json({
            succeeded: true,
            Order: {
                name: req.body.name,
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

const purchaseProduct = async (req, res) => {
    try {
        const { userid, productid } = req.params; // URL'den kullanıcı ve ürün ID'lerini alıyoruz

        // Ürünü veritabanında kontrol et
        const product = await Order.findById(productid);

        if (!product) {
            return res.status(404).json({
                succeeded: false,
                message: "Product not found"
            });
        }

        // Kullanıcıyı bul ve ürünü satın alınan ürünler listesine ekle
        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).json({
                succeeded: false,
                message: "User not found"
            });
        }

        // Kullanıcı zaten bu ürünü satın almışsa hata ver
        if (user.purchasedProducts.includes(product._id)) {
            return res.status(400).json({
                succeeded: false,
                message: "Product already purchased"
            });
        }

        // Ürünü kullanıcıya ekle ve kaydet
        user.purchasedProducts.push(product._id);
        await user.save();

        res.status(201).json({
            succeeded: true,
            message: "Product purchased successfully",
            purchasedProduct: product
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
};

export { createProduct, purchaseProduct };