import { logger, loggerApis } from "../utils/apiLogs.js";
import Product from "../models/Products.js";

class ProductsDao {
	async addProduct(product) {
		Product.create(product, (error) => {
			if (error) loggerApis.error("Error agregando un nuevo producto", error);
			logger.info("Producto agregado");
		});
	}

	async getAll() {
		return await Product.find({});
	}

	async get(id) {
		return await Product.findOne({ id });
	}

	async update(id, product) {
		return await Product.findOneAndReplace({ id }, product);
	}

	async delete(id) {
		return await Product.findOneAndDelete({ id });
	}
}

export default ProductsDao;
