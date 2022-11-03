import ProductsApi from "../services/productsApi.js";
import { logger } from "../utils/apiLogs.js";

const productsApi = new ProductsApi();

class ControllersProducts {
	getAll = async (req, res) => {
		const response = await productsApi.getAll();
		res.json({ response });
	};

	get = async (req, res) => {
		const id = req.params;
		const response = await productsApi.get(id);
		res.json({ response });
	};

	addProduct = async (req, res) => {
		const product = req.params;
		// const productObj = {
		// 	name: product.name,
		// 	price: product.price,
		// 	stock: product.stock,
		// };
		const response = await productsApi.addProduct(product);
		logger.info(response);
		res.json({ product });
	};

	update = async (req, res) => {
		const { product, id } = req.params;
		const response = await productsApi.update(id, product);
		logger.info(response);
		res.json({ response });
	};

	delete = async (req, res) => {
		const { id } = req.params;
		const response = await productsApi.delete(id);
		logger.info(response);
		res.json({ response });
	};
}

export default ControllersProducts;
