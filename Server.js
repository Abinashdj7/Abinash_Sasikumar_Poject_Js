const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
    console.log("Time:", Date.now());
    next();
});

app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
});

app.use((req, res, next) => {
    req.calculatedValue = 4 * 7;
    next();
});

app.get("/", (req, res) => {
    console.log(`Response sent with calculated value: ${req.calculatedValue}`);
    res.send(`Request Time: ${req.requestTime} | Calculated Value: ${req.calculatedValue}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
