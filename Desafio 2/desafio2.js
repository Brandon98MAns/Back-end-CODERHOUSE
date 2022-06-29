const fs = require("fs");

class Contenedor {
  constructor(productos) {
    this.productos = productos;
    }

    async save() {
    let resultado = await fs.promises.readFile('prodcutos.txt', 'utf-8')
            console.log(resultado)
    }

    async getById(productos, id){
    let prod = productos.find(elemento => elemento.id == id)
    return prod
    }

    async getAll(){
    return productos
    }
}

Contenedor ()