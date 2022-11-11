import { logApp, logWarn } from "../utils/apiLogs.js";

export const logMethodsUrl = (req, res, next) => {
	logApp.info(`Ruta: ${req.url}  Metodo: ${req.method}`);
	next();
};

export const logUrlNoExists = (req, res, next) => {
	logWarn.warn(
		`Ruta: ${req.url} y Metodo: ${req.method} no existen en este proyecto.`
	);
	next();
};
