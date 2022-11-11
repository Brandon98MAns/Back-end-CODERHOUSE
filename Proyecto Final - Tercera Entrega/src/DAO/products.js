import { logApp, logError } from "../utils/apiLogs.js";
import Product from "../models/Products.js";

class ProductsDao {
	constructor() {
		this.instance = null;
	}

	static getInstance() {
		if (!this.instance) this.instance = new ProductsDao();
		return this.instance;
	}

	async addProduct(product) {
		try {
			const productAdded = await Product.create(product);
			return productAdded;
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}

	async getAll() {
		try {
			return await Product.find({});
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}

	async get(id) {
		try {
			const product = await Product.findOne({ id });
			return product;
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}

	async getCount() {
		try {
			return await Product.collection.countDocuments();
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}

	async update(id, product) {
		try {
			return await Product.findOneAndReplace({ id }, product);
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}

	async delete(id) {
		try {
			return await Product.findOneAndDelete({ id });
		} catch (error) {
			logApp.info("*** Error ***", error);
		}
	}
}

export default ProductsDao;
