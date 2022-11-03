import { Router } from "express";
import ControllersProducts from "../controllers/products.js";

const router = Router();

class RouterProducts {
	constructor() {
		this.controllersProducts = new ControllersProducts();
	}

	start() {
		router.get("/", this.controllersProducts.getAll);
		router.get("/:id", this.controllersProducts.get);
		router.put("/:id", this.controllersProducts.update);
		router.delete("/remove", this.controllersProducts.delete);
		router.post("/add", this.controllersProducts.addProduct);

		return router;
	}
}

export default RouterProducts;
