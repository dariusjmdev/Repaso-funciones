# Taller de funciones — Práctica 1

**Módulo:** Desarrollo Web en Entorno Cliente (DWEC)  
**Curso:** 2.º DAW  
**Centro:** IES Juan García Valdemora  
**Alumno:** Darius Joanito Marinescu

---

## 1. Descripción del proyecto

Este proyecto consiste en desarrollar una página web con cinco herramientas implementadas mediante funciones propias de JavaScript.

Los objetivos principales son practicar las funciones predefinidas del lenguaje, crear funciones con parámetros y valores de retorno, reutilizar funciones, validar datos, conectar la lógica con una interfaz web y comprobar el funcionamiento mediante pruebas automatizadas.

### Herramientas implementadas

1. **IVA y descuentos:** cálculo del IVA, precio con IVA, aplicación de descuentos, redondeo y formato de euros.
2. **Conversor de temperaturas:** conversión entre grados Celsius y Fahrenheit.
3. **Validador de contraseñas:** evaluación de la longitud, las mayúsculas, las minúsculas y los números.
4. **Generador de contraseñas:** generación aleatoria de contraseñas con diferentes opciones.
5. **Contador de palabras:** recuento de palabras y caracteres, identificación de la palabra más larga y estimación del tiempo de lectura.

---

## 2. Estructura del proyecto

| Archivo | Función |
|---|---|
| `index.html` | Estructura de la página web. |
| `estilos.css` | Estilos visuales y presentación. |
| `funciones.js` | Funciones de cálculo y lógica reutilizable. |
| `app.js` | Conexión entre los campos, los botones y las funciones. |
| `pruebas.js` | Pruebas automatizadas mediante `probar()` y `console.assert`. |
| `experimentos.js` | Experimentos sobre funciones normales, funciones flecha y `console.log`. |
| `notas.md` | Predicciones, resultados, explicaciones y respuestas de las seis fases. |

La lógica de negocio se mantiene separada de la interfaz. Las funciones de `funciones.js` reciben datos y devuelven resultados, mientras que `app.js` gestiona la interacción con el usuario.

---

## 3. Fase 1. Funciones predefinidas

Se han estudiado diez expresiones de JavaScript, anotando las predicciones, los resultados reales y sus tipos mediante `typeof`.

Las funciones y operaciones estudiadas incluyen:

- `parseInt()` y `Number()` para conversiones.
- `isNaN()` para comprobar valores numéricos.
- `Math.round()` para redondear.
- `replace()` y `split()` para trabajar con texto.
- Operaciones con decimales y `toFixed()`.

También se han agrupado las funciones en categorías: conversión, comprobación, matemáticas y texto.

Se ha comprobado que `Number("")` devuelve `0`, que `parseInt("12px")` devuelve `12` y que las operaciones decimales pueden presentar pequeñas imprecisiones.


## 4. Fase 2. Funciones de precios y descuentos

Se han implementado las siguientes funciones:

- `calcularIVA(precio, tipo = 21)`: calcula el importe del IVA.
- `precioConIVA(precio, tipo = 21)`: devuelve el precio con IVA incluido y reutiliza `calcularIVA()`.
- `aplicarDescuento(precio, porcentaje)`: calcula el precio después del descuento.
- `redondear(numero, decimales = 2)`: redondea un número al número de decimales indicado.
- `formatearEuros(numero)`: devuelve un texto con dos decimales, coma decimal y símbolo del euro.

### Ejemplos comprobados

```javascript
calcularIVA(100);              // 21
calcularIVA(100, 10);          // 10
precioConIVA(50, 10);          // 55
aplicarDescuento(80, 25);      // 60
aplicarDescuento(80, 0);       // 80
redondear(2.567);              // 2.57
redondear(2.5, 0);             // 3
redondear(1.005);              // 1.01
formatearEuros(1234.5);        // "1234,50 €"
```

También se ha comparado `aplicarDescuento()` como función normal y como función flecha. Se ha estudiado la diferencia entre `console.log()` y `return`: mostrar un resultado en la consola no significa devolverlo a la función que lo llama.


## 5. Fase 3. Temperaturas, contraseñas y palabras

### 5.1. Conversor de temperaturas

- `celsiusAFahrenheit(c)`: convierte Celsius a Fahrenheit.
- `fahrenheitACelsius(f)`: convierte Fahrenheit a Celsius.
- `convertirTemperatura(valor, de, a)`: realiza la conversión utilizando las funciones anteriores.

### 5.2. Validador de contraseñas

