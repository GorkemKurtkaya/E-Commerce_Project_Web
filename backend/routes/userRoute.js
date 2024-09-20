import express from "express";
import * as userController from "../controllers/userController.js";
import * as authMiddleWare from "../middlewares/authMiddleWare.js";
import { purchaseProduct } from "../controllers/orderController.js";
import { checkUser } from "../middlewares/authMiddleWare.js";

const router = express.Router();

router.post("/register", userController.registerUser);

router.get("/checkUser", checkUser, (req, res) => {
  if (res.locals.user) {
    res.status(200).json({ user: res.locals.user });
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
});

router.get("/auth", authMiddleWare.authenticateToken, (req, res) => {
  res.status(200).send("Authenticated");
});

router.get("/cook", (req, res) => {
  // Çerezi al
  const cookie = req.cookies["jwt"];

  // Eğer çerez varsa, gönder
  if (cookie) {
    res.send({ cookie });
  } else {
    res.status(404).send("Cookie not found");
  }
});

router.post('/login', userController.loginUser);
router.route('/:id').get(userController.getAUser);
router.post('/:userid/purchase/:productid', purchaseProduct);
router.post("/changePassword", authMiddleWare.authenticateToken, userController.changePassword);
router.post("/addAddress",authMiddleWare.authenticateToken,userController.addAddress);



export default router;
