const express=require("express");
const router=express.Router();

const {home,register,login,isValidUser
}=require("../controller/auth-controller");

router.route("/").get(home);
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/isValidUser').get(isValidUser)
module.exports=router;