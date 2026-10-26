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

## Fase 2 · Precios y descuentos

Escribí `calcularIVA`, `precioConIVA`, `aplicarDescuento`, `redondear` y `formatearEuros` en `funciones.js` y probé cada una en la consola con los ejemplos del enunciado:

```
calcularIVA(100)            → 21
calcularIVA(100, 10)        → 10
precioConIVA(50, 10)        → 55
aplicarDescuento(80, 25)    → 60
aplicarDescuento(80, 0)     → 80
redondear(2.567)            → 2.57
redondear(2.5, 0)           → 3
redondear(1.005)            → 1.01
formatearEuros(1234.5)      → "1234,50 €"
```

Para `redondear` no sirve `toFixed` solo: `Number((1.005).toFixed(2))` da `1`. Desplazo la coma con notación exponencial (`"1.005e2"` es exactamente `100.5`), redondeo con `Math.round` y la devuelvo a su sitio.

Las dos pruebas extra están en `experimentos.js`:

- `aplicarDescuento` como función normal y como flecha dan lo mismo: `60` con `(80, 25)` y `80` con `(80, 0)`.
- `calcularIVAConLog` muestra `IVA: 5` en la consola, pero `precioConIVAConLog(50, 10)` devuelve `NaN`.

### Preguntas

**1. Con un ejemplo de tu código: ¿qué es un parámetro y qué es un argumento?**
En `function calcularIVA(precio, tipo = 21)`, `precio` y `tipo` son los **parámetros**: nombres que usa la función por dentro. En `calcularIVA(100, 10)`, `100` y `10` son los **argumentos**: los valores reales que le paso al llamarla.

**2. ¿Cuándo se usa un valor por defecto?**
Cuando un dato es opcional y existe un valor razonable de reserva: el IVA normal es el 21 % y casi siempre quiero 2 decimales. Si no paso el argumento (o paso `undefined`), la función usa el valor por defecto.

**3. ¿Qué pasó con la copia que usaba `console.log`? ¿Por qué?**
`calcularIVAConLog(50, 10)` escribe `IVA: 5` en la consola, pero como no tiene `return` devuelve `undefined`. Entonces `precioConIVAConLog` calcula `50 + undefined`, que es `NaN`. `console.log` solo enseña un valor a la persona que mira la consola; `return` es lo que entrega el valor a quien llamó a la función.

## Fase 3 · Funciones pequeñas

Completé `funciones.js` con las otras cuatro herramientas:

- **Temperaturas:** `celsiusAFahrenheit`, `fahrenheitACelsius`, `convertirTemperatura`.
- **Validador:** `longitudSuficiente`, `tieneMayuscula`, `tieneMinuscula`, `tieneNumero`, `evaluarContrasena`.
- **Generador:** `numeroAleatorio`, `caracterAleatorio`, `generarContrasena`.
- **Palabras:** `palabras`, `contarPalabras`, `contarCaracteres`, `palabraMasLarga`, `minutosLectura`.

Probé todos los ejemplos del enunciado en la consola, por ejemplo:

```
celsiusAFahrenheit(100)               → 212
fahrenheitACelsius(32)                → 0
convertirTemperatura(25, "C", "C")    → 25
evaluarContrasena("Abcdefg1")         → "fuerte"
evaluarContrasena("Abcdefgh")         → "media"
evaluarContrasena("abc")              → "débil"
generarContrasena(3)                  → null
palabras("hola   mundo")              → ["hola", "mundo"]
contarCaracteres("a b c", false)      → 3
minutosLectura("")                    → 0
```

### Preguntas

**1. ¿Qué funciones usa `evaluarContrasena`? ¿Y `generarContrasena`?**
`evaluarContrasena` usa `longitudSuficiente`, `tieneMayuscula`, `tieneMinuscula` y `tieneNumero`. `generarContrasena` usa `caracterAleatorio`, que a su vez usa `numeroAleatorio`. También usa `Number.isInteger` para comprobar la longitud.

**2. ¿Cuál fue la función más difícil? ¿Por qué?**
`palabras`. Con `"hola   mundo".split(" ")` salen 4 trozos, dos de ellos vacíos, y `"".split(" ")` da `[""]`, que cuenta como una palabra. La solución fue separar por cualquier grupo de espacios (`/\s+/`) y quitar los trozos vacíos con `filter`. Como el resto de funciones del contador dependen de ella, había que acertar a la primera.

