import { Router } from "express";
import { registerUser, verifyEmail, loginUser ,logoutUser } from "../controllers/auth.controllers.js";
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
export default router;

