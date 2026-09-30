// Ej.1: Crea un objeto llamado libro con propiedades como título, autor y
// añoDePublicacion. Imprime cada propiedad en la consola.

console.log(" EJERCICIO 1 ");
const libro = {
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    anioPublicacion: 1943
};

console.log(libro.titulo)
console.log(libro.autor)
console.log(libro.anioPublicacion)

// Ej. 2: Crea un objeto llamado estudiante con propiedades nombre, edad y
// direccion. direccion debe ser otro objeto con propiedades calle,
// ciudad y pais. Imprime la dirección completa del estudiante.

console.log(" EJERCICIO 2 ");
const estudiante = {
    nombre: "Juan Rodriguez",
    edad: 20,
    direccion: {
        calle: "Rocamora 123",
        ciudad: "C. del Uruguay",
        pais: "Argentina"
    }
};

console.log(`Dirección: ${estudiante.direccion.calle}, ${estudiante.direccion.ciudad}, ${estudiante.direccion.pais}`)

// Ej. 3: Añade un método llamado descripción al objeto libro que devuelva
// una cadena describiendo el título y el autor del libro. Invoca este
// método e imprime el resultado.

console.log(" EJERCICIO 3 ");
libro.descripcion = function () {
    return `${libro.titulo} es un libro escrito por ${libro.autor}.`
}

console.log(libro.descripcion())

// Ej. 4: ○ Crea un objeto producto con propiedades como nombre, precio y
// disponible. Usa un bucle for...in para imprimir todas las propiedades
// y sus valores.

console.log(" EJERCICIO 4 ");
const producto = {
    nombre: "Mate",
    precio: 500,
    disponible: true
}

for (let key in producto) {
    console.log(`${key}: ${producto[key]}`)
}

// Ej. 5: Modifica el valor de la propiedad precio del objeto producto y luego
// imprime el objeto completo para verificar el cambio.

console.log(" EJERCICIO 5 ");
producto.precio = 5000;

console.log(producto);

// Ej. 6: Crea una función llamada tienePropiedad que tome un objeto y una
// cadena como parámetros, y devuelva true si el objeto tiene una
// propiedad con ese nombre, o false en caso contrario.

console.log(" EJERCICIO 6 ");
function tienePropiedad(obj, cadena) {
    return cadena in obj
}

console.log("¿El producto tiene la propiedad?:", tienePropiedad(producto, "stock"));
console.log("¿El producto tiene la propiedad?:", tienePropiedad(producto, "precio"));

// Ej. 7: Elimina la propiedad disponible del objeto producto. Imprime el
// objeto antes y después de eliminar la propiedad.

console.log(" EJERCICIO 7 ");
console.log("Antes: ", producto);
delete producto.disponible;
console.log("Después: ", producto);

// Ej. 8: Usa Object.assign para combinar dos objetos, persona1 y persona2,
// en un nuevo objeto. Imprime el resultado.

console.log(" EJERCICIO 8 ");
const persona1 = {
    nombre: "Ana",
    edad: 25,
}
const persona2 = {
    apellido: "Gonzales",
    profesion: "programadora"
}

const personaCompleta = Object.assign({}, persona1, persona2);
console.log(personaCompleta);

// Ej. 9: Crea una copia profunda del objeto estudiante utilizando el método
// JSON.parse y JSON.stringify. Modifica la copia y verifica que el objeto
// original no haya sido alterado.

console.log(" EJERCICIO 9 ")
const copiaEstudiante = JSON.parse(JSON.stringify(estudiante))
copiaEstudiante.nombre = "Maria"
copiaEstudiante.direccion.ciudad = "Paraná"
console.log("Copia: ", copiaEstudiante)
console.log("Original: ", estudiante)

// Ej. 10: Añade un getter y un setter al objeto libro para la propiedad
// añoDePublicacion. Usa el setter para actualizar el año de publicación
// y luego usa el getter para leerlo.

console.log(" EJERCICIO 10 ")
const libro1 = {
    titulo: "Alicia en el pais de las maravillas",
    anioPublicacion: 1865,
    
    get anioDePublicacion() {
        return this.anioPublicacion
    },

    set anioDePublicacion(anio) {
        this.anioPublicacion = anio
    }
}
console.log("Año de publicación original:", libro1.anioDePublicacion)
libro1.anioDePublicacion = 1987
console.log("Año de publicación modificado:", libro1.anioDePublicacion)
