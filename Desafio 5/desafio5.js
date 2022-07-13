const express = require('express');
const app = express();

let productos = [];

app.use(express.urlencoded({ extended: true}))

app.set('views', '/views');
app.set('views engine', 'ejs');

app.get('/', (req,res) => {
    res.render('inicio', {productos})
});

app.post('/productos', (req, res) => {
    productos.push(req.body)
    console.log(productos)
    res.redirect('/')
});
  
//Defino PORT con el numero de puerto que voy a utilizar.
const PORT = 8080;
app.listen(PORT, () => console.log('Servidor corriendo en puerto 8080'));

