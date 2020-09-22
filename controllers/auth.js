const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const register = asyncErrorWrapper(async (req, res, next) => {
  const name = "tacettin kustu";
  const email = "tt@gmail.com";
  const password = "12345";

  const user = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json({
    success: true,
    data: user,
  });
});

const errorTest = (req, res, next) => {
  return next(new TypeError("Type error message"));
};

module.exports = {
  register,
  errorTest,
};
