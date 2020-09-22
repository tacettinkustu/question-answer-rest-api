const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "please insert a name"],
  },
  email: {
    type: String,
    required: [true, "please provide a email"],
    unique: [true, "please try different email"],
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "please insert a valid email",
    ],
  },
  role: {
    type: String,
    default: "user",
    enum: ["user", "admin"],
  },
  password: {
    type: String,
    minlength: [6, "please provide a password with min length 6"],
    required: [true, "please provide a password"],
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
  },
  about: {
    type: String,
  },
  place: {
    type: String,
  },
  website: {
    type: String,
  },
  profile_image: {
    type: String,
    default: "default.jpg",
  },
  blocked: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", function (next) {
  if(!this.isModified("password")) {
    next();
  }
  bcrypt.genSalt(10,(err, salt) => {
    if(err)next(err);
    bcrypt.hash(this.password, salt, (err, hash) => {
      if(err)next(err);
      this.password=hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
