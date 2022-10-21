import mongoose from "mongoose";

const cartsCollections = "carts";

const CartsSchema = new mongoose.Schema({
	id: { type: Number, require: true },
	nombre: { type: String, require: true, max: 100 },
	timestamp: { type: Number, require: true },
	products: [
		{
			nombre: { type: String, require: true, max: 100 },
			precio: { type: Number, require: true },
			imagen: { type: String, require: true },
			stock: { type: Number, require: true },
			descripcion: { type: String, require: true },
			id: { type: Number, require: true },
			timestamp: { type: Number, require: true },
			code: { type: String, require: true },
		},
	],
});

export const cartsModel = mongoose.model(cartsCollections, CartsSchema);
