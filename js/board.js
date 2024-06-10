const SELECTEDLETTERS = [];
const LENBOARD = 4;

// Funcion que recibe una letra y la agrega a jugada
// si no recibe nada limpiara la jugada
function wordPlay(word) {
	if (word === undefined) {
		document.getElementById("wordSelected").innerHTML = "";
	} else {
		document.getElementById("wordSelected").innerHTML += word;
	}
}

// Funcion que creara el tablero con letras al azar en cada boton el input que recibira es el tamaño del tablero
// el cual sera simetrico es decir si se recibe un 4 el tablero sera de 4x4
//Devolvera un array de 2 dimenciones con todas las letras ingresadas y rellenara en el html el tablero con las letras
function createBoard(len) {
	let letters = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
	let lettersArray = letters.split("");
	let array = [];
	let board = document.getElementById("board");
	board.innerHTML = "";
	for (let i = 0; i < len; i++) {
		array.push([]);
		for (let a = 0; a < len; a++) {
			let randomLetter =
				lettersArray[Math.floor(Math.random() * lettersArray.length)];
			array[i].push(randomLetter);
			board.innerHTML += `<div class="buttonLetter buttonUnSelected" id="btn${i}-${a}" >${randomLetter}</div>`;
		}
	}
	// eliminar la palabra seleccionada
	wordPlay();
	// agregamos los event listeners a los botones para que tengan funcionalidad de inicio inicio
	addListener("buttonLetter", 1);
	return array;
}

//funcion que dados dos arrays de arrays genere un array con los elementos que sean unicos de ese array
//ejemplo [[0,0],[1,0]]  [[1,0],[2,2],[1,2]] => [[2,2],[1,2]]
// la funcion servira para filtrar las posibles jugadas pero que ya se hayan realizado

function uniqueElements(playedMoves, possibleMoves) {
	// Convertir las jugadas realizadas a un conjunto de cadenas para una búsqueda rápida
	const playedSet = new Set(playedMoves.map((move) => JSON.stringify(move)));

	// Filtrar las jugadas posibles que no estén en el conjunto de jugadas realizadas
	const remainingMoves = possibleMoves.filter(
		(move) => !playedSet.has(JSON.stringify(move))
	);

	return remainingMoves;
}

//funcion que identifica que jugadas pueden seguir
//recibe la letra seleccionada y devolbera las jugadas que se podran seleccionar sacando las letras que ya se seleccionaron
//ejemplo [0,0] podra seleccionar [0,1][1,0][1,1] si es que ninguna de esas 3 jugadas ya se realizo
function possiblePlays(btn, lenBoard) {
	let btnArray = btn.replace("btn", "").split("-");
	let compare = btnArray[0] + "-" + btnArray[1];
	let x = parseInt(btnArray[0]);
	let y = parseInt(btnArray[1]);
	btnArray = [x, y];
	let possiblePlays = [];
	let len = lenBoard - 1;

	//esquina superior izquierda
	if (compare === "0-0") {
		possiblePlays.push([0, 1], [1, 0], [1, 1]);
	}

	//esquina superior derecha
	else if (compare === "0-" + len) {
		possiblePlays.push([0, len - 1], [1, len - 1], [1, len]);
	}

	// esquina inferior izquierda
	else if (compare === len + "-0") {
		possiblePlays.push([len - 1, 0], [len - 1, 1], [len, 1]);
	}

	// esquina inferior derecha
	else if (compare === len + "-" + len) {
		possiblePlays.push([len - 1, len], [len, len - 1], [len - 1, len - 1]);
	}
	//columna izquierda sin esquinas
	else if (compare.includes("-0")) {
		possiblePlays.push(
			[x - 1, y],
			[x - 1, y + 1],
			[x, y + 1],
			[x + 1, y + 1],
			[x + 1, y]
		);
	}
	//columna derecha sin esquinas
	else if (compare.includes("-" + len)) {
		possiblePlays.push(
			[x - 1, y],
			[x - 1, y - 1],
			[x, y - 1],
			[x + 1, y - 1],
			[x + 1, y]
		);
	}
	//fila superior sin esquinas
	else if (compare.includes("0-")) {
		possiblePlays.push(
			[x, y - 1],
			[x + 1, y - 1],
			[x + 1, y],
			[x + 1, y + 1],
			[x, y + 1]
		);
	}
	//fila inferior sin esquinas
	else if (compare.includes(len + "-")) {
		possiblePlays.push(
			[x, y - 1],
			[x - 1, y - 1],
			[x - 1, y],
			[x - 1, y + 1],
			[x, y + 1]
		);
	}
	// caso general
	else {
		possiblePlays.push(
			[x - 1, y - 1],
			[x - 1, y],
			[x - 1, y + 1],
			[x, y + 1],
			[x + 1, y + 1],
			[x + 1, y],
			[x + 1, y - 1],
			[x, y - 1]
		);
	}
	// Filtrar las jugadas posibles que no estén en la lista de jugadas realizadas
	return uniqueElements(SELECTEDLETTERS, possiblePlays);
}

