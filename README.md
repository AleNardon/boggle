# Boggle

## Universidad Abierta Interamericana

### Final de Desarrollo de Arquitecturas Web

**Turno Mañana**

**Profesor:** Dario Marañes 

**Fecha:** 08/2024

**Alumno:** Alejo Nardon

**Link de GitHub:**
https://github.com/AleNardon/boggle

**Link de GitHub Pages:**
https://alenardon.github.io/boggle/
## Introducción

Boggle es un juego de palabras en el que los jugadores intentan encontrar tantas palabras como puedan en una cuadrícula de 16 casillas (4x4) que contienen letras de forma aleatoria, dentro de un límite de tiempo establecido.

## Reglas

Para comenzar el juego, el usuario deberá ingresar un nombre válido con más de 3 caracteres y seleccionar el tiempo deseado.

El juego comienza al ordenarse las letras en la cuadrícula, momento que coincide con el inicio del temporizador (que puede configurarse a 1, 2 o 3 minutos).

Para buscar las palabras se deben tener en cuenta los siguientes criterios:

- Las palabras deben tener al menos tres letras.
- Cada letra, después de la primera, debe ser vecina horizontal, vertical o diagonal de la anterior.
- Ninguna casilla de letras individual se puede utilizar más de una vez en una palabra.
- Se permiten múltiples formas de la misma palabra, como formas singulares y plurales y otras derivaciones. No se aceptan nombres propios, artículos ni pronombres.
- Se permiten palabras dentro de palabras, como “casa” y “casamiento”.

Las palabras ingresadas deben ser palabras reales y no haberse ingresado anteriormente; de lo contrario, habrá una penalización de 1 punto menos.

## Jugabilidad

Al comenzar el juego, el usuario podrá realizar distintas acciones en el tablero:

1. Seleccionar una letra que no ha sido seleccionada previamente. Esta se encontrará en un color clarito, y si ya se había seleccionado alguna letra, la eliminará y seleccionará esa como primera letra.
2. Si se selecciona la última letra que ha sido clickeada, que se podrá diferenciar por un borde naranja, empezará una nueva palabra con esta letra como la primera de la palabra.
3. Si se selecciona una de las posibles letras para seguir la jugada y formar la palabra, que se podrá reconocer porque su fondo cambia a un naranja claro, esta letra se sumará a la jugada y se habilitarán las siguientes posibles letras a jugar.
4. Si se selecciona una letra de la jugada que no sea la última, que estará con un fondo gris oscuro, se establecerá la jugada al momento en que se seleccionó esa letra, borrando las letras jugadas que siguieron después de esa.

## Puntos

| Longitud de la palabra (letras) | Puntos |
| --- | --- |
| 3, 4 | 1 |
| 5 | 2 |
| 6 | 3 |
| 7 | 5 |
| 8+ | 11 |