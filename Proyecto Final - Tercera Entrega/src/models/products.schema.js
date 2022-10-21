import mongoose from "mongoose";

const productsCollections = "products";

const ProductsSchema = new mongoose.Schema({
	nombre: { type: String, require: true, max: 100 },
	precio: { type: Number, require: true },
	imagen: { type: String, require: true },
	stock: { type: Number, require: true },
	descripcion: { type: String, require: true },
	id: { type: Number, require: true },
	timestamp: { type: Number, require: true },
	code: { type: String, require: true },
});

export const productsModel = mongoose.model(
	productsCollections,
	ProductsSchema
);
