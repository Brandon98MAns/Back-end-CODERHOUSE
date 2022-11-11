import ProductsDao from "../DAO/products.js";
import { logApp } from "../utils/apiLogs.js";

class ProductsApi {
	constructor() {
		this.productsDao = ProductsDao.getInstance();
		this.instance = null;
	}

	static getInstance() {
		if (!this.instance) this.instance = new ProductsApi();
		return this.instance;
	}

	async getAll() {
		try {
			const response = await this.productsDao.getAll();
			return response;
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}

	async get(id) {
		try {
			const response = await this.productsDao.get(id);
			if (!response) return { message: "El id especificado no existe" };
			return response;
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}

	async getCount() {
		return await this.productsDao.getCount();
	}

	async addProduct(product) {
		try {
			const productSended = await this.productsDao.addProduct(product);
			return productSended;
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}

	async update(id, product) {
		try {
			const response = await this.productsDao.update(id, product);
			return response;
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}

	async delete(id) {
		try {
			const response = await this.productsDao.delete(id);
			return response;
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}
}

export default ProductsApi;
