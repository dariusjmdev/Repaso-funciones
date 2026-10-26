/* app.js — conecta la página con los cálculos de funciones.js.
   Cada manejador hace cuatro cosas, en este orden: leer, comprobar, calcular y mostrar. */

/** Lee un campo de texto; acepta la coma como separador decimal. */
const leer = id => document.getElementById(id).value.trim().replace(",", ".");

/** Escribe un mensaje en la zona de resultado; si es un error, cambia el estilo. */
function mostrar(id, mensaje, esError = false) {
  const el = document.getElementById(id);
  el.textContent = mensaje;
  el.className = esError ? "resultado error" : "resultado";
}

function manejarIVA() {
  const precio = leer("precio");
  const tipo = leer("tipo") === "" ? "21" : leer("tipo");
  const descuento = leer("descuento") === "" ? "0" : leer("descuento");

  if (!esNumeroValido(precio) || Number(precio) < 0) {
    return mostrar("res-iva", "El precio es obligatorio y debe ser un número igual o mayor que 0.", true);
  }
  if (!esNumeroValido(tipo) || Number(tipo) < 0) {
    return mostrar("res-iva", "El IVA debe ser un número igual o mayor que 0.", true);
  }
  if (!esNumeroValido(descuento) || Number(descuento) < 0 || Number(descuento) > 100) {
    return mostrar("res-iva", "El descuento debe ser un número entre 0 y 100.", true);
  }

  const base = aplicarDescuento(Number(precio), Number(descuento));
  const iva = calcularIVA(base, Number(tipo));
  const total = precioConIVA(base, Number(tipo));
  mostrar("res-iva", `Base: ${formatearEuros(base)}\nIVA: ${formatearEuros(iva)}\nTotal: ${formatearEuros(total)}`);
}

function manejarTemperatura() {
  const valor = leer("grados");
  if (!esNumeroValido(valor)) {
    return mostrar("res-temp", "Escribe una temperatura válida, por ejemplo 36.6.", true);
  }
  const de = document.getElementById("de").value;
  const a = document.getElementById("a").value;
  const resultado = convertirTemperatura(Number(valor), de, a);
  mostrar("res-temp", `${Number(valor)} °${de} = ${redondear(resultado, 2)} °${a}`);
}

function manejarValidador() {
  const clave = document.getElementById("clave").value;
  if (clave === "") {
    return mostrar("res-clave", "Escribe una contraseña para evaluarla.", true);
  }
  const requisitos = [
    [longitudSuficiente(clave), "8 caracteres o más"],
    [tieneMayuscula(clave), "una mayúscula"],
    [tieneMinuscula(clave), "una minúscula"],
    [tieneNumero(clave), "un número"],
  ];
  const detalle = requisitos.map(([ok, texto]) => `${ok ? "✓" : "✗"} ${texto}`).join("\n");
  mostrar("res-clave", `Nivel: ${evaluarContrasena(clave)}\n${detalle}`);
}

function manejarGenerador() {
  const longitud = leer("longitud");
  if (!esNumeroValido(longitud)) {
    return mostrar("res-gen", "La longitud debe ser un número.", true);
  }
  const contrasena = generarContrasena(Number(longitud), {
    mayusculas: document.getElementById("mayusculas").checked,
    numeros: document.getElementById("numeros").checked,
  });
  if (contrasena === null) {
    return mostrar("res-gen", "La longitud debe ser un número entero entre 6 y 30.", true);
  }
  mostrar("res-gen", contrasena);
}

function manejarPalabras() {
  const texto = document.getElementById("texto").value;
  mostrar("res-palabras", [
    `Palabras: ${contarPalabras(texto)}`,
    `Caracteres: ${contarCaracteres(texto)} (${contarCaracteres(texto, false)} sin espacios)`,
    `Palabra más larga: ${palabraMasLarga(texto) || "-"}`,
    `Lectura: ${minutosLectura(texto)} min`,
  ].join("\n"));
}


const botones = {
  "btn-iva": manejarIVA,
  "btn-temp": manejarTemperatura,
  "btn-clave": manejarValidador,
  "btn-gen": manejarGenerador,
  "btn-palabras": manejarPalabras,
};

for (const [id, manejador] of Object.entries(botones)) {
  document.getElementById(id).addEventListener("click", manejador);
}
