import supertest from "supertest";
const request = supertest("http://localhost:8080/api/products");
import { expect } from "chai";
import { logApp } from "../utils/apiLogs.js";

describe("test api productos", () => {
	describe("GET", () => {
		it("Deberia retornar un status 200", async () => {
			const response = await request.get("/");

			expect(response.status).to.eql(200);
		});
	});

	describe("POST", () => {
		it("Debería incorporar un nuevo producto", async () => {
			const product = {
				name: "horno",
				price: 3400,
				stock: 6,
				id: 4,
			};

			const response = await request.post("/add").send(product);
			expect(response.status).to.eql(200);
			const productTest = response.body.response;
			expect(productTest.name).to.eql(product.name);
			expect(productTest.id).to.eql(product.id);
		});
	});

	describe("PUT", () => {
		it("Deberia actualizar un producto", async () => {
			const product = {
				name: "escritorio",
				price: 1450,
				stock: 21,
				id: 4,
			};

			const response = await request.put("/update?id=4").send(product);
			expect(response.status).to.eql(200);
		});
	});

	describe("DELETE", () => {
		it("Deberia eliminar un producto", async () => {
			const response = await request.delete("/remove?id=4");
			expect(response.status).to.eql(200);
		});
	});
});
