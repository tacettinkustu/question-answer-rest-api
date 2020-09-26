const User = require("../models/User");
const CustomError = require("../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const { generateJWTFromUser } = require("../models/User");
const { sendJwtToClient } = require("../helpers/authorization/tokenHelpers");
const {
  validateUserInput,
  comparePassword,
} = require("../helpers/input/inputHelpers");

const register = asyncErrorWrapper(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendJwtToClient(user, res);
});

const login = asyncErrorWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!validateUserInput(email, password)) {
    return next(new CustomError("Please check your inputs", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!comparePassword(password, user.password)) {
    return next(new CustomError("Please provide a correct password", 400));
  }

  sendJwtToClient(user, res);
});

const logout = asyncErrorWrapper(async (req, res, next) => {
  const { NODE_ENV } = process.env;

  return res
    .status(200)
    .cookie({
      httpOnly: true,
      expires: new Date(Date.now()),
      secure: NODE_ENV === "development" ? false : true,
    })
    .json({
      success: true,
      message: "Logout successful",
    });
});

const getUser = (req, res, next) => {
  res.json({
    success: true,
    data: {
      id: req.user.id,
      name: req.user.name,
    },
  });
};

const imageUpload = asyncErrorWrapper(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(
    req.user.id,
    {
      profile_image: req.savedProfileImage,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    success: true,
    message: "Image upload successful",
    data:user,
  });
});
const forgotPassword = asyncErrorWrapper(async (req, res, next) => {

  const resetEmail = req.body.email;
  const user = await User.findOne({email: resetEmail});

  if(!user){
    return next(new CustomError("This email doesn't exist",400))
  }
  const resetPasswordToken = user.getResetPasswordTokenFromUser();

  await user.save();

  res.json({
    success:true,
    message:"Token sent to your email"
  })

})

module.exports = {
  register,
  getUser,
  login,
  logout,
  imageUpload,
  forgotPassword,
};
