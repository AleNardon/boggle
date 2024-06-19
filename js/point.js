localStorage.setItem("points", 0);
localStorage.setItem("wordsPlayed", JSON.stringify([]));
localStorage.setItem("plays", JSON.stringify([]));
// Longitud de la palabra

// letras --- Puntos
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

// agregar la jugada a la lista de jugadas
function playsTable(word, points) {
	let plays = JSON.parse(localStorage.getItem("plays"));
	if (plays === undefined) {
		localStorage.setItem("plays", JSON.stringify([]));
		plays = JSON.parse(localStorage.getItem("plays"));
	}
	plays.push({ word: word, point: points });
	localStorage.setItem("plays", JSON.stringify(plays));
}

function playWord(word, point) {
	// agregar la palabra y el puntaje a la tabla de jugadas
	playsTable(word, point);
	//agregar la palabra a las jugadas
	let listWord = JSON.parse(localStorage.getItem("wordsPlayed"));
	listWord.push(word);
	localStorage.setItem("wordsPlayed", JSON.stringify(listWord));

	// tomar los puntos totales
	let totalPoints = localStorage.getItem("points");
	// sumar los puntos al total de puntos
	localStorage.setItem("points", totalPoints + point);
	// mostrar los puntos en la pantalla
	document.getElementById("points").innerText = totalPoints.toString();
}

async function accept() {
	let word = document.getElementById("wordSelected").innerText;

	// la palabra ya se ha escrito?
	let p = pointsWord(word);

	if (
		p === -1 ||
		JSON.parse(localStorage.getItem("wordsPlayed")).includes(word)
	) {
		playWord(word, -1);
	} else {
		// la palabra no existe en el diccionario
		try {
			const res = await fetch(
				`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);
			console.log(word);
			let status = res.status;
			if (status === 200) {
				playWord(word, p);
			} else {
				playWord(word, -1);
			}
		} catch (error) {
			console.error(error);
		}
	}
	cleanBoard();
	document.getElementById("wordSelected").innerText = "";
}
