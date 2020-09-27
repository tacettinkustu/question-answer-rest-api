const express = require("express");
const {getSingleUser,getAllUsers}= require("../controllers/user");
const {checkUserExist} = require("../middlewares/database/databaseErrorHelpers")

const router = express.Router();

router.get("/",getAllUsers)
router.get("/:id",checkUserExist,getSingleUser);
module.exports = router;