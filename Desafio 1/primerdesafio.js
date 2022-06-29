let mascota = [];
let libro = [];
class Usuario { 
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
        this.cantidadMascotas = 0;
    }

    addBook(nombre, autor){
        libro.nombre = nombre;
        libro.autor = autor;
        libro.genero = 'Ciencia Ficcion';
        this.libros.push(libro);
    }

    getBookNames(){
        let nombresLibros = `${libro.nombre}`;
        console.log('Los nombres de los libros son los siguientes: ' + nombresLibros);
    }
    
    addMascota(animal, nombre){
        mascota.animal = animal;
        mascota.nombre = nombre;
        this.mascotas.push(mascota);
    }

    countMascotas(){
        usuario.addMascota('Perro', 'Pupy')
        this.cantidadMascotas++
        usuario.addMascota('Gato', 'Raul')
        this.cantidadMascotas++;
    }
    
    getFullName(nombreCompleto){
        nombreCompleto = ('Mi nombre completo es '+ `${usuario.nombre} `+`${usuario.apellido}.`);
        console.log(nombreCompleto); 
    }
}

let usuario = new Usuario('Brandon', 'Mansfield');
usuario.getFullName();
usuario.countMascotas();
usuario.addBook('Harry Potter', 'Carlos Quiensabe');
usuario.addBook('Las Cronicas de Narnia', 'Aristobulo del Valle');
usuario.addBook('El Leon curioso', 'Carlos Tejedor');
usuario.getBookNames();
console.log(usuario);

//Otra opcion para mostrar el mismo resultado pero debajo de la clase usuario.
/*nombreCompleto = ('Mi nombre completo es '+ `${usuario.nombre} `+`${usuario.apellido}.`);
console.log(nombreCompleto);*/



  


