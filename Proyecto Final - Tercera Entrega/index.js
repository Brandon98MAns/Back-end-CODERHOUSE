import mongoose from "mongoose";
import { app } from "./src/server.js";
import { logger, loggerError } from "./src/utils/logs.js";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, async () => {
	await mongoose
		.connect(process.env.MONGO_CONNECT)
		.then((db) => logger.info("Base de datos conectada"))
		.catch((err) => loggerError.error(err));
	logger.info(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on("error", (error) => loggerError.error(`Error en servidor ${error}`));
