import Cart from "../models/cartmodel.js";





const createCart=async(req,res)=>{
    const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
}

//UPDATE
const putCart=async(req,res) =>{
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedCart);
      } catch (err) {
        res.status(500).json(err);
      }
    };

//Delete
const deleteCart=async(req,res)=>{
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
}


const getACart=async(req,res)=>{
    try {
        const cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(cart);
      } catch (err) {
        res.status(500).json(err);
      }
}



// //GET ALL
const getAllCart=async(req,res)=>{
    if (req.user.role !== "admin") {
        return res.status(403).json({
            succeeded: false,
            message: "Access denied"
        });
    }

    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
      } catch (err) {
        res.status(500).json(err);
      }
}



export{putCart,createCart,deleteCart,getACart,getAllCart}