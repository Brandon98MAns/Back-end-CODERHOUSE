import log4js from "log4js";

log4js.configure({
	appenders: {
		app: { type: "stdout" },
		debugError: { type: "file", filename: "src/logs/error.log" },
		debugWarning: { type: "file", filename: "src/logs/warning.log" },
	},
	categories: {
		default: {
			appenders: ["app"],
			level: "info",
		},
		error: {
			appenders: ["debugError"],
			level: "error",
		},
		warning: {
			appenders: ["debugWarning"],
			level: "warn",
		}
	},
});

export const logger = log4js.getLogger("app");
export const loggerError = log4js.getLogger("error");
export const loggerWarning = log4js.getLogger("warning");

// logger.info("Log info de prueba/referencia");
// loggerError.error("Log error de prueba/referencia");
// loggerWarning.warn("Log warning de prueba/referencia");
