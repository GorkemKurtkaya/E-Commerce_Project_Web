import Stripe from "stripe"; // Stripe'ı import et
const stripe = new Stripe(process.env.STRIPE_KEY); // Stripe nesnesini oluştur

const payment = (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "usd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
};

export { payment }; // payment fonksiyonunu dışa aktar
