// objetos literales
const producto = {
    nombre: 'Tablet',
    precio: 300,
    disponible: true
}

console.log(producto)

// extraccion de valor por punto
console.log(producto.nombre)
console.log(producto.precio)

// objetos con constructor (no es tan comun)
const producto2 = new Object()
producto2.nombre = 'Iphone'
producto2.precio = 1300
producto2.disponible = true

console.log(producto2)