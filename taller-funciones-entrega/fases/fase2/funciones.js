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

