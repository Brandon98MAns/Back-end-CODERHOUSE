import { Router } from "express";
export const routerProduct = Router();

// <------ Middleware ------>

import { admin } from "../middlewares/middlewares.js";

// <------ Controllers ------>

import {
	getHome,
	postHome,
	putHome,
	deleteHome,
} from "../controllers/products.controllers.js";

// <------ Queries ------>

routerProduct.get("/:id?", getHome);
routerProduct.post("/", admin.admin, postHome);
routerProduct.put("/:id", admin.admin, putHome);
routerProduct.delete("/:id", admin.admin, deleteHome);
