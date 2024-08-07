import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


export const initiatePayment = async (amount, currency) => {
  try {
    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);

    return {
      id: order.id,
      currency,
      amount: order.amount / 100,
      key_id: process.env.RAZORPAY_KEY_ID,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};