// funcion que recibe un array de jugadas del tipo [[0,1][0,0][1,0]]
// y activa los botones que pueden ser posibles jugadas
function activePossibleButtons(arr) {
	arr.forEach((element) => {
		let btnLetter = document.getElementById(
			"btn" + element[0] + "-" + element[1]
		);
		btnLetter.classList.add("buttonPossible");
		btnLetter.classList.remove("buttonUnSelected");
	});
}
// funcion que recibe una clase y un identificador
// y elimina la clase de todos los elementos que tengan ese identificador que tambien sera una clase
// si no se recibe un identificador se eliminara la clase de todos los elementos que tengan la clase especificada
function removeClass(clas, ident) {
	let elements;
	if (ident === undefined) {
		elements = document.querySelectorAll("." + clas);
	} else {
		elements = document.querySelectorAll("." + ident);
	}

	// Itera sobre cada elemento y elimina la clase especificada
	elements.forEach((element) => {
		element.classList.remove(clas);
	});
}

// funcion que recibe una clase y un identificador
// y agrega la clase a todos los elementos que tengan ese identificador que tambien sera una clase
function addClass(clas, ident) {
	const elements = document.querySelectorAll("." + ident);

	// Itera sobre cada elemento y elimina la clase especificada
	elements.forEach((element) => {
		element.classList.add(clas);
	});
}
// funcion que creara un event listener a todos los elementos que tengan la clase especificada
// tambien debera ingresar varListener que sera una variable para identificar que tipo de evento se le agregara
// 1 para initSelectLetter
// 2 para selectLetter
// 3 para backLetter
function addListener(className, varListener) {
	// Seleccionamos todos los elementos con la clase especificada
	const elements = document.querySelectorAll(`.${className}`);

	// Iteramos sobre los elementos y agregamos el evento click
	elements.forEach((element) => {
		// eliminamos los posibles eventos que pueda tener el boton
		element.removeEventListener("click", initSelectLetter);
		element.removeEventListener("click", selectLetter);
		element.removeEventListener("click", backLetter);

		// agrega el evento correspondiente al boton
		if (varListener === 1) {
			element.addEventListener("click", initSelectLetter);
		} else if (varListener === 2) {
			element.addEventListener("click", selectLetter);
		} else if (varListener === 3) {
			element.addEventListener("click", backLetter);
		}
	});
}

// funcion que remueve los event listeners de los elementos que tengan la clase especificada
function removeListener(className) {
	// Seleccionamos todos los elementos con la clase especificada
	const elements = document.querySelectorAll(`.${className}`);

	// Iteramos sobre los elementos y agregamos el evento click
	elements.forEach((element) => {
		element.removeEventListener("click", selectLetter);
		element.removeEventListener("click", initSelectLetter);
		element.removeEventListener("click", backLetter);
	});
}

// ---------- Funciones a los botones -----------

// funcion que seleccionara la letra y la agregara a la jugada
// esta funcion esta pensada para seguir con la jugada y no para iniciar una nueva
function selectLetter(btn) {
	btn = btn.target.id;
	let xy = btn.replace("btn", "").split("-");
	SELECTEDLETTERS.push([parseInt(xy[0]), parseInt(xy[1])]);
	let btnLetter = document.getElementById(btn);

	// quitamos los event listeners de las viejas posibilidades
	removeListener("buttonPossible");

	//colocamos la marca de no seleccionado a los posibles viejos
	addClass("buttonUnSelected", "buttonPossible");

	//quitamos las clases de los viejos posibles y ultimo
	removeClass("buttonPossible");
	removeClass("buttonLast");

	// quitamos la clase de no seleccionado al boton seleccionado y le agg la clase de seleccionado y ultimo
	btnLetter.classList.remove("buttonUnSelected");
	btnLetter.classList.add("buttonLast", "buttonSelected");

	//seleccionar los posibles botones a seleccionar
	let possibleButtons = possiblePlays(btn, LENBOARD);

	//les ponemos estilos a los posibles botones que se pueden jugar y le quitamos el estilo de no seleccionado
	activePossibleButtons(possibleButtons);
	removeClass("buttonUnSelected", "buttonPossible");

	//agregamos los event listeners a los  botones
	addListener("buttonSelected", 3);
	addListener("buttonPossible", 2);
	addListener("buttonUnSelected", 1);

	// rellenamos la jugada con la letra
	wordPlay(btnLetter.innerHTML);
}

