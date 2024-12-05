const express = require("express");
const connectDB = require("./src/config/dbConnect");
const app = express();
var cors = require("cors");

// Connect Database
connectDB();

const {
  LoginRouter,
  holdingsRouter,
  positionRouter,
  transactionRouter,
} = require("./src/web/routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World! vinit");
});

app.use("/user", LoginRouter);
app.use("/share", holdingsRouter);
app.use("/stock", positionRouter);
app.use("/transaction", transactionRouter);

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
