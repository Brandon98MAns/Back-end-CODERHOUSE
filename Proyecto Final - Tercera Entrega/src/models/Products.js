import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
	name: { type: String, required: true },
	price: { type: Number, required: true },
	stock: { type: Number, required: true },
	id: { type: Number, required: true },
});

const Product = mongoose.model("products", productSchema);

export default Product;
