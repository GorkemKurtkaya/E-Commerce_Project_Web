import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Address from "../models/addressmodel.js";






const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            succeded: true,
            user: user._id
        });

    } catch (error) {
        res.status(400).json({
            succeded: false,
            error: error.message

        });

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı bul
        const user = await User.findOne({ email });

        // Kullanıcı var mı?
        if (!user) {
            return res.status(401).json({
                succeeded: false,
                message: "Invalid email or password"
            });
        }

        // Şifre doğru mu?
        const same = await bcrypt.compare(password, user.password);

        if (!same) {
            return res.status(401).json({
                succeeded: false,
                message: "Invalid email or password"
            });
        }

        // Şifre doğruysa token oluştur
        const token = createToken(user._id); 
        res.cookie("jwt", token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === "production", 
            maxAge: 24 * 60 * 60 * 1000  
        });

        // Başarıyla giriş yaptı
        res.status(200).json({
            succeeded: true,
            user: user._id,
            message: "Login successful"
        });

    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
}


const changePassword = async (req, res) => {
    try {
        const user = await User.findById(res.locals.user._id);

        if (!user) {
            return res.status(404).json({
                succeeded: false,
                message: "User not found"
            });
        }

        const same = await bcrypt.compare(req.body.oldPassword, user.password);

        if (!same) {
            return res.status(401).json({
                succeeded: false,
                message: "Invalid password"
            });
        }

        // Yeni şifreyi hashle
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);
        user.password = hashedNewPassword; // Hashlenmiş yeni şifreyi ata
        await user.save();

        res.status(200).json({
            succeeded: true,
            message: "Password changed successfully"
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
}

const addAddress = async (req, res) => {
    if (req.user.role !== "user") {
        return res.status(403).json({
            succeeded: false,
            message: "Access denied"
        });
    }

    
    try {
        const { address } = req.body;

        

        if (!address) {
            return res.status(400).json({
                succeeded: false,
                message: "All fields are required"
            });
        }

        const newAddress = new Address({
            address,
            user: {
                _id: req.user._id,
                name: req.user.name,
                email: req.user.email
            }
        });

        const createdAddress = await newAddress.save();

        // Kullanıcının adres listesine yeni adres ID'sini ekle
        const user = await User.findById(req.user._id);
        user.address.push(createdAddress._id); // ObjectId türü eklendiğinden emin ol
        await user.save();

        res.status(201).json({
            succeeded: true,
            address: createdAddress,
            message: "Address created and added to user successfully"
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
};


const getAddresses = async (req, res) => {
    try {
        // Kullanıcı bilgileri `req.user`'da olmalı
        const user = await User.findById(req.user._id).populate('address');
        

        
       if(!user){
              return res.status(404).json({
                succeeded:false,
                message:"User not found"
              });
         }

        // Adresleri başarılı şekilde döndür
        res.status(200).json({
            succeeded: true,
            addresses: user.address,
            message: "Addresses fetched successfully"
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(404).json({
                succeeded: false,
                message: "Address not found"
            });
        }

        // Adresi sil
        await Address.findByIdAndDelete(req.params.id);

        // Kullanıcının adres listesinden adresi kaldır
        const user = await User.findById(req.user._id); // Kullanıcıyı bul
        user.address = user.address.filter(addr => addr.toString() !== address._id.toString()); // Adresi kaldır
        await user.save(); // Kullanıcıyı güncelle

        res.status(200).json({
            succeeded: true,
            message: "Address deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
};

const updateAddress = async (req, res) => {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
            return res.status(404).json({
                succeeded: false,
                message: "Address not found"
            });
        }

        address.address = req.body.address;
        await address.save();

        res.status(200).json({
            succeeded: true,
            address,
            message: "Address updated successfully"
        });
    } catch (error) {
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
}


const createToken = (userId) => {
    return jwt.sign({
        userId
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ _id: { $ne: res.locals.user._id } });
        res.status(200).render("users", {
            users,
            link: "users"
        });
    } catch (error) {
        res.status(400).json({
            succeded: false,
            error: error.message
        });
    }
}

const getAUser=async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                succeded: false,
                error: "User not found"
            });
        }

        res.status(200).json({
            name: user.username,
            email:user.email,
            id:user._id
        });
    }
    catch (error) {
        res.status(400).json({
            succeded: false,
            error: error.message
        });
    }
}






export { registerUser, loginUser, createToken, getAllUsers, getAUser,changePassword,addAddress,getAddresses,deleteAddress,updateAddress };