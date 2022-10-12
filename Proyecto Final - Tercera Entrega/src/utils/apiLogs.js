import log4js from "log4js";

log4js.configure({
	appenders: {
		rutes: { type: "console" },
		rutesWarn: { type: "file", filename: "src/logs/warn.log"},
		apis: { type: "file", filename: "src/logs/error.log" },
	},
	categories: {
		default: { appenders: ["rutes"], level: "info" },
		ruterwarn: { appenders: ["rutesWarn"], level: "warn" },
		apis: { appenders: ["apis"], level: "error" },
	},
});

export const loggerRutes = log4js.getLogger("rutes");

export const loggerRutesWarn = log4js.getLogger("rutesWarn");

export const loggerApis = log4js.getLogger("apis");