// funcion que iniciara la jugada al seleccionar el boton que tenga esta funcion
function initSelectLetter(btn) {
	btn = btn.target.id;
	// limpia la lista de jugadas
	SELECTEDLETTERS.length = 0;
	// extraemos la jugada
	let xy = btn.replace("btn", "").split("-");
	// agregamos la jugada a la lista
	SELECTEDLETTERS.push([parseInt(xy[0]), parseInt(xy[1])]);
	// seleccionamos el boton
	let btnLetter = document.getElementById(btn);

	// limpiamos los estilos del tablero
	removeClass("buttonPossible");
	removeClass("buttonLast");
	removeClass("buttonSelected");
	//Ponemos que no se selecciono ningun boton
	addClass("buttonUnSelected", "buttonLetter");

	// limpiamos la palabra que se habia ingresado
	wordPlay();

	// agregamos los estilos al boton seleccionado
	btnLetter.classList.add("buttonLast", "buttonSelected");
	btnLetter.classList.remove("buttonUnSelected");

	// quitamos todos los event listeners
	removeListener("buttonLetter");

	//seleccionar los posibles botones a seleccionar
	let possibleButtons = possiblePlays(btn, LENBOARD);
	//les ponemos estilos a los posibles botones que se pueden jugar
	activePossibleButtons(possibleButtons);
	//agregamos los event listeners a los posibles botones
	addListener("buttonPossible", 2);
	// quitamos los estilos de no seleccionado a los posibles botones
	removeClass("buttonUnSelected", "buttonPossible");
	// agregamos los event listeners a los botones no seleccionados por si quiere volver a comenzar
	addListener("buttonUnSelected", 1);
	// agregamos los event listeners a los botones seleccionados por si quiere volver a comenzar
	addListener("buttonSelected", 3);
	// rellenamos la jugada con la letra
	wordPlay(btnLetter.innerHTML);
}
// funcion que dada una jugada la deseleccionara y tambien la quitara de la palabra que se esta jugando
function unselectLetter(play) {
	let btnLetter = document.getElementById("btn" + play[0] + "-" + play[1]);
	btnLetter.classList.remove("buttonLast", "buttonSelected");
	btnLetter.classList.add("buttonUnSelected");
	let word = document.getElementById("wordSelected");
	word.innerHTML = word.innerHTML.slice(0, -1);
}
//boton de regreso
function backLetter(btn) {
	console.log("BACK");
	btn = btn.target.id;
	let playedMove = btn.replace("btn", "").split("-");
	playedMove = [parseInt(playedMove[0]), parseInt(playedMove[1])];
	const array = SELECTEDLETTERS;
	let len = array.length;
	for (
		let i = len - 1;
		i >= 0 &&
		!(array[i][0] === playedMove[0] && array[i][1] === playedMove[1]);
		i--
	) {
		unselectLetter(array[i]);
		array.pop();
	}
	let btnLetter = document.getElementById(btn);
	// quitamos los event listeners de las viejas posibilidades
	removeListener("buttonLetter");
	//colocamos la marca de no seleccionado a los posibles viejos
	addClass("buttonUnSelected", "buttonPossible");

	removeClass("buttonPossible");
	removeClass("buttonLast");

	btnLetter.classList.add("buttonLast", "buttonSelected");
	//seleccionar los posibles botones a seleccionar
	let possibleButtons = possiblePlays(btn, LENBOARD);

	//activamos los posibles botones del boton al que se volvio
	activePossibleButtons(possibleButtons);
	// le quitamos la clase unselected a las posibles jugadas
	removeClass("buttonUnSelected", "buttonPossible");
	// agregamos los event listeners a los  botones
	addListener("buttonSelected", 3);
	addListener("buttonPossible", 2);
	addListener("buttonUnSelected", 1);
	// rellenamos la jugada con la letra
}

// funcion que limpiara el tablero
function cleanBoard() {
	// limpiamos la palabra seleccionada
	wordPlay();
	// limpiamos la lista de jugadas
	SELECTEDLETTERS.length = 0;

	// limpiamos los estilos del tablero
	removeClass("buttonPossible");
	removeClass("buttonLast");
	removeClass("buttonSelected");
	removeClass("buttonUnSelected");

	// //colocamos la marca de no seleccionado a todo el tablero
	// addClass("buttonUnSelected", "buttonLetter");
	// // quitamos todos los event listeners
	// removeListener("buttonLetter");
	// // agregamos los event listeners a los botones para que tengan funcionalidad de inicio inicio
	// addListener("buttonLetter", 1);
}
