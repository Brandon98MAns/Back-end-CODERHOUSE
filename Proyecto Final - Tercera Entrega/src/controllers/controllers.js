import { User } from "../models/users.js";
import { sendMailAdmin } from "../services/sendMails.js";

export const home = async (req, res) => {
	if (req.user) {
		const username = `${req.user.name.first} ${req.user.name.last}`;
		const imageUser = req.user.image;
		res.render("home", { dataUser: { img: imageUser, name: username } });
	} else {
		res.render("home", { dataUser: false });
	}
};

export const getSignin = (req, res) => {
	if (req.isAuthenticated()) {
		res.redirect("/");
	} else res.render("signin");
};

export const postSingin = (req, res) => {
	res.redirect("/");
};

export const getSignup = (req, res) => res.render("signup");

export const postSignup = async (req, res) => {
	const dataUser = req.user;
	sendMailAdmin(dataUser);
	res.redirect("/");
};

export const getUser = (req, res) => {
	if (req.user) {
		const name = `${req.user.name.first} ${req.user.name.last}`;
		const img = req.user.image;
		const email = req.user.email;
		const address = req.user.address;
		const age = req.user.age;
		const phone = req.user.phone;

		res.render("user", { dataUser: { img, name, email, address, age, phone } });
	} else {
		res.redirect("/");
	}
};

export const getLogout = async (req, res, next) => {
	await req.logout((err) => {
		if (err) return next(err);
		res.redirect("/");
	});
};
