import { initiatePayment } from '../services/paymentService.js';

export const processPayment = async (req, res) => {
  try {
    const { amount, currency, walletAddress } = req.body;
    console.log(`Processing payment: amount=${amount}, currency=${currency}, walletAddress=${walletAddress}`);
    const paymentResult = await initiatePayment(amount, currency);
    res.status(200).json(paymentResult);
  } catch (error) {
    console.error(`Error processing payment: ${error.message}`);
    res.status(500).json({ error: error.message });
  }
};
