const SELECTEDLETTERS = [];
const LENBOARD = 4;

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
	addListener("buttonLetter", 1);
	return array;
}

//funcion que dados dos arrays de arrays genere un array con los elementos que sean unicos de ese array
//ejemplo [[0,1][1,1][1,0]],[[0,1][0,3][3,3][2,3][1,1]] => [[1,0]]

function uniqueElements(playedMoves, possibleMoves) {
	// Convertir las jugadas realizadas a un conjunto de cadenas para una búsqueda rápida
	// let playedMoves = SELECTEDLETTERS;
	const playedSet = new Set(playedMoves.map((move) => JSON.stringify(move)));

	// Filtrar las jugadas posibles que no estén en el conjunto de jugadas realizadas
	const remainingMoves = possibleMoves.filter(
		(move) => !playedSet.has(JSON.stringify(move))
	);

	return remainingMoves;
}
//test

//funcion que identifica que jugadas pueden seguir
//recibe la letra seleccionada y devolbera las letras que se podran seleccionar sacando las letras que ya se seleccionaron
//ejemplo [0,0] podra seleccionar [0,1][1,0][1,1]
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
	} else {
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
	return uniqueElements(SELECTEDLETTERS, possiblePlays);
}

function activePossibleButtons(arr) {
	arr.forEach((element) => {
		let btnLetter = document.getElementById(
			"btn" + element[0] + "-" + element[1]
		);
		btnLetter.classList.add("buttonPossible");
		btnLetter.classList.remove("buttonUnSelected");
	});
}
function removeClass(clas, ident) {
	let elements;
	if (ident === undefined) {
		// Selecciona todos los elementos que coinciden con el selector
		elements = document.querySelectorAll("." + clas);
	} else {
		// Selecciona todos los elementos que coinciden con el selector
		elements = document.querySelectorAll("." + ident);
	}

	// Itera sobre cada elemento y elimina la clase especificada
	elements.forEach((element) => {
		element.classList.remove(clas);
	});
}
function addClass(clas, ident) {
	// Selecciona todos los elementos que coinciden con el selector
	const elements = document.querySelectorAll("." + ident);

	// Itera sobre cada elemento y elimina la clase especificada
	elements.forEach((element) => {
		element.classList.add(clas);
	});
}
//1 =init
//2 =select
//3 =back
function addListener(className, varListener) {
	// Seleccionamos todos los elementos con la clase especificada
	const elements = document.querySelectorAll(`.${className}`);

	// Iteramos sobre los elementos y agregamos el evento click
	elements.forEach((element) => {
		if (varListener === 1) {
            
			element.removeEventListener("click", selectLetter);
			element.addEventListener("click", initSelectLetter);
		} else if (varListener === 2) {
			element.removeEventListener("click", initSelectLetter);
			
			element.addEventListener("click", selectLetter);
		}
        else if (varListener === 3) {
            element.removeEventListener("click", initSelectLetter);
			element.removeEventListener("click", selectLetter);
			element.addEventListener("click", backLetter);
        }

	});
}
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

function selectLetter(btn) {
	btn = btn.target.id;
	let xy = btn.replace("btn", "").split("-");
	SELECTEDLETTERS.push([parseInt(xy[0]), parseInt(xy[1])]);
	let btnLetter = document.getElementById(btn);

	// quitamos los event listeners de las viejas posibilidades
	removeListener("buttonPossible");
	//colocamos la marca de no seleccionado a los posibles viejos
	addClass("buttonUnSelected", "buttonPossible");

	removeClass("buttonPossible");
	removeClass("buttonLast");

	btnLetter.classList.remove("buttonUnSelected");
	btnLetter.classList.add("buttonLast", "buttonSelected");
	//seleccionar los posibles botones a seleccionar
	let possibleButtons = possiblePlays(btn, LENBOARD);

	activePossibleButtons(possibleButtons);
	removeClass("buttonUnSelected", "buttonPossible");
    addListener("buttonSelected", 3);
	addListener("buttonPossible", 2);
	addListener("buttonUnSelected", 1);
	// rellenamos la jugada con la letra
	wordPlay(btnLetter.innerHTML);
}

// boton de inicio
// -limpiar el tablero de estilos
// -limpiar la palabra seleccionada
// -limpiar las letras seleccionadas de la lista
// sacar todos los event listeners
// crear event listener para volver a seleccionar letra que seleccione
// crear event listener para las posibles jugadas
function initSelectLetter(btn) {
	btn = btn.target.id;
	// limpia la lista con jugadas
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
	// rellenamos la jugada con la letra
	wordPlay(btnLetter.innerHTML);
}

function unselectLetter(play) {

    let btnLetter = document.getElementById("btn" + play[0] + "-" + play[1]);
    btnLetter.classList.remove("buttonLast", "buttonSelected");
    btnLetter.classList.add("buttonUnselected",);
    let word = document.getElementById("wordSelected"); 
    word.innerHTML =word.innerHTML.slice(0, -1);

}
//boton de regreso
function backLetter(btn) {
    btn = btn.target.id;
    let playedMove = btn.replace("btn", "").split("-");
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

	activePossibleButtons(possibleButtons);
	removeClass("buttonUnSelected", "buttonPossible");
    addListener("buttonSelected", 3);
	addListener("buttonPossible", 2);
	addListener("buttonUnSelected", 1);
	// rellenamos la jugada con la letra

}

//empezar
//crear tablero
// timer
// instanciar tabla de palabras que metio
// instanciar Palabra seleccionada
// instanciar hola NOMBRE!
//instanciar puntos

// const BOARD = createBoard(LENBOARD);
