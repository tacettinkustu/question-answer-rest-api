const express = require("express");
const dotenv = require("dotenv");
const routers = require("./routers/index");
const connectDatabase = require("./helpers/database/connectDatabase");
const customErrorHandler =require("./middlewares/errors/customErrorHandler")

dotenv.config({
  path: "./config/env/config.env",
});

// MongoDb Connection
connectDatabase();

const app = express();

//express-body middleware
app.use(express.json());

const PORT = process.env.PORT;

// routers middleware
app.use("/api", routers);

// error handler
app.use(customErrorHandler);

app.listen(PORT, () => {
  console.log("App Started on PORT:" + PORT);
});
