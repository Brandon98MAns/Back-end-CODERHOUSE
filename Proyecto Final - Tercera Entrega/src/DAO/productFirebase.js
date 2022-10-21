import admin from "firebase-admin";
import ServiceAccount from "../../proyecto-backend-ef2b4-firebase-adminsdk-rm655-9ebea6f677.json" assert { type: "json" };
import { loggerError } from "../utils/logs.js";

admin.initializeApp({
	credential: admin.credential.cert(ServiceAccount),
});

class ProductFirebase {
	constructor(collection) {
		const db = admin.firestore();
		this.query = db.collection(collection);
	}

	async getAll() {
		try {
			const response = await this.query.get();
			const docs = response.docs;
			const result = docs.map((doc) => ({
				id: doc.id,
				nombre: doc.data().nombre,
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

	async save(product) {
		try {
			const data = await this.getAll();
			const id = data.length + 1;
			const doc = this.query.doc(`${id}`);
			product.timestamp = Date.now();
			product.code = `AA-0${data.length}`;
			await doc.create(product);
			return product;
		} catch (error) {
			loggerError.error(error);
		}
	}

	async update(id, product) {
		try {
			const doc = this.query.doc(`${id}`);
			product.timestamp = Date.now();
			product.code = `AA-0${id - 1}`;
			const item = await doc.update(product);
			return { product: product, item: item };
		} catch (error) {
			loggerError.error(error);
		}
	}

	async delete(id) {
		try {
			const deleted = await this.get(id);
			const doc = this.query.doc(id);
			const item = await doc.delete();
			return deleted;
		} catch (error) {
			loggerError.error(error);
		}
	}
}

export default ProductFirebase;
