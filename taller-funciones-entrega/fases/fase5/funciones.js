/* funciones.js — Solo cálculos.
   Estas funciones no tocan la página: reciben datos y devuelven resultados. */

// ===== 1. PRECIOS Y DESCUENTOS =====

function calcularIVA(precio, tipo = 21) {
  return precio * tipo / 100;
}

function precioConIVA(precio, tipo = 21) {
  return precio + calcularIVA(precio, tipo);
}

function aplicarDescuento(precio, porcentaje) {
  return precio - precio * porcentaje / 100;
}

function redondear(numero, decimales = 2) {
  const signo = numero < 0 ? -1 : 1;
  const desplazado = Math.round(Math.abs(numero) + "e" + decimales);
  return signo * Number(desplazado + "e-" + decimales);
}

function formatearEuros(numero) {
  return redondear(numero, 2).toFixed(2).replace(".", ",") + " €";
}

// ===== 2. TEMPERATURAS =====

function celsiusAFahrenheit(c) {
  return c * 9 / 5 + 32;
}

function fahrenheitACelsius(f) {
  return (f - 32) * 5 / 9;
}

function convertirTemperatura(valor, de, a) {
  if (!["C", "F"].includes(de) || !["C", "F"].includes(a)) return null;
  if (de === a) return valor;
  return de === "C" ? celsiusAFahrenheit(valor) : fahrenheitACelsius(valor);
}

// ===== 3. VALIDADOR DE CONTRASEÑAS =====

function longitudSuficiente(texto, minimo = 8) {
  return texto.length >= minimo;
}

function tieneMayuscula(texto) {
  return texto !== texto.toLowerCase();
}

function tieneMinuscula(texto) {
  return texto !== texto.toUpperCase();
}

function tieneNumero(texto) {
  return texto.split("").some(c => c >= "0" && c <= "9");
}

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

function numeroAleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function caracterAleatorio(conjunto) {
  if (conjunto.length === 0) return "";
  return conjunto[numeroAleatorio(0, conjunto.length - 1)];
}

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

function palabras(texto) {
  return texto.split(/\s+/).filter(p => p.length > 0);
}

function contarPalabras(texto) {
  return palabras(texto).length;
}

function contarCaracteres(texto, conEspacios = true) {
  return conEspacios ? texto.length : texto.replace(/\s/g, "").length;
}

function palabraMasLarga(texto) {
  return palabras(texto).reduce((larga, p) => (p.length > larga.length ? p : larga), "");
}

function minutosLectura(texto, ppm = 200) {
  return Math.ceil(contarPalabras(texto) / ppm);
}

// ===== 6. VALIDACIÓN DE DATOS DEL FORMULARIO =====

function esNumeroValido(texto) {
  const limpio = String(texto).trim();
  return limpio !== "" && Number.isFinite(Number(limpio));
}
