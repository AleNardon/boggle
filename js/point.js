// Longitud de la palabra
// funcion que dada una palabra devuelve los puntos que se le asignan dependiendo de su longitud
// letras --- Puntos
//  >3  ---- -1
//  3,4 ---- 1
//   5  ---- 2
//   6  ---- 3
//   7  ---- 5
//   8+ ---- 11

function pointsWord(word) {
	if (word.length >= 3 && word.length <= 4) {
		return 1;
	} else if (word.length == 5) {
		return 2;
	} else if (word.length == 6) {
		return 3;
	} else if (word.length == 7) {
		return 5;
	} else if (word.length >= 8) {
		return 11;
	} else {
		return -1;
	}
}

//Funcion que dada una palabra y los puntos agregar la jugada a la lista de jugadas
function playsTable(word, points) {
	var plays = JSON.parse(localStorage.getItem("plays"));
	if (plays === undefined) {
		localStorage.setItem("plays", JSON.stringify([]));
		plays = JSON.parse(localStorage.getItem("plays"));
	}
	plays.push({ word: word, point: points });
	localStorage.setItem("plays", JSON.stringify(plays));
}

// funcion que dada una palabra y los puntos modifica el marcador y las jugadas
function playWord(word, point) {
	// agregar la palabra y el puntaje a la tabla de jugadas
	playsTable(word, point);
	//agregar la palabra a las jugadas
	var listWord = JSON.parse(localStorage.getItem("wordsPlayed"));
	listWord.push(word);
	localStorage.setItem("wordsPlayed", JSON.stringify(listWord));

	// tomar los puntos totales
	var totalPoints =
		parseInt(localStorage.getItem("points")) + parseInt(point);
	// sumar los puntos al total de puntos
	localStorage.setItem("points", totalPoints);
	// mostrar los puntos en la pantalla
	document.getElementById("points").innerText = totalPoints.toString();
}

//funcion que le dara la funcionalidad al boton de aceptar la jugada
async function accept() {
	// sonidos de correcto e incorrecto para la jugada
	var correct = new Audio("../sounds/correct.mp3");
	var incorrect = new Audio("../sounds/incorrect.mp3");

	var word = document.getElementById("wordSelected").innerText;
	document.getElementById("wordSelected").innerText = "";

	// si no hay palabra no hacer nada
	if (word === "") {
		return;
	}

	var p = pointsWord(word);

	// si la palabra ya fue jugada o es menor a 3 letras -> mala jugada
	if (
		p === -1 ||
		JSON.parse(localStorage.getItem("wordsPlayed")).includes(word)
	) {
		playWord(word, -1);
		incorrect.play();
		p = -1;
	} else {
		try {
			const res = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);

			var status = res.status;
			if (status === 200) {
				// si la palabra se encuentra en el diccionario -> buena jugada
				playWord(word, p);
				correct.play();
			} else {
				// si la palabra no se encuentra en el diccionario -> mala jugada
				p = -1;
				playWord(word, -1);
				incorrect.play();
			}
		} catch (error) {}
	}

	cleanBoard();
	// mostrar la jugada en la tabla de jugadas
	document.getElementById("plays").innerHTML += createRegisterPlay({
		word: word,
		point: p,
	});
}
