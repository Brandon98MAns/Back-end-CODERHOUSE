import fs from "fs";

class Cart {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	getAll() {
		// Obtiene toda la informacion sobre los carritos del archivo carts.json.
		const response = fs.readFileSync(`./src/${this.nameFile}`, "utf-8");
		if (response === "") {
			const message = { error: "No hay ningun carrito creado." };
			return message;
		} else {
			return JSON.parse(response);
		}
	}

	get(id) {
		// Obtiene un carrito por su id.
		const data = this.getAll();
		if (data.error) {
			return data;
		} else if (id <= 0) {
			const message = {
				error: `Introduzca un id valido. Un número de 1 en adelante.`,
			};
			return message;
		} else if (id > data.length) {
			const message = {
				error: `El carrito con el id especificado no ha sido encontrado. Solo hay ${data.length} carritos creados.`,
			};
			return message;
		} else {
			const cart = data.find((element) => element.id === id);
			return cart;
		}
	}

	getProducts(idCart) {
		// Obtiene todos los productos que tenga un carrito por su id de carrito.
		const cart = this.get(idCart);
		if (cart.error) {
			return cart.error;
		} else {
			return cart.products;
		}
	}

	new(name = "cart") {
		// Agrega o  crea un nuevo carrito.
		const data = this.getAll();
		if (data.error) {
			const newCart = {
				id: 1,
				nombre: name,
				timestamp: Date.now(),
				products: [],
			};
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify([newCart]));
			return {
				cart: newCart,
			};
		} else {
			const newCart = {
				id: data.length + 1,
				nombre: name,
				timestamp: Date.now(),
				products: [],
			};
			data.push(newCart);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			return {
				cart: newCart,
			};
		}
	}

	addProduct(id, product) {
		// Agrega un producto, al carrito por medio de su id.
		const data = this.getAll();
		const cart = this.get(id);
		if (data.error) {
			return data.error;
		} else if (cart.error) {
			return cart.error;
		} else {
			product.id = cart.products.length + 1;
			product.timestamp = Date.now();
			product.code = `${product.nombre}${product.timestamp}`;
			cart.products.push(product);
			data.splice(id - 1, 1, cart);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			return {
				cart: product,
			};
		}
	}

	delete(id) {
		// Elimina un carrito y su contenido.
		const data = this.getAll();
		if (data.error) {
			return data;
		} else if (id <= 0) {
			return {
				error: `Introduzca un id valido. Un número de 1 en adelante.`,
			};
		} else if (id > data.length) {
			return {
				error: `El carrito con el id especificado no ha sido encontrado. Solo hay ${data.length} carritos.`,
			};
		} else {
			const previousCart = data.splice(id - 1, 1);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			this.assign();
			return {
				deleted: previousCart[0],
			};
		}
	}

	deleteProductInCart(idCart, idProduct) {
		// Elimina un producto por su id, que esté dentro del carrito del id como parametro.
		const data = this.getAll();
		const cart = this.get(idCart);
		if (data.error) {
			return data;
		} else if (cart.error) {
			return cart.error;
		} else {
			if (idProduct <= 0) {
				return {
					error: `Introduzca un id valido. Un número de 1 en adelante.`,
				};
			} else if (idProduct > cart.products.length) {
				return {
					error: `El producto con el id especificado no ha sido encontrado. Solo hay ${cart.products.length} productos en el carrito.`,
				};
			} else {
				const productDeleted = cart.products.splice(idProduct - 1, 1);
				data.splice(idCart - 1, 1, cart);
				fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
				this.assignIdProducts(idCart);
				return {
					deleted: productDeleted[0],
				};
			}
		}
	}

	// Agrega id a los carritos del archivo "carts.json" si sufre alguna modificacion
	assign() {
		const data = this.getAll();
		let id = 1;
		data.forEach((element) => (element.id = id++));
		fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
	}

	assignIdProducts(idCart) {
		const data = this.getAll();
		const cart = this.get(idCart);
		let id = 1;
		cart.products.forEach((element) => (element.id = id++));
		data.splice(idCart - 1, 1, cart);
		fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
	}
}

export default Cart;
