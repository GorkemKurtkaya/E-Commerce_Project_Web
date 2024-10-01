import Order from "../models/ordermodel.js";





const createOrder = async (req, res) => {
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
};


const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteOrder= async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json("Order has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  };


  const getOrder = async (req, res) => {
    try {
      const order = await Order.findById(req.params.id); // findById ile belirli bir siparişi getir
      if (!order) {
        return res.status(404).json({ message: "Order not found" }); // Sipariş bulunamazsa 404 döner
      }
      res.status(200).json(order); // Siparişi başarılı bir şekilde döner
    } catch (err) {
      res.status(500).json(err); // Hata durumunda 500 döner
    }
  };
const getUserOrders= async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  };

const getAllOrders= async (req, res) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({
            succeeded: false,
            message: "Access denied"
        });
    }
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  };

const getOrderincome= async (req, res) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            succeeded: false,
            message: "Access denied"
        });
    }
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  };








// //halledicem
// const purchaseProduct = async (req, res) => {
//     try {
//         const { userid } = req.params; // url'den gelen userid
//         const { productIds } = req.body; // body'den gelen ürün id'leri

//         const user = await User.findById(userid);
//         if (!user) {
//             return res.status(404).json({
//                 succeeded: false,
//                 message: "User not found"
//             });
//         }

//         for (const productid of productIds) {
//             const product = await Order.findById(productid);
//             if (!product) {
//                 return res.status(404).json({
//                     succeeded: false,
//                     message: `Product with ID ${productid} not found`
//                 });
//             }

//             // productId değerini doğru bir şekilde karşılaştırıyoruz
//             const purchasedProduct = user.purchasedProducts.find(p => {
//                 return p.productId && p.productId.equals(product._id); // Doğrudan product._id kullanıyoruz
//             });

//             console.log("Purchased Product:", purchasedProduct);

//             if (!purchasedProduct) {
//                 user.purchasedProducts.push({ productId: product._id });
//                 console.log("Added productId:", product._id);
//             } else {
//                 console.log("Product already purchased:", purchasedProduct.productId);
//             }

//             product.purchaseCount = (product.purchaseCount || 0) + 1;
//             await product.save();
//         }

//         await user.save();

//         res.status(201).json({
//             succeeded: true,
//             message: "Products purchased successfully",
//             purchasedProducts: user.purchasedProducts
//         });
//     } catch (error) {
//         res.status(500).json({
//             succeeded: false,
//             message: error.message
//         });
//     }
// };





export { createOrder,updateOrder,deleteOrder,getUserOrders,getAllOrders,getOrderincome,getOrder };