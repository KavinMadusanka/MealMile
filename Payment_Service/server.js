import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import paymentRoutes from './routes/paymentRoutes.js'
//import connectDB from './config/db.js';

//config env
dotenv.config();

//database congit
//connectDB();

//rest object
const app = express();

// Stripe webhook needs RAW body for that endpoint only
app.use((req, res, next) => {
    if (req.originalUrl === '/api/payments/stripe/webhook') {
      express.raw({ type: 'application/json' })(req, res, next);
    } else {
      express.json()(req, res, next);
    }
  });
  
  app.use(morgan('dev'));
  app.use('/api/payments', paymentRoutes);

  //Root test
app.get("/", (req, res) => {
    res.send({
        message: "welcome to Payment server"
    })
})

//port
const PORT = process.env.PORT || 8087;

app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});