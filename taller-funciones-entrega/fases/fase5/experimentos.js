/* experimentos.js — pruebas sueltas de la Fase 2. No se usan en la página.
   Para probarlas, pega funciones.js y este archivo en la consola del navegador (F12). */

// 1. aplicarDescuento como función flecha (misma lógica que la función normal).
const aplicarDescuentoFlecha = (precio, porcentaje) => precio - precio * porcentaje / 100;

// 2. Copia de calcularIVA que muestra el resultado en vez de devolverlo.
function calcularIVAConLog(precio, tipo = 21) {
  console.log("IVA:", precio * tipo / 100);
}

// 3. precioConIVA usando la copia anterior: calcularIVAConLog devuelve undefined.
function precioConIVAConLog(precio, tipo = 21) {
  return precio + calcularIVAConLog(precio, tipo);
}
