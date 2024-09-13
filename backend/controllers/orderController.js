import Order from "../models/ordermodel.js";
import User from "../models/usermodel.js";

const createProduct = async (req, res) => {
    try {
        const { name, category, price, imageUri } = req.body;

        // Zorunlu alanların kontrolü
        if (!name || !category || !price || !imageUri) {
            return res.status(400).json({
                succeeded: false,
                message: "All fields are required"
            });
        }

        // Yeni ürün oluştur
        const newProduct = new Order({
            name,
            category,
            price,
            imageUri
        });

        // Veritabanına kaydet
        const createdProduct = await newProduct.save();

        res.status(201).json({
            succeeded: true,
            product: createdProduct,
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

export { createProduct,purchaseProduct };