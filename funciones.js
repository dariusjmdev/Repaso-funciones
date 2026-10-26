/* funciones.js — Solo cálculos.
   Estas funciones no tocan la página: reciben datos y devuelven resultados. */

// ===== 1. PRECIOS Y DESCUENTOS =====

/**
 * Calcula cuánto IVA hay que pagar por un precio.
 * @param {number} precio - Precio sin IVA.
 * @param {number} [tipo=21] - Porcentaje de IVA.
 * @returns {number} Importe del IVA.
 */
function calcularIVA(precio, tipo = 21) {
  return precio * tipo / 100;
}

/**
 * Suma el IVA al precio (usa calcularIVA).
 * @param {number} precio - Precio sin IVA.
 * @param {number} [tipo=21] - Porcentaje de IVA.
 * @returns {number} Precio con IVA incluido.
 */
function precioConIVA(precio, tipo = 21) {
  return precio + calcularIVA(precio, tipo);
}

/**
 * Resta un porcentaje de descuento a un precio.
 * @param {number} precio - Precio original.
 * @param {number} porcentaje - Porcentaje de descuento (0-100).
 * @returns {number} Precio después del descuento.
 */
function aplicarDescuento(precio, porcentaje) {
  return precio - precio * porcentaje / 100;
}

/**
 * Redondea un número a los decimales indicados (la mitad se redondea hacia arriba).
 * Usa notación exponencial para evitar el fallo de toFixed con 1.005.
 * @param {number} numero - Número a redondear.
 * @param {number} [decimales=2] - Cantidad de decimales.
 * @returns {number} Número redondeado.
 */
function redondear(numero, decimales = 2) {
  const signo = numero < 0 ? -1 : 1;
  const desplazado = Math.round(Math.abs(numero) + "e" + decimales);
  return signo * Number(desplazado + "e-" + decimales);
}

/**
 * Da formato de euros a un número: dos decimales, coma y símbolo €.
 * @param {number} numero - Cantidad a formatear.
 * @returns {string} Texto como "1234,50 €".
 */
function formatearEuros(numero) {
  return redondear(numero, 2).toFixed(2).replace(".", ",") + " €";
}

// ===== 2. TEMPERATURAS =====

/**
 * Convierte grados Celsius a Fahrenheit.
 * @param {number} c - Grados Celsius.
 * @returns {number} Grados Fahrenheit.
 */
function celsiusAFahrenheit(c) {
  return c * 9 / 5 + 32;
}

/**
 * Convierte grados Fahrenheit a Celsius.
 * @param {number} f - Grados Fahrenheit.
 * @returns {number} Grados Celsius.
 */
function fahrenheitACelsius(f) {
  return (f - 32) * 5 / 9;
}

/**
 * Convierte una temperatura entre "C" y "F" (usa las dos funciones anteriores).
 * @param {number} valor - Temperatura de origen.
 * @param {string} de - Unidad de origen: "C" o "F".
 * @param {string} a - Unidad de destino: "C" o "F".
 * @returns {number|null} Valor convertido, o null si alguna unidad no es válida.
 */
function convertirTemperatura(valor, de, a) {
  if (!["C", "F"].includes(de) || !["C", "F"].includes(a)) return null;
  if (de === a) return valor;
  return de === "C" ? celsiusAFahrenheit(valor) : fahrenheitACelsius(valor);
}

// ===== 3. VALIDADOR DE CONTRASEÑAS =====

/**
 * Comprueba que el texto tenga una longitud mínima.
 * @param {string} texto - Texto a comprobar.
 * @param {number} [minimo=8] - Longitud mínima.
 * @returns {boolean} true si llega al mínimo.
 */
function longitudSuficiente(texto, minimo = 8) {
  return texto.length >= minimo;
}

/**
 * Comprueba si el texto tiene alguna mayúscula (si cambia al pasarlo a minúsculas, la tenía).
 * @param {string} texto - Texto a comprobar.
 * @returns {boolean} true si hay alguna mayúscula.
 */
function tieneMayuscula(texto) {
  return texto !== texto.toLowerCase();
}

/**
 * Comprueba si el texto tiene alguna minúscula.
 * @param {string} texto - Texto a comprobar.
 * @returns {boolean} true si hay alguna minúscula.
 */
function tieneMinuscula(texto) {
  return texto !== texto.toUpperCase();
}

/**
 * Comprueba si el texto tiene algún dígito del 0 al 9.
 * @param {string} texto - Texto a comprobar.
 * @returns {boolean} true si hay algún número.
 */
