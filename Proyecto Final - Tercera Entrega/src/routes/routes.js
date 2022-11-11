import { Router } from "express";
import passport from "passport";
import ControllersPage from "../controllers/controllers.js";
import auth from "../middlewares/auth.js";
import { logMethodsUrl, logUrlNoExists } from "../middlewares/logs.js";

const router = Router();


class RouterPage {
	constructor() {
		this.controllerPage = new ControllersPage();
	}

	start() {
		router.all("*", logMethodsUrl);

		// Home
		router.get("/", auth, this.controllerPage.getHome);

		// Login
		router.get("/login", this.controllerPage.getLogin);
		router.post(
			"/login",
			passport.authenticate("login", { failureRedirect: "/faillogin" }),
			this.controllerPage.postLogin
		);
		router.get("/faillogin", this.controllerPage.getFailLogin);

		// Singup
		router.get("/signup", this.controllerPage.getSignup);
		router.post(
			"/signup",
			passport.authenticate("signup", { failureRedirect: "/failsignup" }),
			this.controllerPage.postSignup
		);
		router.get("/failsignup", this.controllerPage.getFailSignup);

		// Redirect to login & signup
		router.post("/redirect-signup", (req, res) => res.redirect("/signup"));
		router.post("/redirect-login", (req, res) => res.redirect("/login"));

		// Logout
		router.post("/logout", this.controllerPage.getLogout);

		// Fail route
		router.all("*", logUrlNoExists, this.controllerPage.failRoute);

		return router;
	}
}

export default RouterPage;
