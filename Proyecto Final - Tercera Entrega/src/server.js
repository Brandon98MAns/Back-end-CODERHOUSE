import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import compression from "compression";
import cors from "cors";
import config from "../config.js";
import RouterPage from "./routes/routes.js";
import mongoose from "mongoose";
import { logApp, logError } from "./utils/apiLogs.js";
import { graphqlHTTP } from "express-graphql";
import { graphqlSchema, root } from "./models/Graphql.js";
import * as dotenv from "dotenv";
dotenv.config();

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

app.use(
	"/graphql",
	graphqlHTTP({
		schema: graphqlSchema,
		rootValue: root,
		// graphiql: true,
	})
);

const routerPage = new RouterPage();
app.use("/", routerPage.start());

const PORT = config.PORT;

const server = app.listen(PORT, () => {
	mongoose.connect(process.env.MONGO_CONNECT);
	logApp.info(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => logError.error(`Error en servidor: ${error}`));
