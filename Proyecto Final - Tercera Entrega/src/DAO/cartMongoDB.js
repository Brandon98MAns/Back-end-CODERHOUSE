class CartMongoDB {
	constructor(schema) {
		this.schema = schema;
	}

	/**
	 * Obtiene todos los carritos.
	 * @returns {Array}
	 */
	async getAll() {
		const response = await this.schema.find();
		return response;
	}

	/**
	 * Obtiene un carrito por su id
	 * @param {Number} id
	 * @returns {Object}
	 */
	async get(id) {
		const data = await this.getAll();
		if (id <= 0 || id > data.length) {
			const message = {
				error: "El producto con el id especificado no ha sido encontrado.",
			};
			return message;
		} else {
			const result = data.find((element) => element.id === id);
			return result;
		}
	}

	/**
	 * Obtiene todos los productos que tenga un carrito
	 * por su id de carrito.
	 * @param {Number} idCart
	 */
	async getProducts(idCart) {
		const cart = await this.get(idCart);
		if (cart.error) {
			return cart.error;
		} else {
			return cart.products;
		}
	}

	/**
	 *
	 * @param {String} name
	 * @returns {OBject} response
	 */
	async new(name = "cart") {
		const data = await this.getAll();
		if (data.length === 0) {
			const newCart = {
				id: 1,
				nombre: name,
				timestamp: Date.now(),
			};
			const response = new this.schema(newCart).save();
			return response;
		} else {
			const newCart = {
				id: data.length + 1,
				nombre: name,
				timestamp: Date.now(),
			};
			const response = new this.schema(newCart).save();
			return response;
		}
	}

	/**
	 * Agrega un producto, al carrito por medio de su id.
	 * @param {Number} id
	 * @param {Object} product
	 * @returns
	 */
	async addProduct(id, product) {
		const data = await this.getAll();
		const cart = await this.get(id);
		if (data.length === 0) {
			return {
				error: "No hay ningun carrito creado.",
			};
		} else if (cart.error) {
			return cart.error;
		} else {
			const updateProducts = await this.schema.findOneAndUpdate(
				{ id: id },
				{
					$push: {
						products: {
							nombre: product.nombre,
							precio: product.precio,
							imagen: product.imagen,
							descripcion: product.descripcion,
							stock: product.stock,
							id: cart.products.length + 1,
							timestamp: Date.now(),
							code: `AA-0${cart.products.length}`,
						},
					},
				}
			);
			const result = await this.schema.find({ id: id });
			return result;
		}
	}

	/**
	 * Elimina un carrito y su contenido.
	 * @param {Number} id
	 * @returns {Object} response
	 */
	async delete(id) {
		const data = await this.getAll();
		if (data.length === 0) {
			return {
				error: "No hay ningun carrito creado.",
			};
		} else if (id <= 0) {
			return {
				error: "El carrito con el id especificado no ha sido encontrado",
			};
		} else {
			const response = await this.schema.find({ id: id });
			await this.schema.deleteOne({ id: id });
			return {
				deleted: response,
			};
		}
	}

	/**
	 * Elimina un producto por su id,
	 * que esté dentro del carrito del id como parametro.
	 * @param {Number} idCart
	 * @param {Number} idProduct
	 * @returns
	 */
	async deleteProductInCart(idCart, idProduct) {
		const data = await this.getAll();
		const cart = await this.get(idCart);
		if (data.length === 0) {
			return {
				error: "No hay ningun carrito creado.",
			};
		} else if (cart.error) {
			return cart.error;
		} else {
			if (idProduct <= 0 || idProduct > cart.products.length) {
				return {
					error: "El producto con el id especificado no ha sido encontrado.",
				};
			} else {
				await this.schema.update(
					{ id: idCart },
					{ $pull: { products: { id: idProduct } } }
				);
				const modified = await this.schema.find({ id: idCart });
				return modified;
			}
		}
	}
}

export default CartMongoDB;
