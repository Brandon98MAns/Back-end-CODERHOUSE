const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const routes = require("./src/routes/routes");

app.use(express.static("./public"));
app.use("/api/productos", routes);

// <------------------------- Configuracion de EJS ------------------------->

app.set("view engine", ".ejs");
app.set("views", "./views");

// <------------------------- Sockets ------------------------->

const Contenedor = require("./src/contenedor");
const contenedor1 = new Contenedor("productos.json");

const Chat = require("./src/chat");
const chat1 = new Chat("messages.json");

io.on("connection", socket => {
  const response = contenedor1.getAll();
  console.log("Un cliente se ha conectado");
  socket.emit("messages", chat1.getAll());
  socket.emit("products", response)

  socket.on("new-message", data => {
    chat1.save(data)
    io.sockets.emit("messages", chat1.getAll());
    io.sockets.emit("products", response);
  });
});

// <------------------------- Configuracion Servidor ------------------------->
const PORT = process.env.PORT || 8080;

const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor HTTP con Websockets escuchando en el puerto ${connectedServer.address().port}`);
});

connectedServer.on("error", error => console.log(`Error en servidor ${error}`));