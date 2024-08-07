import express from 'express';
import bodyParser from 'body-parser';
import { config } from './config.js';
import cors from 'cors';
import paymentRoutes from './routes/paymentRoutes.js';


const app = express();

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/payments', paymentRoutes);

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
