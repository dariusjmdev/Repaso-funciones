/* pruebas.js — pruebas escritas de las funciones de funciones.js.
   Cada prueba compara lo obtenido con lo esperado. Hay un caso normal y casos límite por herramienta. */

const resultados = [];

/** Muestra un valor como texto legible (con comillas si es texto o lista). */
const ver = v => (typeof v === "string" || Array.isArray(v) ? JSON.stringify(v) : String(v));

/** Repite una función n veces y devuelve la lista de resultados. */
const veces = (n, fn) => Array.from({ length: n }, fn);

/**
 * Compara obtenido con esperado, avisa en consola si no coinciden (console.assert)
 * y guarda el resultado de la prueba.
 * @param {string} descripcion - Qué se está probando.
 * @param {*} obtenido - Valor que devuelve la función.
 * @param {*} esperado - Valor que debería devolver.
 */
function probar(descripcion, obtenido, esperado) {
  const ok = Object.is(obtenido, esperado) || (Array.isArray(obtenido) && ver(obtenido) === ver(esperado));
  console.assert(ok, `${descripcion}: obtenido ${ver(obtenido)}, esperado ${ver(esperado)}`);
  resultados.push({ descripcion, ok, obtenido: ver(obtenido), esperado: ver(esperado) });
}

/**
 * Ejecuta todas las pruebas.
 * @returns {{total: number, pasan: number, fallos: Array}} Resumen con la lista de fallos.
 */
