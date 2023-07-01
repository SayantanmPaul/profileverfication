import { Router, application } from "express";
import * as controller from '../controller/appController.js'
import Auth, {localVariable} from '../middlewire/authentication.js';
import registerMail  from "../controller/nodemailer.js";

const router= Router();

// get method

router.route('/user/:username').get(controller.getUser)
// generate otp
// after verifying user it will go to localVariable and generate otp
router.route('/generateOTP').get(controller.verifyUser, localVariable, controller.generateOTP)
// verify the generated otp
router.route('/verifyOTP').get(controller.verifyOTP)
// reset session
router.route('/resetSession').get(controller.resetSession)

// post method

router.route('/register').post(controller.register) 
// send mail request
router.route('/registerMail').post(registerMail)
// authenticate user
router.route('/auth').post((req,res)=>res.end())
// login to the application
router.route('/login').post(controller.verifyUser, controller.login)

// put method

// update user profile
router.route('/updateUser').put(Auth, controller.updateUser)
// reset password
router.route('/resetPassword').put(controller.verifyUser, controller.resetPassword)


export default router;
