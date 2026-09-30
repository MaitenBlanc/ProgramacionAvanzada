// function declaration
function saludar(nombre) {
    console.log(`Hola ${nombre}!`);
}

// Llamada a funcion
saludar('Juan');
saludar('Maria');
saludar('Pedro');

// function expression
const saludar2 = function(nombre) {
    console.log(`Hola ${nombre}!`);
}

saludar2('Mariano');
saludar2('Rocio');
saludar2('Marcos');

// function arrow (funcion flecha)
const saludar3 = (nombre) => {
    console.log(`Hola ${nombre}!`);
}

saludar3('Mariano2');
saludar3('Rocio2');
saludar3('Marcos2');

// funciones con parametros por defecto
const actividad = (nombre, rol) => {
    console.log(`La persona ${nombre}, esta realizando la tarea de ${rol}.`);
}

actividad('Juan', 'Programador JS');
actividad('Maria', 'Analista de Datos');

// parametros por default de las funciones (se puede hacer con cualquier tipo de funcion)
const actividad2 = (nombre, rol = 'Programador JS') => {
    console.log(`La persona ${nombre}, esta realizando la tarea de ${rol}.`);
}

actividad2('Juan');
actividad2('Maria');