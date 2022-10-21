import fs from "fs";

class Product {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	getAll() {
		const response = fs.readFileSync(`./src/${this.nameFile}`, "utf-8");
		if (response === "") {
			return this.assign(true);
		} else {
			return JSON.parse(response);
		}
	}

	get(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `El producto con el id especificado no ha sido encontrado. Solo hay ${data.length} productos`,
			};
		}
		return data.find((element) => element.id === id);
	}

	save(product) {
		const data = this.getAll();
		product.id = data.length + 1;
		product.timestamp = Date.now();
		product.code = `${product.nombre}${product.timestamp}`;
		data.push(product);
		fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
		return {
			product: product,
		};
	}

	update(id, product) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `El producto con el id especificado no ha sido encontrado. Solo hay ${data.length} productos.`,
			};
		} else {
			product.id = id;
			product.timestamp = Date.now();
			product.code = `${product.nombre}${product.timestamp}`;
			const previousProduct = data.splice(id - 1, 1, product);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			return {
				previous: previousProduct[0],
				new: product,
			};
		}
	}

	delete(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return {
				error: `El producto con el id especificado no ha sido encontrado. Solo hay ${data.length} productos`,
			};
		} else {
			const previousProduct = data.splice(id - 1, 1);
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
			this.assign();
			return {
				deleted: previousProduct,
			};
		}
	}

	// Agrega id a los productos del archivo "products.json" si sufre alguna modificacion
	assign(empty = false) {
		if (empty) {
			let id = 1;
			listProducts.forEach((element) => {
				element.id = id++;
				element.timestamp = Date.now();
				element.code = `${element.nombre}${element.timestamp}`;
			});
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(listProducts));
			return listProducts;
		} else {
			const data = this.getAll();
			let id = 1;
			data.forEach((element) => {
				element.id = id++;
			});
			fs.writeFileSync(`./src/${this.nameFile}`, JSON.stringify(data));
		}
	}
}
export default Product;

// Lista de productos por defecto
const listProducts = [
	{
		nombre: "Zapatos",
		precio: 90500,
		imagen:
			"https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/nike-dunk-128.png",
		stock: 10,
		descripcion: "Descripción del producto",
		id: 1,
	},
	{
		nombre: "Camisetas",
		precio: 52000,
		imagen:
			"https://cdn2.iconfinder.com/data/icons/flat-jewels-icon-set/128/0011_T-Shirt.png",
		stock: 10,
		descripcion: "Descripción del producto",
		id: 2,
	},
	{
		nombre: "Pantalonetas",
		precio: 80000,
		imagen: "https://cdn3.iconfinder.com/data/icons/fitness-24/512/8-128.png",
		stock: 10,
		descripcion: "Descripción del producto",
		id: 3,
	},
	{
		nombre: "Medias",
		precio: 12400,
		imagen:
			"https://cdn3.iconfinder.com/data/icons/xmas-flat-set-version-two/512/Christmas_socks-128.png",
		stock: 10,
		descripcion: "Descripción del producto",
		id: 4,
	},
	{
		nombre: "Gorras",
		precio: 25000,
		imagen: "https://cdn3.iconfinder.com/data/icons/xi4dox/png/nike.png",
		stock: 10,
		descripcion: "Descripción del producto",
		id: 5,
	},
	{
		nombre: "Gafas",
		precio: 12500,
		imagen:
			"https://cdn3.iconfinder.com/data/icons/geek-3/24/Deal_With_It_Glasses_pixel_geek_mame-128.png",
		stock: 10,
		descripcion: "Descripción del producto",
		id: 6,
	},
];
