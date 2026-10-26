# Notas · Taller de funciones

Práctica 1 · Funciones predefinidas y funciones propias · Desarrollo Web en Entorno Cliente (2º DAW)

Alumno: Darius Joanito Marinescu

## Fase 1 · Funciones predefinidas

Primero escribí qué creía que saldría, después lo ejecuté en la consola (F12) y apunté el resultado y su `typeof`.

| Línea | Mi predicción | Resultado | Tipo |
|---|---|---|---|
| `parseInt("42")` | `42` | `42` | number |
| `parseInt("12px")` | `12` | `12` | number |
| `parseInt("px12")` | `NaN` | `NaN` | number |
| `Number("")` | `NaN` | `0` | number |
| `isNaN("")` | `true` | `false` | boolean |
| `Math.round(-2.5)` | `-3` | `-2` | number |
| `"oso".replace("o", "0")` | `"0so"` | `"0so"` | string |
| `"a,b,c".split(",")` | `["a","b","c"]` | `["a","b","c"]` | object (es un array) |
| `0.1 + 0.2` | `0.3` | `0.30000000000000004` | number |
| `(1.005).toFixed(2)` | `"1.01"` | `"1.00"` | string |

Sorpresas: `Number("")`, `isNaN("")`, `Math.round(-2.5)`, `0.1 + 0.2` y `(1.005).toFixed(2)`. Acerté 5 de 10.

### Funciones agrupadas

| Grupo | Funciones |
|---|---|
| Convertir | `parseInt`, `Number`, `toFixed`, **`parseFloat`** |
| Comprobar | `isNaN` |
| Matemáticas | `Math.round`, **`Math.random`** |
| Texto | `replace`, `split`, **`trim`** |

En negrita, las 3 que he añadido: `parseFloat` (texto a decimal), `Math.random` (número al azar entre 0 y 1) y `trim` (quita espacios de los extremos).

### Preguntas

**1. ¿Qué da `Number("")`? ¿Por qué es un problema en un formulario?**
Da `0`, no `NaN`. Un campo vacío parecería un cero válido: si el usuario no escribe el precio, la página calcularía "0,00 €" sin avisar de que falta un dato.

**2. ¿Qué diferencia hay entre `parseInt("12px")` y `parseInt("px12")`?**
`parseInt` lee de izquierda a derecha y se para en el primer carácter que no es un número. En `"12px"` lee `12` y se detiene en la `p`. En `"px12"` el primer carácter ya no es un número, así que no lee nada y devuelve `NaN`.

**3. ¿Por qué `0.1 + 0.2` no da `0.3`? ¿Qué problema crearía en una tienda?**
JavaScript guarda los decimales en binario y 0.1 y 0.2 no se pueden representar exactamente, así que la suma sale con un error minúsculo (`0.30000000000000004`). En una tienda, una comparación como `total === 0.3` fallaría y los céntimos podrían acumular errores. Hay que redondear los resultados antes de mostrarlos o compararlos.

