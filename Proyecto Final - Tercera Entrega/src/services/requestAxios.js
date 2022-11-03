import axios from "axios";
import { logger } from "../utils/apiLogs.js";

const URL_BASE = "http://localhost:8080/api/products";

async function getProducts() {
	axios
		.get(`${URL_BASE}`)
		.then((response) => {
			logger.info(response);
		})
		.catch((error) => {
			logger.info(error);
		});
}

getProducts();
