import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
});

const User = mongoose.model("users", userSchema);

export default User;
