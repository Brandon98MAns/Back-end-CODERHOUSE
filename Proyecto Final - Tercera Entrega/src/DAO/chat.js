import admin from "firebase-admin";
import ServiceAccount from "../../chat-con-websockets-firebase-adminsdk-creee-50dba0557a.json" assert { type: "json" };
import { logError } from "../utils/apiLogs";

admin.initializeApp({
	credential: admin.credential.cert(ServiceAccount),
});

class Chat {
	constructor() {
		const db = admin.firestore();
		this.query = db.collection("chat");
	}

	async getAll() {
		try {
			const response = await this.query.get();
			const docs = response.docs;
			const result = docs.map((doc) => ({
				author: {
					alias: doc.data().author.alias,
					apellido: doc.data().author.apellido,
					avatar: doc.data().author.avatar,
					edad: doc.data().author.edad,
					nombre: doc.data().author.nombre,
					id: doc.data().author.id,
				},
				text: doc.data().text,
			}));
			return result;
		} catch (error) {
			logError.error(`Error en api: ${error}`);
		}
	}

	async save(message) {
		try {
			const data = await this.getAll();
			if (data.length === 0) {
				const doc = this.query.doc("1");
				await doc.create(message);
			} else {
				const doc = this.query.doc(`${data.length + 1}`);
				await doc.create(message);
			}
		} catch (error) {
			logError.error(`Error en api: ${error}`);
		}
	}
}

export default Chat;
