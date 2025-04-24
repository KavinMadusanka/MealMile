import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'

//config env
dotenv.config();

//database congit
connectDB();

//middelware
app.use(express.json());
app.use(morgan('dev'));

//rest object
const app = express();

//routes
app.use('/auth/v1/user',authRoute);

app.get("/", (req, res) => {
    res.send({
        message: "welcome to resturant managment server"
    })
})

//port
const PORT = process.env.PORT || 8086;

app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
});