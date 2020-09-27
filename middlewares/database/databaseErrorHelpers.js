const User = require("../../models/User");
const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");

const checkUserExist = asyncErrorWrapper(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findById(id);
  
    if (!user) {
      return next(new CustomError("There is no such user with this id", 400));
    }
    next();
})

module.exports={checkUserExist};