// Ej.1: Crea una función llamada obtenerUsuarios que haga una petición
// HTTP a la API https://jsonplaceholder.typicode.com/users usando
// fetch. Luego, imprime en la consola la lista de usuarios obtenida.

console.log(" EJERCICIO 1 ");
async function obtenerUsuarios() {
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/users");
    const usuarios = await resp.json();
    console.log(usuarios);
    return usuarios;
  } catch {
    console.log("Error al obtener los usuarios");
  }
}

// Ej.2: Usando la función obtenerUsuarios, crea otra función llamada
// imprimirNombresDeUsuarios que filtre y muestre solo los nombres
// de los usuarios.

console.log(" EJERCICIO 2 ");
function imprimirNombresDeUsuarios() {
  obtenerUsuarios().then((usuarios) => {
    usuarios.forEach((usuario) => {
      console.log(usuario.name);
    });
  });
}

imprimirNombresDeUsuarios();

// Ej.3: Crea una función llamada autenticarUsuario que tome un objeto
// credenciales con usuario y contraseña, y verifique si coinciden con
// un usuario predefinido. La función debe devolver true si la
// autenticación es exitosa y false en caso contrario.

console.log(" EJERCICIO 3 ");
function autenticarUsuario(credenciales) {
  const usuario = {
    usuario: "admin",
    contrasena: "1234",
  };

  return (
    credenciales.usuario === usuario.usuario &&
    credenciales.contrasena === usuario.contrasena
  );
}

console.log(autenticarUsuario({ usuario: "admin", contrasena: "1234" }));
console.log(autenticarUsuario({ usuario: "admin", contrasena: "12345" }));

// Ej.4: Crea una función llamada mapearUsuarios que tome un array de
// usuarios obtenidos de la API y devuelva un nuevo array con solo las
// propiedades nombre y email de cada usuario.

console.log(" EJERCICIO 4 ");
function mapearUsuarios(array) {
  return array.map((usuario) => {
    return {
      nombre: usuario.name,
      email: usuario.email,
    };
  });
}

obtenerUsuarios().then((usuarios) => {
  console.log(mapearUsuarios(usuarios));
});

// Ej.5: Crea una función llamada validarFormulario que tome un objeto con
// los campos nombre, email y password. La función debe devolver true
// si todos los campos están presentes y no están vacíos, y false en caso
// contrario.

console.log(" EJERCICIO 5 ");
function validarFormulario(formulario) {
  return (
    formulario.nombre !== "" &&
    formulario.email !== "" &&
    formulario.password !== ""
  );
}

console.log(
  validarFormulario({
    nombre: "Matias",
    email: "matias@gmail.com",
    password: "123",
  }),
);
console.log(validarFormulario({ nombre: "", email: "", password: "123" }));

// Ej.6: Crea una función llamada obtenerPagina que tome un array de
// datos y un número de página. La función debe devolver los
// elementos correspondientes a esa página, asumiendo que cada
// página tiene 5 elementos.

console.log(" EJERCICIO 6 ");
function obtenerPagina(array, pagina) {
  const elementosPorPagina = 5;
  const inicio = (pagina - 1) * elementosPorPagina;
  const fin = inicio + elementosPorPagina;
  return array.slice(inicio, fin);
}

const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(obtenerPagina(array, 1));
console.log(obtenerPagina(array, 2));

// Ej.7: Crea una función llamada enviarDatos que tome un objeto data y
// haga una petición POST a la API
// https://jsonplaceholder.typicode.com/posts. La función debe
// imprimir la respuesta de la API.

console.log(" EJERCICIO 7 ");

async function enviarDatos(data) {
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    console.log("Respuesta API:", json);
  } catch {
    console.log("Error al enviar los datos");
  }
}

enviarDatos({
  title: "foo",
  body: "bar",
  userId: 1,
});

// Ej.8: Crea una función llamada buscarUsuarioPorEmail que tome un array
// de usuarios y un email como parámetros, y devuelva el usuario que
// coincida con el email proporcionado. Usa el método find para
// implementarlo.

console.log(" EJERCICIO 8 ");
function buscarUsuarioPorEmail(array, email) {
  return array.find((usuario) => usuario.email === email);
}

obtenerUsuarios().then((usuarios) => {
  console.log(buscarUsuarioPorEmail(usuarios, "Rey.Padberg@karina.biz"));
});

// Ej.9: Crea una función llamada generarToken que tome un objeto usuario
// y devuelva un token JWT simulado como una cadena. Puedes usar
// una función como btoa (Base64) para simular la generación del
// token.

console.log(" EJERCICIO 9 ");
function generarToken(usuario, token) {
  return btoa(JSON.stringify(usuario));
}

console.log(generarToken({ name: "Matias", email: "matias@gmail.com" }));

// Ej.10: Crea una función llamada actualizarUsuario que tome un objeto
// usuario y una lista de cambios a aplicar. La función debe retornar el
// usuario con las propiedades actualizadas.

console.log(" EJERCICIO 10 ");
function actualizarUsuario(usuario, changes) {
  const result = { ...usuario, ...changes };
  return result;
}

console.log(actualizarUsuario({ name: "Matias", age: 18 }, { age: 19 }));

