import axios from "axios";
import { logApp } from "../utils/apiLogs.js";

const URL_BASE = "http://localhost:8080/api/products";

async function getProducts() {
	axios
		.get(`${URL_BASE}`)
		.then((response) => {
			logApp.info(response);
		})
		.catch((error) => {
			logApp.info(error);
		});
}

getProducts();
