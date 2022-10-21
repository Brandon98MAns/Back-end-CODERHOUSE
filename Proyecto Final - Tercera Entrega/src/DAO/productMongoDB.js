import { loggerError } from "../utils/logs.js";

class ProductMongoDB {
	constructor(schema) {
		this.schema = schema;
	}

	async getAll() {
		const response = await this.schema.find();
		return response;
	}

	async get(id) {
		const data = await this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: "El producto con el id especificado no ha sido encontrado.",
			};
		} else {
			const result = data.find((element) => element.id === id);
			return result;
		}
	}

	async save(product) {
		const data = this.getAll();
		product.timestamp = Date.now();
		product.id = data.length + 1;
		product.code = `AA-0${data.length}`;
		const response = new this.schema(product).save();
		return response;
	}

	// async saveMany(products) {
	// 	const productsSave = await this.schema.create(products);
	// 	return productsSave;
	// }

	async update(id, product) {
		const data = await this.getAll();
		if (id <= 0 || id > data.length) {
			return loggerError.error(
				"El producto con el id especificado no ha sido encontrado."
			);
		} else {
			product.timestamp = Date.now();
			product.id = data.length + 1;
			product.code = `AA-0${data.length}`;
			const response = await this.schema.findOneAndUpdate(
				{
					id: { $eq: id },
				},
				product
			);
			return {
				previous: response,
				new: product,
			};
		}
	}

	async delete(id) {
		const data = await this.getAll();
		if (id <= 0 || id > data.length) {
			return loggerError.error(
				"El producto con el id especificado no ha sido encontrado."
			);
		} else {
			const response = await this.schema.find({ id: { $eq: id } });
			await this.schema.deleteOne({ id: { $eq: id } });
			return {
				deleted: response,
			};
		}
	}
}

export default ProductMongoDB;
