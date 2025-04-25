const express = require("express");
const colors = require("colors");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 8087;

app.use(express.json());
app.use("/api/orders", require("./routes/orderRoutes"));
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`.bgCyan.white);
});