// Ej.1: Crea una función llamada sumar que tome dos números como
// parámetros y devuelva su suma. Prueba la función con diferentes
// números.

console.log(" EJERCICIO 1 ");
function sumar(num1, num2) {
  return num1 + num2;
}

console.log("Resutado:", sumar(5, 5));
console.log("Resutado:", sumar(10, 20));

// Ej.2: Crea una función llamada multiplicar que tome dos números como
// parámetros y devuelva su producto. Prueba la función con diferentes
// valores.

console.log(" EJERCICIO 2 ");
function multiplicar(num1, num2) {
  return num1 * num2;
}

console.log("Resultado:", multiplicar(5, 5));
console.log("Resultado:", multiplicar(10, 20));

// Ej. 3: Crea una función llamada saludar que tome un parámetro nombre
// con un valor por defecto de "Invitado". La función debe devolver
// "Hola, [nombre]".

console.log(" EJERCICIO 3 ");
function saludar(nombre = "Invitado") {
  return `Hola, ${nombre}`;
}

console.log(saludar("Maiten"));
console.log(saludar());

// Ej. 4: Crea una función llamada crearPersona que tome nombre y edad
// como parámetros y devuelva un objeto con esas propiedades.

console.log(" EJERCICIO 4 ");
function crearPersona(nombre, edad) {
  return {
    nombre: nombre,
    edad: edad,
  };
}

console.log(crearPersona("Matias", 18));

// Ej. 5: Crea una función llamada actualizarEdad que tome un objeto
// persona y un número nuevaEdad, y actualice la propiedad edad del
// objeto.

console.log(" EJERCICIO 5 ");
function actualizarEdad(persona, nuevaEdad) {
  persona.edad = nuevaEdad;
}

const persona = {
  nombre: "Matias",
  edad: 18,
};

console.log("Antes: ", persona);
actualizarEdad(persona, 19);
console.log("Después: ", persona);

// Ej. 6: Crea una función recursiva llamada factorial que calcule el factorial
// de un número dado.

console.log(" EJERCICIO 6 ");
function factorial(numero) {
  if (numero === 0 || numero === 1) {
    return 1;
  } else {
    return numero * factorial(numero - 1);
  }
}

console.log("Factorial de 5:", factorial(5));

// Ej. 7: Crea una función llamada despedir que contenga una función
// interna adios. despedir debe devolver el resultado de llamar a adios.

console.log(" EJERCICIO 7 ");
function despedir(nombre) {
  const adios = () => {
    return "Adios, " + nombre;
  };

  return adios();
}

console.log(despedir("Matias"));

// Ej. 8: Crea una función llamada procesarArray que tome un array y una
// función como parámetros, y aplique la función a cada elemento del
// array. Usa una función como parámetro para multiplicar cada
// número por 2.

console.log(" EJERCICIO 8 ");
function procesarArray(array, funcion) {
  const resultado = [];
  for (let i = 0; i < array.length; i++) {
    resultado.push(funcion(array[i]));
  }
  return resultado;
}

const multiplicarPorDos = (numero) => numero * 2;

console.log(procesarArray([1, 2, 3, 4, 5], multiplicarPorDos));

// Ej. 9: Crea una función llamada crearMultiplicador que tome un número x
// y devuelva una nueva función que multiplique cualquier número por
// x.

console.log(" EJERCICIO 9 ");
function crearMultiplicador(x) {
  return (numero) => numero * x;
}

const multiplicadorDeTres = crearMultiplicador(3);

console.log(multiplicadorDeTres(2));

// Ej. 10: Crea una función anónima que sume dos números y la asigna a una
// variable llamada sumarAnonima. Luego, invoca la función a través de
// esa variable.

console.log(" EJERCICIO 10 ");
const sumarAnonima = function (a, b) {
  return a + b;
};

console.log(sumarAnonima(2, 3));
