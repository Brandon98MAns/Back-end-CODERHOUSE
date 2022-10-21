import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../models/users.js";

passport.use(
	"local-signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			const userExists = await User.findOne({ email });

			if (userExists) {
				return done(
					null,
					false,
					req.flash("signupMessage", "El correo electronico ya esta en uso.")
				);
			} else {
				const newUser = new User();
				newUser.email = email;
				newUser.password = newUser.encryptPassword(password);
				newUser.name.first = req.body.firstname;
				newUser.name.last = req.body.lastname;
				newUser.address = req.body.address;
				newUser.age = req.body.age;
				newUser.phone = req.body.phone;
				newUser.image = req.file.filename;

				await newUser.save();
				return done(null, newUser);
			}
		}
	)
);

passport.use(
	"local-signin",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
			passReqToCallback: true,
		},
		async (req, email, password, done) => {
			const user = await User.findOne({ email });
			if (!user) {
				return done(
					null,
					false,
					req.flash("signinMessage", "Usuario no encontrado.")
				);
			} else if (!user.comparePassword(password)) {
				return done(
					null,
					false,
					req.flash("signinMessage", "Contraseña incorrecta.")
				);
			} else {
				return done(null, user);
			}
		}
	)
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
	const user = await User.findById(id);
	done(null, user);
});