function ejecutarPruebas() {
  resultados.length = 0;

  // IVA y descuentos
  probar("calcularIVA(100)", calcularIVA(100), 21);
  probar("calcularIVA(100, 10)", calcularIVA(100, 10), 10);
  probar("calcularIVA(0) con precio 0", calcularIVA(0), 0);
  probar("precioConIVA(50, 10)", precioConIVA(50, 10), 55);
  probar("precioConIVA(0)", precioConIVA(0), 0);
  probar("aplicarDescuento(80, 25)", aplicarDescuento(80, 25), 60);
  probar("aplicarDescuento(80, 0)", aplicarDescuento(80, 0), 80);
  probar("aplicarDescuento(80, 100)", aplicarDescuento(80, 100), 0);
  probar("redondear(2.567)", redondear(2.567), 2.57);
  probar("redondear(2.5, 0)", redondear(2.5, 0), 3);
  probar("redondear(1.005)", redondear(1.005), 1.01);
  probar("redondear(-2.5, 0)", redondear(-2.5, 0), -3);
  probar("formatearEuros(1234.5)", formatearEuros(1234.5), "1234,50 €");
  probar("formatearEuros(0)", formatearEuros(0), "0,00 €");

  // Temperaturas
  probar("celsiusAFahrenheit(100)", celsiusAFahrenheit(100), 212);
  probar("celsiusAFahrenheit(-40)", celsiusAFahrenheit(-40), -40);
  probar("fahrenheitACelsius(32)", fahrenheitACelsius(32), 0);
  probar("convertirTemperatura(100, C, F)", convertirTemperatura(100, "C", "F"), 212);
  probar("convertirTemperatura(212, F, C)", convertirTemperatura(212, "F", "C"), 100);
  probar("convertirTemperatura(25, C, C)", convertirTemperatura(25, "C", "C"), 25);
  probar("convertirTemperatura con unidad no válida", convertirTemperatura(10, "K", "C"), null);

  // Validador de contraseñas
  probar('longitudSuficiente("1234567")', longitudSuficiente("1234567"), false);
  probar('longitudSuficiente("12345678")', longitudSuficiente("12345678"), true);
  probar('longitudSuficiente("")', longitudSuficiente(""), false);
  probar('tieneMayuscula("abc")', tieneMayuscula("abc"), false);
  probar('tieneMayuscula("aBc")', tieneMayuscula("aBc"), true);
  probar('tieneMayuscula("")', tieneMayuscula(""), false);
  probar('tieneMinuscula("ABC")', tieneMinuscula("ABC"), false);
  probar('tieneMinuscula("aBC")', tieneMinuscula("aBC"), true);
  probar('tieneNumero("abc")', tieneNumero("abc"), false);
  probar('tieneNumero("abc1")', tieneNumero("abc1"), true);
  probar('evaluarContrasena("Abcdefg1")', evaluarContrasena("Abcdefg1"), "fuerte");
  probar('evaluarContrasena("Abcdefgh")', evaluarContrasena("Abcdefgh"), "media");
  probar('evaluarContrasena("abc")', evaluarContrasena("abc"), "débil");
  probar('evaluarContrasena("")', evaluarContrasena(""), "débil");

  // Generador de contraseñas (el resultado es aleatorio: se comprueban sus propiedades, 20 veces)
  probar("numeroAleatorio(1, 6) siempre entre 1 y 6 (x20)",
    veces(20, () => numeroAleatorio(1, 6)).every(n => Number.isInteger(n) && n >= 1 && n <= 6), true);
  probar("numeroAleatorio(4, 4) devuelve 4 (x20)",
    veces(20, () => numeroAleatorio(4, 4)).every(n => n === 4), true);
  probar('caracterAleatorio("abc") siempre es a, b o c (x20)',
    veces(20, () => caracterAleatorio("abc")).every(c => "abc".includes(c)), true);
  probar('caracterAleatorio("") devuelve ""', caracterAleatorio(""), "");
  probar("generarContrasena(12) tiene longitud 12 (x20)",
    veces(20, () => generarContrasena(12).length).every(l => l === 12), true);
  probar("generarContrasena(6) y (30) tienen la longitud pedida",
    generarContrasena(6).length === 6 && generarContrasena(30).length === 30, true);
  probar("generarContrasena(3) devuelve null", generarContrasena(3), null);
  probar("generarContrasena(31) devuelve null", generarContrasena(31), null);
  probar("generarContrasena(8.5) devuelve null", generarContrasena(8.5), null);
  probar("generarContrasena sin mayúsculas ni números: solo a-z (x20)",
    veces(20, () => generarContrasena(10, { mayusculas: false, numeros: false }))
      .every(c => c.split("").every(l => l >= "a" && l <= "z")), true);

  // Contador de palabras
  probar('palabras("hola   mundo")', palabras("hola   mundo"), ["hola", "mundo"]);
  probar('palabras("") es lista vacía', palabras(""), []);
  probar("palabras con saltos de línea y espacios al borde", palabras("  uno\ndos  "), ["uno", "dos"]);
  probar('contarPalabras("hola   mundo")', contarPalabras("hola   mundo"), 2);
  probar('contarPalabras("")', contarPalabras(""), 0);
  probar('contarPalabras("   ")', contarPalabras("   "), 0);
  probar('contarCaracteres("a b c")', contarCaracteres("a b c"), 5);
  probar('contarCaracteres("a b c", false)', contarCaracteres("a b c", false), 3);
  probar('contarCaracteres("")', contarCaracteres(""), 0);
  probar('palabraMasLarga("El perro rápido")', palabraMasLarga("El perro rápido"), "rápido");
  probar('palabraMasLarga("")', palabraMasLarga(""), "");
  probar('minutosLectura("hola")', minutosLectura("hola"), 1);
  probar('minutosLectura("")', minutosLectura(""), 0);
  probar("minutosLectura con 201 palabras", minutosLectura("a ".repeat(201)), 2);

  // Validación de números del formulario
  probar('esNumeroValido("12")', esNumeroValido("12"), true);
  probar('esNumeroValido("-3.5")', esNumeroValido("-3.5"), true);
  probar('esNumeroValido("")', esNumeroValido(""), false);
  probar('esNumeroValido("   ")', esNumeroValido("   "), false);
  probar('esNumeroValido("12px")', esNumeroValido("12px"), false);

  const fallos = resultados.filter(r => !r.ok);
  if (fallos.length > 0) console.table(fallos);
  return { total: resultados.length, pasan: resultados.length - fallos.length, fallos };
}
