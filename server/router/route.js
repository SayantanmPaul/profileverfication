import { Router, application } from "express";
import * as controller from '../controller/appController.js'
import Auth from '../middlewire/authentication.js';

const router= Router();

// get method

router.route('/user/:username').get(controller.getUser)
// generate otp
router.route('/generateOTP').get(controller.generateOTP)
// verify the generated otp
router.route('/verify OTP').get(controller.verifyOTP)
// reset session
router.route('/resetSession').get(controller.resetSession)

// post method

router.route('/register').post(controller.register) 
// send mail request
router.route('/registerMail').post()
// authenticate user
router.route('/auth').post((req,res)=>res.end())
// login to the application
router.route('/login').post(controller.verifyUser, controller.login)

// put method

// update user profile
router.route('/updateUser').put(Auth, controller.updateUser)
// reset password
router.route('/resetPassword').put(controller.resetPassword)


export default router;
