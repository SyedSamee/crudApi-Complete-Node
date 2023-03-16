import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import userAuth from "../middlewares/auth-middleware.js";


// unprotected
router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin);




//protected
router.use('/changePassword', userAuth);
router.post("/changePassword",userController.userChangePassword);


export default router;