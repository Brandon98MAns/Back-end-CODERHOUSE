import { Router } from "express";
import passport from "passport";

// <----- Controllers ----->
import {
	home,
	getSignin,
	getSignup,
	postSingin,
	getLogout,
	postSignup,
	getUser,
} from "../controllers/controllers.js";

import { sendMailAdmin } from "../services/sendMails.js";

// <----- Middlewares ----->
import { uploadFile, userLogged } from "../middlewares/middlewares.js";

// <----- Utils ----->
import { upload } from "../utils/upload.js";

export const router = Router();

router.get("/", home);

router.get("/signin", getSignin);
router.post(
	"/signin",
	passport.authenticate("local-signin", {
		failureRedirect: "/signin",
		passReqToCallback: true,
	}),
	postSingin
);

router.get("/signup", getSignup);
router.post(
	"/signup",
	upload.single("image"),
	uploadFile,
	passport.authenticate("local-signup", {
		failureRedirect: "/signup",
		passReqToCallback: true,
	}),
	postSignup
);

router.get("/user", getUser);

router.get("/logout", getLogout);
