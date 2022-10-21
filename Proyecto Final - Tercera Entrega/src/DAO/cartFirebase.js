import admin from "firebase-admin";
import ServiceAccount from "../../proyecto-backend-ef2b4-firebase-adminsdk-rm655-9ebea6f677.json" assert { type: "json" };
import { loggerError } from "../utils/logs.js";

admin.initializeApp({
	credential: admin.credential.cert(ServiceAccount),
});

class CartFirebase {
	constructor(collection) {
		const db = admin.firestore();
		this.query = db.collection(collection);
	}

	async getAll() {
		try {
			const response = await this.query.get();
			const docs = response.docs;
			const result = docs.map((doc) => ({
				id: doc.data().id,
				nombre: doc.data().nombre,
				timestamp: doc.data().timestamp,
				products: doc.data().products,
			}));
			return result;
		} catch (error) {
			loggerError.error(error);
		}
	}

	async get(id) {
		try {
			const doc = this.query.doc(`${id}`);
			const item = await doc.get();
			const response = item.data();
			return response;
		} catch (error) {
			loggerError.error(error);
		}
	}

	async getProducts(id) {
		const cart = await this.get(id);
		return cart.products;
	}

	async new(name = "cart") {
		const data = await this.getAll();
		if (data.length === 0) {
			const newcart = {
				nombre: name,
				id: 1,
				timestamp: Date.now(),
				products: [],
			};
			const doc = this.query.doc("1");
			await doc.create(newcart);
			return newcart;
		} else {
			const newcart = {
				nombre: name,
				id: data.length + 1,
				timestamp: Date.now(),
				products: [],
			};
			const doc = this.query.doc(`${data.length + 1}`);
			await doc.create(newcart);
			return newcart;
		}
	}

	async addProduct(id, product) {
		const cart = await this.get(id);
		product.id = cart.products.length + 1;
		product.timestamp = Date.now();
		product.code = `AA-0${cart.products.length}`;
		cart.products.push(product);
		const doc = this.query.doc(`${id}`);
		await doc.update(cart);
		return { product, cart };
	}

	async delete(id) {
		try {
			const deleted = await this.get(id);
			const doc = this.query.doc(`${id}`);
			await doc.delete();
			return deleted;
		} catch (error) {
			loggerError.error(error);
		}
	}

	async deleteProductInCart(idCart, idProduct) {
		const cart = await this.get(idCart);
		const productDeleted = cart.products.splice(idProduct - 1, 1);
		const doc = this.query.doc(`${idCart}`);
		await doc.update(cart);
		return productDeleted;
	}
}

export default CartFirebase;
