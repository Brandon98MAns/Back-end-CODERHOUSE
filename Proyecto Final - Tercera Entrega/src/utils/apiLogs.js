import log4js from "log4js";

log4js.configure({
	appenders: {
		app: { type: "stdout" },
		warn: { type: "file", filename: "src/logs/warn.log" },
		error: { type: "file", filename: "src/logs/error.log" },
	},
	categories: {
		default: { appenders: ["app"], level: "info" },
		warn: { appenders: ["warn"], level: "warn" },
		error: { appenders: ["error"], level: "error" },
	},
});

export const logApp = log4js.getLogger("app");

export const logWarn = log4js.getLogger("warn");

export const logError = log4js.getLogger("error");
