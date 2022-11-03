class ControllersPage {

	getHome = (req, res) => {
		res.render("home", { name: req.session.name });
	};

	// <----- Login ----->
	getLogin = (req, res) => {
		if (req.isAuthenticated()) {
			const { username } = req.user;
			res.render("home", { username });
		} else res.render("login");
	};

	postLogin = (req, res) => {
		const { username } = req.user;
		res.render("home", { username });
	};

	getFailLogin = (req, res) => {
		res.render("failLogin");
	};

	// <----- Signup ----->
	getSignup = (req, res) => {
		res.render("signup");
	};

	postSignup = (req, res) => {
		const { username } = req.user;
		res.render("home", { username });
	};

	getFailSignup = (req, res) => {
		res.render("failSignup");
	};

	// <----- Logout ----->
	getLogout = (req, res) => {
		req.logout((error) => {
			if (error) next(error);
		});
		res.redirect("/login");
	};

	// <----- Fail route ----->
	failRoute = (req, res) => {
		res.status(404).render("routing-error");
	};
}

export default ControllersPage;