function tieneNumero(texto) {
  return texto.split("").some(c => c >= "0" && c <= "9");
}

/**
 * Evalúa la fortaleza de una contraseña según 4 requisitos
 * (longitud, mayúscula, minúscula y número).
 * @param {string} texto - Contraseña a evaluar.
 * @returns {string} "fuerte" (4 requisitos), "media" (3) o "débil" (menos).
 */
function evaluarContrasena(texto) {
  const cumplidos = [
    longitudSuficiente(texto),
    tieneMayuscula(texto),
    tieneMinuscula(texto),
    tieneNumero(texto),
  ].filter(Boolean).length;
  if (cumplidos === 4) return "fuerte";
  if (cumplidos === 3) return "media";
  return "débil";
}

// ===== 4. GENERADOR DE CONTRASEÑAS =====

/**
 * Devuelve un entero al azar entre min y max, ambos incluidos.
 * @param {number} min - Valor mínimo (entero).
 * @param {number} max - Valor máximo (entero).
 * @returns {number} Entero aleatorio.
 */
function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Devuelve un carácter al azar de un conjunto de caracteres.
 * @param {string} conjunto - Caracteres entre los que elegir.
 * @returns {string} Un carácter (cadena vacía si el conjunto está vacío).
 */
function caracterAleatorio(conjunto) {
  if (conjunto.length === 0) return "";
  return conjunto[numeroAleatorio(0, conjunto.length - 1)];
}

/**
 * Genera una contraseña aleatoria. Siempre usa minúsculas.
 * @param {number} longitud - Entero entre 6 y 30.
 * @param {Object} [opciones] - Opciones del generador.
 * @param {boolean} [opciones.mayusculas=true] - Incluir mayúsculas.
 * @param {boolean} [opciones.numeros=true] - Incluir números.
 * @returns {string|null} La contraseña, o null si la longitud no es válida.
 */
function generarContrasena(longitud, { mayusculas = true, numeros = true } = {}) {
  if (!Number.isInteger(longitud) || longitud < 6 || longitud > 30) return null;
  let conjunto = "abcdefghijklmnopqrstuvwxyz";
  if (mayusculas) conjunto += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (numeros) conjunto += "0123456789";
  let contrasena = "";
  for (let i = 0; i < longitud; i++) {
    contrasena += caracterAleatorio(conjunto);
  }
  return contrasena;
}

// ===== 5. CONTADOR DE PALABRAS =====

/**
 * Separa un texto en palabras, ignorando espacios repetidos y saltos de línea.
 * @param {string} texto - Texto a separar.
 * @returns {string[]} Lista de palabras.
 */
function palabras(texto) {
  return texto.split(/\s+/).filter(p => p.length > 0);
}

/**
 * Cuenta las palabras de un texto (usa palabras).
 * @param {string} texto - Texto a contar.
 * @returns {number} Número de palabras.
 */
function contarPalabras(texto) {
  return palabras(texto).length;
}

/**
 * Cuenta los caracteres de un texto.
 * @param {string} texto - Texto a contar.
 * @param {boolean} [conEspacios=true] - Si es false, no cuenta los espacios.
 * @returns {number} Número de caracteres.
 */
function contarCaracteres(texto, conEspacios = true) {
  return conEspacios ? texto.length : texto.replace(/\s/g, "").length;
}

/**
 * Busca la palabra más larga de un texto (no quita signos de puntuación).
 * @param {string} texto - Texto donde buscar.
 * @returns {string} La palabra más larga ("" si no hay palabras).
 */
function palabraMasLarga(texto) {
  return palabras(texto).reduce((larga, p) => (p.length > larga.length ? p : larga), "");
}

/**
 * Calcula los minutos de lectura de un texto, redondeados hacia arriba.
 * @param {string} texto - Texto a leer.
 * @param {number} [ppm=200] - Palabras que se leen por minuto.
 * @returns {number} Minutos de lectura.
 */
function minutosLectura(texto, ppm = 200) {
  return Math.ceil(contarPalabras(texto) / ppm);
}

// ===== 6. VALIDACIÓN DE DATOS DEL FORMULARIO =====

/**
 * Comprueba que un texto del formulario es un número.
 * El texto vacío o con letras (como "12px") no es válido.
 * @param {string} texto - Texto escrito por el usuario.
 * @returns {boolean} true si es un número.
 */
function esNumeroValido(texto) {
  const limpio = String(texto).trim();
  return limpio !== "" && Number.isFinite(Number(limpio));
}
