const express = require("express");
const router = express.Router();

// <------------------------- Contenedor de Productos ------------------------->

const Contenedor = require("../contenedor");
const contenedor1 = new Contenedor("productos.json");

// <------------------------- Configuracion Rutas ------------------------->

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

// <------------------------- Rutas ------------------------->

router.get("/", (req, res) => {
  const { id } = req.query;
  if (id != undefined) {
    const response = contenedor1.get(Number(id));
    res.render("idProduct", { response });
  } else {
    const response = contenedor1.getAll();
    res.render("allProducts", { response });
  }
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const response = contenedor1.get(Number(id));
  res.render("idProduct", { response });
});

router.post("/", (req, res) => {
  const { nombre, precio, imagen, cantidad } = req.body;
  if (nombre === "" || precio === "" || imagen === "" || cantidad === "") {
    res.render("addProduct", {response: false});
  } else {
    const response = contenedor1.save({
      nombre: nombre,
      precio: Number(precio),
      imagen: imagen,
      cantidad: cantidad
    });
    res.render("addProduct", {response});
  }
});

router.put("/:id", (req, res) => {
  const { nombre, precio, imagen, cantidad } = req.body;
  const { id } = req.params;
  if (nombre === "" || precio === "" || imagen === "" || cantidad === "") {
    res.render("updateProduct", {response: false});
  } else {
    const response = contenedor1.update(
      Number(id), 
      {
        nombre: nombre,
        precio: Number(precio),
        imagen: imagen,
        cantidad: cantidad
      });
    res.render("updateProduct", {response});
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const response = contenedor1.delete(Number(id));
  res.render("deleteProduct", {response});
});

module.exports = router;