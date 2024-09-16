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
        const { name, password } = req.body;

        const user = await User.findOne({ name });

        let same = false;
        if (user) {
            same = await bcrypt.compare(password, user.password);

        } else {
            return res.status(401).json({
                succeded: false,
                message: "Invalid credentials"
            });
        }
        if (same) {
            const token = createToken(user._id);
            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000
            });

            res.status(200).json({
                succeded: true,
                user: user._id,
                token
            });

        } else {
            res.status(400).send("Invalid credentials");
        }
    }



    catch (error) {
        res.status
            (500).send(error);
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
const getAUsers = async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id });
        const inFollowers = user.followers.some((follower) => {
            return follower.equals(res.locals.user._id);
        });
        const photos = await Photo.find({ user: user._id });
        res.status(200).render("user", {
            user,
            inFollowers,
            photos,
            link: "users"
        });
    }
    catch (error) {
        res.status(400).json({
            succeded: false,
            error: error.message
        });
    }
}




export { registerUser, loginUser, createToken, logoutUser, getAllUsers, getAUsers };