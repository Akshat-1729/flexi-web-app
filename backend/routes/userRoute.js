import express from "express";
import { Login, Register, bookmark, follow, getMyProfile, getOtherUsers, logout, unfollow, uploadProfileImage } from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Specify the destination folder for uploaded files

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated, bookmark);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/unfollow/:id").post(isAuthenticated, unfollow);
router.route("/uploadProfileImage/:id").post( uploadProfileImage);

export default router;