const fs = require('fs')
const express = require('express');
const app = express();


//Solicito traer productos. Envio mi array a la ruta especificada. 
app.get('/productos', (req, res)=> {
    res.send(fs.promises.readFile('productos.txt', 'utf-8'))
})

/*let resultado = await fs.promises.readFile('prodcutos.txt', 'utf-8')
        console.log(resultado)
        let objeto = JSON.parse(resultado)*/

app.get('/productosRandom/:id', async (req, res) => {
    //Establezco que el Id es un numero y resto 1 para alinear el indice del array con el id del producto.
    let id = Number(req.params.id-1); 
    //Leo mi archivo productos.txt.
    let result = await fs.promises.readFile('productos.txt', 'utf-8')
    console.log(productos)
    //Convierto mi array en string a un objeto.
    let productos = JSON.parse(result);
    let producto = buscarProducto(productos, id);
    console.log(producto)
    //Retorno por ID el objeto que yo desee.
    res.send(productos[id])
})

const buscarProducto = (productos, id) => {
    //busco un producto que coincida con la condicion establecida.
    let prod = productos.find(elemento => elemento.id == id)
    //Retorno el producto con dicho ID en caso de que exista.
    return prod
}

//Defino PORT con el numero de puerto que voy a utilizar.
const PORT = 8080;
app.listen(PORT, () => console.log('Servidor corriendo en puerto 8080'));

