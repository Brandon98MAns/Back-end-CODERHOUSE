export const error404 = (req, res, next) => {
	const message = {
		error: 404,
		descripcion: `ruta ${req.url} y metodo ${req.method} no estan implementados`,
	};
	if (req.url !== "/" || (req.url === "/" && req.method !== "GET")) {
		res.status(404).json(message);
	} else {
		next();
	}
};

export const admin = {
	access: true,
	admin(req, res, next) {
		const { admin } = req.body;

		if (admin === admin.access) {
			// req.body.admin = "true";
			next();
		} else {
			// req.body.admin != "true";
			res.status(404).json({ error: "Acceso no autorizado" });
		}
	},
};

export const uploadFile = (req, res, next) => {
	const file = req.file;
	if (file) {
		next();
	} else {
		res.send("No has subido ningun archivo <a href='/signup'>Registrarse</a>");
	}
};

export const userLogged = (req, res, next) => {};
