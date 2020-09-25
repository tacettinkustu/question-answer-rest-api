const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const {generateJWTFromUser} = require("../models/User");
const {sendJwtToClient} =require("../helpers/authorization/tokenHelpers")

const register = asyncErrorWrapper(async (req, res, next) => {

  const{name,email,password,role} = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role
  });

  sendJwtToClient(user,res);
});

const tokentest = (req,res,next) =>{
  res.json({
    success:true,
    message:"welcome"
  })
}

module.exports = {
  register,
  tokentest,
};
