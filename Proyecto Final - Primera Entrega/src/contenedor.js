const fs = require("fs");

module.exports = class Contenedor {
	constructor(nameFile) {
		this.nameFile = nameFile;
	}

	getAll() {
		const response = fs.readFileSync(this.nameFile, "utf-8");
    if(response === "") {
			return this.assign(true);
    } else {
      return JSON.parse(response);
    }
	}

	get(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return false;
		}
		return data.find(element => element.id === id);
	}

	save(product) {
		const data = this.getAll();
		product.id = data.length + 1;
		data.push(product);
		fs.writeFileSync(this.nameFile, JSON.stringify(data));
		return product;
	}

	update(id, product) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return false;
		}
		product.id = id;
		const previousProduct = data.splice(id - 1, 1, product);
		fs.writeFileSync(this.nameFile, JSON.stringify(data));
		return {
			previous: previousProduct[0],
			new: product,
		};
	}

	delete(id) {
		const data = this.getAll();
		if (id <= 0 || id > data.length) {
			return false;
		} else {
			const previousProduct = data.splice(id - 1, 1);
			fs.writeFileSync(this.nameFile, JSON.stringify(data));
			this.assign();
			return {
				deleted: previousProduct[0]
			}
		}
	}

  // Agrega id a los productos del archivo "productos.json" si sufre alguna modificacion
  assign(empty = false) {
		if(empty) {
			let id = 1;
			listaProductos.forEach(element => {
				element.id = id++;
			});
			fs.writeFileSync(this.nameFile, JSON.stringify(listaProductos));
			return listaProductos;
		} else {
			const data = this.getAll();
			let id = 1;
			data.forEach(element => {
				element.id = id++;
			});
			fs.writeFileSync(this.nameFile, JSON.stringify(data));
		}
	}
}

const listaProductos = [
  {
    nombre: "Nike Quest 4",
    precio: 456890,
    imagen: "https://i.ibb.co/D1N1800/Nike-Quest-4.webp"
  },
  {
    nombre: "Nike Court Royale 2 Low",
    precio: 456890,
    imagen: "https://i.ibb.co/ZShRKqM/Nike-Court-Royale-2-Low.webp"
  },
  {
    nombre: "Nike Revolucion 6 Fly Ease",
    precio: 456890,
    imagen: "https://i.ibb.co/PzsYXsc/Nike-Revolucion-6-Fly-Ease.webp"
  },
  {
    nombre: "Nike Court Vision Low",
    precio: 456890,
    imagen: "https://i.ibb.co/BZL5fKs/Nike-Court-Vision-Low.webp"
  },
  {
    nombre: "Nike SB Chron 2",
    precio: 456890,
    imagen: "https://i.ibb.co/Kb8RGhf/Nike-SB-Chron-2.webp"
  },
  {
    nombre: "Nike Dunk Low",
    precio: 456890,
    imagen: "https://i.ibb.co/JBbxdBh/Nike-Dunk-Low.webp"
  },
  {
    nombre: "Nike Flex Experience Run 10",
    precio: 456890,
    imagen: "https://i.ibb.co/hKNh3Hx/Nike-Flex-Experience-Run-10.webp"
  },
  {
    nombre: "Nike Jordan Stay Loyal",
    precio: 456890,
    imagen: "https://i.ibb.co/SK18Szh/Nike-Jordan-Stay-Loyal.webp"
  },
  {
    nombre: "Nike Air Max SC",
    precio: 456890,
    imagen: "https://i.ibb.co/ZBd04ZZ/Nike-Air-Max-SC.webp"
  },
  {
    nombre: "Nike Air Max Excee",
    precio: 456890,
    imagen: "https://i.ibb.co/m5HxpzM/Nike-Air-Max-Excee.webp"
  }
]