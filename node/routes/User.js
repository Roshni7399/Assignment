import express from "express";
import {userSignup,userLogin,getUserDataById,updateUser,forgetpassword,resetpassword} from '../controller/User';
import {verifyToken} from '../middleware/verifyToken'

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.put("/getByID", getUserDataById);
router.post("/update",updateUser);
router.post("/forgetpassword",forgetpassword);
router.post("/resetpass/:token",resetpassword)






export default router;