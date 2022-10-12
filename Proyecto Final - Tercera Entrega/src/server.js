import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import router from "./routes/routes.js";
import compression from "compression";


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(compression());

const ageCookie = (minutes) => {
	if (minutes === 1) {
		return 60000;
	} else {
		return minutes * 60000;
	}
};

app.use(cookieParser());
app.use(
	session({
		secret: "secret",
		resave: false,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: ageCookie(2),
			secure: false,
			httpOnly: false,
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", ".pug");
app.set("views", "./src/views");

app.use(router);

export default app;
