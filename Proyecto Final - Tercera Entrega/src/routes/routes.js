import { Router } from "express";
import passport from "passport";
import {
	getHome,
	getLogin,
	postLogin,
	getFailLogin,
	getSignup,
	postSignup,
	getFailSignup,
	getLogout,
	getInfo,
	getApiRandom,
	failRoute,
} from "../controllers/controllers.js";
import auth from "../middlewares/auth.js";
import { logMethodsUrl, logUrlNoExists } from "../middlewares/logs.js";

const router = Router();

router.all("*", logMethodsUrl);

// Home
router.get("/", auth, getHome);

// Login
router.get("/login", getLogin);
router.post(
	"/login",
	passport.authenticate("login", { failureRedirect: "/faillogin" }),
	postLogin
);
router.get("/faillogin", getFailLogin);

// Singup
router.get("/signup", getSignup);
router.post(
	"/signup",
	passport.authenticate("signup", { failureRedirect: "/failsignup" }),
	postSignup
);
router.get("/failsignup", getFailSignup);

// Redirect to login & signup
router.post("/redirect-signup", (req, res) => res.redirect("/signup"));
router.post("/redirect-login", (req, res) => res.redirect("/login"));

// Logout
router.post("/logout", getLogout);

// Info
router.get("/info", getInfo);

// Api Random
router.get("/api/random", getApiRandom);

// Fail route
router.all("*", logUrlNoExists, failRoute);

export default router;
