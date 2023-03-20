import express from "express";
const router = express.Router();
import userController from "../controllers/userController.js";
import userAuth from "../middlewares/auth-middleware.js";


// unprotected
router.post('/register',userController.userRegister);
router.post('/login',userController.userLogin);


// for sending reset Password  mail 

router.post('/sendReset/mail',userController.sendResetPasswordMail);

// for changing the password through mail 

router.post('/mail/changepassword/:id/:authToken',userController.changePasswordThrough_mail)

// create routes for send reset mail and changing pass through that mail
// router.post('/sendReset/mail',userController.reset)

//protected
router.use('/changePassword', userAuth);
router.post("/changePassword",userController.userChangePassword);






export default router;