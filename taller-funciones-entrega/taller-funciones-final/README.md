# Taller de funciones

Página con cinco herramientas pequeñas, todas hechas con funciones de JavaScript escritas a mano. Práctica 1 de Desarrollo Web en Entorno Cliente (2º DAW, IES Juan García Valdemora).

- **Autor:** Darius Joanito Marinescui

## Herramientas

| Herramienta | Funciones principales |
|---|---|
| IVA y descuentos | `calcularIVA`, `precioConIVA`, `aplicarDescuento`, `redondear`, `formatearEuros` |
| Conversor de temperaturas | `celsiusAFahrenheit`, `fahrenheitACelsius`, `convertirTemperatura` |
| Validador de contraseñas | `longitudSuficiente`, `tieneMayuscula`, `tieneMinuscula`, `tieneNumero`, `evaluarContrasena` |
| Generador de contraseñas | `numeroAleatorio`, `caracterAleatorio`, `generarContrasena` |
| Contador de palabras | `palabras`, `contarPalabras`, `contarCaracteres`, `palabraMasLarga`, `minutosLectura` |

`esNumeroValido` comprueba que lo que escribe el usuario es un número (el texto vacío y `"12px"` no lo son).

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | La página. |
| `estilos.css` | El diseño. |
| `funciones.js` | Solo cálculos: reciben datos y devuelven resultados, sin tocar la página. |
| `app.js` | Lee los campos, los comprueba, llama a las funciones y muestra el resultado. |
| `pruebas.js` | Pruebas escritas con `probar()` y `console.assert`. |
| `experimentos.js` | Pruebas sueltas de la Fase 2 (función flecha y copia con `console.log`). |
| `notas.md` | Apuntes y respuestas de cada fase. |

## Cómo usarla

Abre `index.html` en el navegador. No necesita instalar nada.

## Cómo ejecutar las pruebas

- En la página: pulsa **Ejecutar pruebas**. Muestra cuántas pasan y cuáles fallan.
- En la consola del navegador (F12): escribe `ejecutarPruebas()`. Los fallos salen como avisos de `console.assert` y en una tabla.

## Decisiones

- Los campos numéricos son de texto, no `type="number"`, para validar con `esNumeroValido`. Se acepta la coma decimal.
- Los errores se escriben en la página, sin `alert`.
- Precio vacío da error; IVA vacío usa 21 y descuento vacío usa 0.
- `redondear` usa notación exponencial porque `toFixed` falla con casos como `1.005`.
