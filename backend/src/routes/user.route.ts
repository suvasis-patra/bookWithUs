import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller";
import { userAuth } from "../middlewares/auth.middlewares";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

// protected route

router.route("/logout").get(userAuth, logoutUser);
router.route("/current-user").get(userAuth, getCurrentUser);
export default router;
