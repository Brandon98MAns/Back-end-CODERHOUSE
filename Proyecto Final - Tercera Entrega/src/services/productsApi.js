import ProductsDao from "../DAO/products.js";
import { logger } from "../utils/apiLogs.js";

class ProductsApi {
	constructor() {
		this.productsDao = new ProductsDao();
	}

	async getAll() {
		const response = await this.productsDao.getAll();
		return response;
	}

	async get(id) {
		const response = await this.productsDao.get(id);
		return response;
	}

	async addProduct(product) {
		await this.productsDao.addProduct(product);
		logger.info("Producto guardado.");
	}

	async update(id, product) {
		const response = await this.productsDao.update(id, product);
		return response;
	}

	async delete(id) {
		const response = await this.productsDao.delete(id);
		return response;
	}
}

export default ProductsApi;
