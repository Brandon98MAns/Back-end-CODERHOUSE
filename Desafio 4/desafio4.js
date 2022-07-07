const express = require('express')
const app = express()

app.use(express.json())

let productos = 
    [
        {"id": 1, "nombre": "Remera", "precio": 2600},
        {"id": 2, "nombre": "Gorra", "precio": 600},
        {"id": 3, "nombre": "Pantalon", "precio": 4600}
    ];


//Todos los productos.
app.get('/api/productos', (req, res)=> {
    res.send((productos))    
})

//Traigo producto segun ID.
app.get('/api/productos/:id', (req, res) => {
        const { id } = req.params
        res.send({ ProductoBuscado: productos[parseInt(id) - 1] })
    })

//Agrego un producto a mi array.
app.post('/api/productos', (req, res) => {
    const { newProduct } = req.body
    productos.push(newProduct)
    res.send({ agregado: productos, posicion: productos.length})
})
//Actualizo un producto.
app.put('/api/productos/:pos', (req, res) => {
    const { newProduct } = req.body
    const { pos } = req.params
    const productoAnterior = productos[parseInt(pos) - 1]
    productos[parseInt(pos) - 1] = newProduct
    res.send({ ProductoActualizado: palabra, ProductoAnterior: productoAnterior})
})

//Elimino un producto.
app.delete('/api/productos/:pos', (req, res) => {
    const { pos } = req.params
    const producto = productos.splice(parseInt(pos) - 1, 1)
    res.send({ ProductoBorrado: producto })
})

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))