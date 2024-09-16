import User from "../models/usermodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";





const registerUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            succeded: true,
            user: user._id
        });

    } catch (error) {


        let errors2 = {}

        if (error.code === 11000) {
            errors2.email = "Email is already registered";
        }


        if (error.name === "ValidationError") {
            Object.keys(error.errors).forEach((key) => {
                errors2[key] = error.errors[key].message;

            });
        }


        res.status(400).json({
            succeded: false,
            errors: errors2
        });

    }
}

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Kullanıcıyı bul
        const user = await User.findOne({ email });

        // Şifre karşılaştırması için kontrol
        if (!user) {
            return res.status(401).json({
                succeeded: false,
                message: "Invalid email or password"
            });
        }

        const same = await bcrypt.compare(password, user.password);

        // Şifre doğru mu?
        if (!same) {
            return res.status(401).json({
                succeeded: false,
                message: "Invalid email or password"
            });
        }

        // Şifre doğruysa token oluştur
        const token = createToken(user._id); // createToken fonksiyonu JWT oluşturuyor olmalı.
        res.cookie("jwt", token, {
            httpOnly: true,  // XSS saldırılarına karşı koruma sağlar
            secure: process.env.NODE_ENV === "production",  // Eğer üretim ortamındaysa secure olmalı
            maxAge: 24 * 60 * 60 * 1000  // 1 gün
        });

        // Başarıyla giriş yaptı
        res.status(200).json({
            succeeded: true,
            user: user._id,
            token
        });

    } catch (error) {
        // Sunucu hatası durumunda
        res.status(500).json({
            succeeded: false,
            message: error.message
        });
    }
};


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

        user.password = req.body.newPassword;
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



const createToken = (userId) => {
    return jwt.sign({
        userId
    }, process.env.JWT_SECRET, {
        expiresIn: "1h"
    });
}


const logoutUser = (req, res) => {
    res.cookie("jwt", "", {
        maxAge: 1
    });
    res.redirect("/");
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




export { registerUser, loginUser, createToken, logoutUser, getAllUsers, getAUser,changePassword };