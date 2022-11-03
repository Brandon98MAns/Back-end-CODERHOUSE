import Chat from "../DAO/chat.js";
import { logger } from "../utils/apiLogs.js";

class ChatApi {
	constructor() {
		this.chatDao = new Chat();
	}

	async getAll() {
		const response = await this.chatDao.getAll();
		return response;
	}

	async saveMessage(message) {
		await this.chatDao.save(message);
		logger.info("Mensaje guardado");
	}
}

export default ChatApi;
