// arreglos
const numeros = [1, 2, 3, 4, 5, 6 ,7 ,8, 9, 10];

// mostrar el array completo
// console.log(numeros);

// // acceder a los elementos del arreglo
// console.log(numeros[0]);
// console.log(numeros[1]);
// console.log(numeros[2]);

// Ejemplo 1
// const cart = [
//     {nombre: 'Producto 1', precio: 100},
//     {nombre: 'Producto 2', precio: 200},
//     {nombre: 'Producto 3', precio: 300},
//     {nombre: 'Producto 4', precio: 400},
//     {nombre: 'Producto 5', precio: 500}
// ]

// console.log(cart);

// metodo .map: a partir de un arreglo genera otro arreglo
// carrito = ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5'];

// carrito.map(producto => {
//     return `El producto es ${producto}`;
// })

// // Mostrar el carrito mapeado
// console.log(carrito);

// concatenacion de arreglos con el metodo concat
const carrito1 = ['Producto 1', 'Producto 2', 'Producto 3', 'Producto 4', 'Producto 5'];
const carrito2 = ['Producto 6', 'Producto 7', 'Producto 8', 'Producto 9', 'Producto 10'];

// const carrito3 = carrito1.concat(carrito2);

// // Mostrar la concatenacion de los dos carritos
// console.log(carrito3);

// concatenacion de arreglos con el operador spread
const carrito3 = [...carrito1, ...carrito2];

// Mostrar la concatenacion de los dos carritos
console.log(carrito3);