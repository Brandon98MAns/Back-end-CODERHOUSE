import { loggerRutes, loggerRutesWarn } from "../utils/apiLogs.js";

export const logMethodsUrl = (req, res, next) => {
	loggerRutes.info(`Ruta: ${req.url}  Metodo: ${req.method}`);
	next();
};

export const logUrlNoExists = (req, res, next) => {
	loggerRutesWarn.warn(
		`Ruta: ${req.url} y Metodo: ${req.method} no existen en este proyecto.`
	);
	next();
};
