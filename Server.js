const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // For CORS
const userRoutes = require("./routes/Users"); // Import user routes
const invoiceRoutes=require("./routes/Invoices")
const productRoutes=require("./routes/Products")

dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse incoming JSON requests

// Database connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("Error connecting to MongoDB:", err));

// Use the user routes
app.use("/api/users", userRoutes); 
app.use('/api/invoices', invoiceRoutes);
app.use("/api/products",productRoutes)



app.get("/", (req, res) => {
    res.send("Welcome to the E-commerce API!");
});
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
