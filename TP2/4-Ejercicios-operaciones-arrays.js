// Ej.1: Crea un array frutas con los valores ["manzana", "banana", "pera"]. Usa
// push para agregar una fruta al final, y pop para eliminar la última
// fruta.

console.log(" EJERCICIO 1 ");
const frutas = ["manzana", "banana", "pera"];

frutas.push("uva");
console.log("Agregando uva: ", frutas);
frutas.pop();
console.log("Eliminando última fruta: ", frutas);

// Ej.2: Crea un array bidimensional llamado matriz con los valores [[1, 2, 3],
// [4, 5, 6], [7, 8, 9]]. Accede al elemento 5 e imprímelo en la consola.

console.log(" EJERCICIO 2 ");
const matriz = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log("Elemento 5: ", matriz[1][1]);

// Ej.3: Usa un bucle for para iterar sobre el array frutas e imprimir cada
// elemento.

console.log(" EJERCICIO 3 ");
for (let i = 0; i < frutas.length; i++) {
  console.log(frutas[i]);
}

// Ej.4: Crea una función llamada elevarAlCuadrado que tome un array de
// números y devuelva un nuevo array con cada número elevado al
// cuadrado. Usa map para implementar la función.

console.log(" EJERCICIO 4 ");
function elevarAlCuadrado(array) {
  return array.map((num) => num ** 2);
}

const arrayNumeros = [1, 2, 3, 4];
console.log(elevarAlCuadrado(arrayNumeros));

// Ej.5: Crea una función llamada filtrarMayoresDe que tome un array de
// números y un valor de referencia, y devuelva un nuevo array solo con
// los números mayores que ese valor. Usa filter.

console.log(" EJERCICIO 5 ");
function filtrarMayoresDe(array, valor) {
  return array.filter((num) => num > valor);
}

console.log(filtrarMayoresDe([1, 2, 3, 4, 5], 2));

// Ej.6: Crea una función llamada sumarElementos que tome un array de
// números y devuelva la suma de todos los elementos del array
// usando reduce.

console.log(" EJERCICIO 6 ");
function sumarElementos(array) {
  return array.reduce((suma, numero) => suma + numero);
}

console.log(sumarElementos([1, 2, 3, 4, 5]));

// Ej.7: Crea un array de números llamado numeros y usa some para
// verificar si algún número es mayor que 10.

console.log(" EJERCICIO 7 ");
const numeros = [1, 2, 3, 4, 5];
const mayor = numeros.some((num) => num > 10);

console.log(mayor);

// Ej.8: Crea un array de números llamado numeros y usa every para verificar
// si todos los números son positivos.

console.log(" EJERCICIO 8 ");
const positivos = numeros.every((num) => num > 0);

console.log(positivos);

// Ej.9: Crea un array de objetos llamados personas donde cada objeto
// tenga nombre y edad. Usa find para encontrar a la primera persona
// mayor de 30 años.

console.log(" EJERCICIO 9 ");
const personas = [
  { nombre: "Ana", edad: 25 },
  { nombre: "Luis", edad: 35 },
  { nombre: "Maria", edad: 40 },
];

const mayorDe30 = personas.find((persona) => persona.edad > 30);

console.log(mayorDe30);

// Ej.10: Crea un array de palabras y ordénalo alfabéticamente usando sort.

console.log(" EJERCICIO 10 ");
const palabras = ["perro", "gato", "elefante", "jirafa"];

palabras.sort();
console.log(palabras);