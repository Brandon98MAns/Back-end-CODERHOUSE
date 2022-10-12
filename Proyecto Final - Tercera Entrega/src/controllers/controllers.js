import { fork } from "child_process";
import os from "os";
const numCPUs = os.cpus().length;

export const getHome = (req, res) => {
	res.render("home", { name: req.session.name });
};

// Login
export const getLogin = (req, res) => {
	if (req.isAuthenticated()) {
		const { username } = req.user;
		res.render("home", { username });
	} else res.render("login");
};

export const postLogin = (req, res) => {
	const { username } = req.user;
	res.render("home", { username });
};

export const getFailLogin = (req, res) => res.render("failLogin");

// Singup
export const getSignup = (req, res) => res.render("signup");

export const postSignup = (req, res) => {
	const { username } = req.user;
	res.render("home", { username });
};

export const getFailSignup = (req, res) => res.render("failSignup");

// Logout
export const getLogout = (req, res) => {
	req.logout((error) => {
		if (error) next(error);
	});
	res.redirect("/login");
};

// Info
export const getInfo = (req, res) => {
	let args = (process.argv.slice(2).length) <= 2 ? "Sin argumentos" : process.argv.slice(2);

	const info = [
		args, // Argumentos de entrada
		process.platform, // Sistema operativo
		process.version, // Version de Node
		process.memoryUsage().rss, // Memoria total reservada
		process.argv[0], // Path de ejecucion
		process.pid, // Process ID
		process.cwd(), // Carpeta del proyecto
		numCPUs,// Numero de procesadores presentes del servidor
	];
	res.render("info", { lista: info });
};


// Api Random
export const getApiRandom = (req, res) => {
	const { cant } = req.query;
	const forked = fork("./src/utils/apiRandom.js");
	forked.send({ msg: "start", cant });
	forked.on("message", (msg) => {
		res.json({ msg });
	});
};

export const failRoute = (req, res) => res.status(404).render("routing-error");
