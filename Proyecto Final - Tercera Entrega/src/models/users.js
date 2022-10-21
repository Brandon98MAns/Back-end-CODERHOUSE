import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	name: {
		first: { type: String, required: true },
		last: { type: String, required: true },
	},
	address: { type: String, required: true },
	age: { type: Number, required: true },
	phone: { type: Number, required: true },
	image: { type: String, required: true },
});

userSchema.methods.encryptPassword = (password) => {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

export const User = mongoose.model("users", userSchema);
