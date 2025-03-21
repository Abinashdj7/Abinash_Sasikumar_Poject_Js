const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/Users"); 
const invoiceRoutes=require("./routes/Invoices")
const productRoutes=require("./routes/Products")

dotenv.config(); // Load environment variables from .env file

const app = express();


app.use(cors()); 
app.use(express.json()); 

n
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));


app.use("/api/users", userRoutes); 
app.use('/api/invoices', invoiceRoutes);
app.use("/api/products",productRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to the E-commerce API!");
});
const PORT = process.env.PORT || 5001;
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
