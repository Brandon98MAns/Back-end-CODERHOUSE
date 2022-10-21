import express from "express";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { error404 } from "./middlewares/middlewares.js";
import flash from "connect-flash";

export const app = express();
import * as passportAuth from "./middlewares/auth.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use("/imgs", express.static(`public/imgs`));

// <---------- Sessions ---------->

app.use(cookieParser("secret"));
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		// cookie: { maxAge: 60000 * 5 },
	})
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
	res.locals.signupMessage = req.flash("signupMessage");
	res.locals.signinMessage = req.flash("signinMessage");
	next();
});

// <---------- Engine Pug ---------->

app.set("view engine", ".pug");
app.set("views", "./src/views");

// <---------- Routes ---------->

import { routerCart, routerProduct, router } from "./routes/index.js";

app.use("/api/carrito", routerCart);
app.use("/api/productos", routerProduct);
app.use(router);

// <---------- Servidor Error 404 ---------->

app.use(error404);
