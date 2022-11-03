import log4js from "log4js";

log4js.configure({
	appenders: {
		app: { type: "stdout" },
		rutes: { type: "stdout" },
		rutesWarn: { type: "file", filename: "src/logs/warn.log" },
		apis: { type: "file", filename: "src/logs/error.log" },
	},
	categories: {
		default: { appenders: ["app", "rutes"], level: "info" },
		ruterwarn: { appenders: ["rutesWarn"], level: "warn" },
		apis: { appenders: ["apis"], level: "error" },
	},
});

export const logger = log4js.getLogger("app");

export const loggerRutes = log4js.getLogger("rutes");

export const loggerRutesWarn = log4js.getLogger("rutesWarn");

export const loggerApis = log4js.getLogger("apis");
