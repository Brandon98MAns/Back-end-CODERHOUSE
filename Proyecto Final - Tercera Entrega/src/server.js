import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import compression from "compression";
import cors from "cors";
import config from "../config.js";
import RouterPage from "./routes/routes.js";
import RouterProducts from "./routes/products.js";
import { logger } from "./utils/apiLogs.js";

const app = express();

if (config.NODE_ENV === "development") app.use(cors());

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

const routerPage = new RouterPage();
app.use("/", routerPage.start);

const routerProducts = new RouterProducts();
app.use("/api/products", routerProducts.start());

export default app;
