import express from "express";
import {userSignup,userLogin,getUserDataById,updateUser} from '../controller/User';
import {verifyToken} from '../middleware/verifyToken'

const router = express.Router();

router.post("/signup", userSignup);
router.post("/login", userLogin);
router.put("/getByID", getUserDataById);
router.post("/update",updateUser);






export default router;