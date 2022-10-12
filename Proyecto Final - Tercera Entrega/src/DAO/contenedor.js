import knex from "knex";

class Contenedor {
	constructor({ options, table }) {
		this.table = table;
		this.knex = knex(options);
	}

	async newTable() {
		try {
			return this.knex.schema.dropTableIfExists(this.table).finally(() => {
				return this.knex.schema.createTable(this.table, (table) => {
					table.increments("id").primary();
					table.string("nombre", 50).notNullable();
					table.float("precio");
					table.integer("stock");
					table.string("imagen");
					table.string("codigo", 50).notNullable();
				});
			});
		} catch (error) {
			throw new Error(`Error al crear tabla: ${error}`);
		}
	}

	async getAll() {
		try {
			const response = [];
			await this.knex
				.select()
				.from(this.table)
				.then((rows) => {
					for (const row of rows) {
						response.push(row);
					}
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
			return response;
			// .finally(() => {
			// 	this.knex.destroy();
			// });
		} catch (error) {
			throw new Error(`Error al listar todo: ${error}`);
		}
	}

	async get(id) {
		try {
			const response = [];
			await this.knex
				.from(this.table)
				.where("id", "=", id)
				.select()
				.then((rows) => {
					for (const row of rows) {
						response.push(row);
					}
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
			return response;
		} catch (error) {
			throw new Error(`Error al obtener un producto: ${error}`);
		}
	}

	async save(product) {
		try {
			await this.knex.schema.hasTable(this.table).then(async (exists) => {
				if (!exists) {
					await this.newTable();
					await this.knex
						.insert(product)
						.from(this.table)
						.then(() => console.log("producto guardado."))
						.catch((err) => {
							console.log(err);
							throw err;
						});
					// .finally(() => {
					// 	this.knex.destroy();
					// });
				} else {
					await this.knex
						.insert(product)
						.from(this.table)
						.then(() => console.log("producto guardado."))
						.catch((err) => {
							console.log(err);
							throw err;
						});
					// .finally(() => {
					// 	this.knex.destroy();
					// });
				}
			});
		} catch (error) {
			throw new Error(`Error al guardar un producto: ${error}`);
		}
	}

	async update(id, product) {
		try {
			const productPrevious = await this.knex
				.from(this.table)
				.where("id", "=", id)
				.select();
			await this.knex
				.from(this.table)
				.where("id", "=", id)
				.select()
				.update(product)
				.then(() => {
					console.log("producto actualizado.");
				})
				.catch((err) => {
					console.log(err);
					throw err;
				});
			return {
				productPrevious: productPrevious,
				productUpdate: product,
			};
		} catch (error) {
			throw new Error(`Error al actualizar un producto: ${error}`);
		}
	}

	async delete(id) {
		try {
			const productDeleted = [];
			await this.knex
				.from(this.table)
				.where("id", "=", id)
				.select()
				.then((rows) => {
					for (const row of rows) {
						productDeleted.push(row);
					}
				});
			await this.knex
				.from(this.table)
				.where("id", "=", id)
				.select()
				.del()
				.then(() => console.log("producto eliminado."))
				.catch((err) => {
					console.log(err);
					throw err;
				})
				.finally(async () => {
					const response = await this.getAll();
					console.log("a punto de recrear la tabla");
					await this.newTable();
					response.forEach(async (data) => {
						await this.save(data);
					});
				});
			return { deleted: productDeleted };
		} catch (error) {
			throw new Error(`Error al eliminar un producto: ${error}`);
		}
	}
}

export default Contenedor;
