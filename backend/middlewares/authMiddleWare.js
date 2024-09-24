import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";

const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

// const token =req.headers['authorization']&& req.headers['authorization'].split(' ')[1];

// if(!token){
//     return res.json({
//         success:false,
//         message:"Access denied",

//     })

// }

// req.user=await User.findById(
//     jwt.verify(token, process.env.JWT_SECRET).userId
// )

// next();

const authenticateToken = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);
          return res.status(401).send(message);
        } else {
          // Kullanıcıyı veritabanından getir
          const user = await User.findById(decodedToken.userId);
          if (!user) {
            return res.status(401).send("User not found");
          }
          // Kullanıcı bilgilerini req.user'a ekle
          req.user = user;
          next();
        }
      });
    } else {
    }
  } catch (error) {
    res.status(401).send("Access denied");
  }
};

export { authenticateToken, checkUser };