- `longitudSuficiente(texto, minimo = 8)`: comprueba la longitud mínima.
- `tieneMayuscula(texto)`: comprueba si hay mayúsculas.
- `tieneMinuscula(texto)`: comprueba si hay minúsculas.
- `tieneNumero(texto)`: comprueba si hay números.
- `evaluarContrasena(texto)`: clasifica la contraseña como «débil», «media» o «fuerte».

La clasificación depende de cuántos de los cuatro requisitos se cumplen.

### 5.3. Generador de contraseñas

- `numeroAleatorio(min, max)`: genera un entero aleatorio dentro del intervalo.
- `caracterAleatorio(conjunto)`: selecciona un carácter aleatorio.
- `generarContrasena(longitud, opciones)`: genera una contraseña con la longitud y las opciones elegidas.

La longitud válida debe ser un entero entre 6 y 30, ambos incluidos. Si no se cumple, la función devuelve `null`.

### 5.4. Contador de palabras

- `palabras(texto)`: obtiene las palabras ignorando los espacios repetidos y los saltos de línea.
- `contarPalabras(texto)`: cuenta las palabras.
- `contarCaracteres(texto, conEspacios = true)`: cuenta los caracteres, con la posibilidad de excluir los espacios.
- `palabraMasLarga(texto)`: devuelve la palabra más larga.
- `minutosLectura(texto, ppm = 200)`: estima los minutos de lectura y redondea hacia arriba.


## 6. Fase 4. Interfaz web y validación

Se ha desarrollado una interfaz con una sección para cada una de las cinco herramientas.

Cada sección dispone de los campos necesarios, un botón para ejecutar la operación y un espacio para mostrar el resultado.

En `app.js` se utilizan funciones de gestión de eventos para:

1. Leer los datos introducidos por el usuario.
2. Comprobar que los datos sean válidos.
3. Ejecutar las funciones correspondientes.
4. Mostrar el resultado o un mensaje de error en la página.

### Validación de los campos

La función `esNumeroValido(texto)` comprueba que el campo no esté vacío y que contenga un número válido.

Se han tenido en cuenta las siguientes condiciones:

- Si el precio está vacío, se muestra un error.
- Si el campo del IVA está vacío, se utiliza el 21 %.
- Si el campo del descuento está vacío, se utiliza el 0 %.
- Se acepta la coma como separador decimal.
- Los errores se muestran en la página sin utilizar `alert()`.


## 7. Fase 5. Pruebas automatizadas

Las pruebas se encuentran en `pruebas.js`.

Se ha creado la función `probar(descripcion, obtenido, esperado)`, que utiliza `console.assert()` y almacena el resultado de cada comprobación.

La función `ejecutarPruebas()` ejecuta las pruebas y muestra el número de comprobaciones superadas y fallidas.

Se contemplan casos normales y casos límite, como precios iguales a cero, textos vacíos, conversiones, contraseñas no válidas y longitudes fuera del intervalo permitido.

Para el generador de contraseñas se comprueban propiedades verificables, como la longitud y los caracteres permitidos, en lugar de esperar una contraseña aleatoria concreta. Estas comprobaciones se repiten veinte veces.

### Prueba de detección de errores

Para verificar que las pruebas detectan fallos, se debe modificar temporalmente una operación de una función, ejecutar las pruebas y comprobar que las relacionadas con esa operación fallen. Después se restaura el código original y se comprueba que las pruebas vuelvan a pasar.

**Resultado final con el código corregido:** [ANOTAR EL RESULTADO REAL DE LA ÚLTIMA EJECUCIÓN].


## 8. Fase 6. Documentación y revisión

Las funciones de `funciones.js` deben contar con comentarios JSDoc que indiquen qué hacen, qué parámetros reciben y qué devuelven.

El formato utilizado es:

```javascript
/**
 * Describe la función.
 * @param {number} valor - Explicación del parámetro.
 * @returns {number} Explicación del resultado.
 */
```

La revisión final debe comprobar que:

- Los nombres de las funciones son comprensibles.
- Las funciones se reutilizan cuando corresponde.
- No hay código innecesariamente repetido.
- La consola no muestra errores.
- Las pruebas pasan con el código definitivo.
- Los comentarios JSDoc describen correctamente las funciones.


---

## 9. Cómo ejecutar el proyecto

1. Descargar o clonar el repositorio.
2. Abrir la carpeta `taller-funciones-final`.
3. Abrir `index.html` en un navegador web moderno.
4. Utilizar las herramientas mediante sus campos y botones.
5. Pulsar «Ejecutar pruebas» para comprobar las funciones.

No se necesita instalar ninguna dependencia para el funcionamiento básico de la página.

### Ejecutar las pruebas desde la consola

1. Abrir la página.
2. Pulsar `F12`.
3. Entrar en la pestaña Console.
4. Ejecutar:

```javascript
ejecutarPruebas();
```


