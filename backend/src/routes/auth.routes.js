import { Router } from "express";
import { registerUser, verifyEmail, loginUser ,logoutUser,getCurrentUser,getCurrentUserbyid } from "../controllers/auth.controllers.js";
import { validate } from "../middlewares/validator.middleware.js";
import { userRegisterValidator } from "../validators/index.js";
import isLoggedIn from "../middlewares/checkuser.middleware.js";


const router = Router();

router.route("/register")
  .post(userRegisterValidator(), validate, registerUser);

router.route("/verifyemail/:token")
  .get(verifyEmail);


router.route("/loginUser")
  .post(loginUser);


router.route("/logout")
  .post(isLoggedIn, logoutUser);

  router.route("/getCurrentUser")
  .get(isLoggedIn, getCurrentUser);


router.route("/getCurrentUserbyid/:userId")
  .get( getCurrentUserbyid);


  
export default router;

