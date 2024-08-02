// Funcion que dada una jugada con el formato {word: string, point: number}
//  devuelve un str con el registro que servira para la tabla de jugadas
function createRegisterPlay(play) {
	return (
		"<div class='contentTable'><span>" +
		play.word +
		"</span><span> " +
		play.point +
		" </span></div>"
	);
}
// Funcion que dada un array de jugadas con el formato {word: string, point: number}
// devuelve un str con las jugadas en formato de tabla
function createTablePoints(plays) {
	var len = plays.length;
	var html = "";
	for (var i = 0; i < len; i++) {
		html += createRegisterPlay(plays[i]);
	}
	return html;
}
// Funcion que servira para ordenar la tabla dependiendo su columna y tipo
// ingresando el indice de la columna y el tipo de dato que se quiere ordenar
function createHtmlTable(data) {
	var html = "",
		d;
	for (var i = 0; i < data.length; i++) {
		d = new Date(data[i].date);
		html +=
			"<tr><td>" +
			data[i].name +
			"</td><td>" +
			data[i].points +
			"</td><td>" +
			data[i].time +
			"</td><td>" +
			d.toLocaleDateString("en-us") +
			" " +
			d.getHours() +
			":" +
			d.getMinutes() +
			"</td></tr>";
	}
	return html;
}
// Dado un array de objetos, el valor por el que se quiere ordenar y el tipo de orden 1 ascendente, 0 descendente
// retorna el array ordenado por el valor especificado
function orderByNumber(data, entrie, ascDesc) {
	if (ascDesc === 1) {
		data.sort(function (a, b) {
			return parseInt(a[entrie]) - parseInt(b[entrie]);
		});
	} else {
		data.sort(function (a, b) {
			return parseInt(b[entrie]) - parseInt(a[entrie]);
		});
	}
}
function orderByString(data, entrie, ascDesc) {
	var strA, strB;
	if (ascDesc === 0) {
		data.sort(function (a, b) {
			strA = a[entrie].toUpperCase();
			strB = b[entrie].toUpperCase();
			return strA.localeCompare(strB);
		});
	} else {
		data.sort(function (a, b) {
			strA = a[entrie].toUpperCase();
			strB = b[entrie].toUpperCase();
			return strB.localeCompare(strA);
		});
	}
}
function orderByDate(data, entrie, ascDesc) {
	var dateA, dateB;
	if (ascDesc === 1) {
		data.sort(function (a, b) {
			dateA = new Date(a[entrie]);
			dateB = new Date(b[entrie]);
			return dateA - dateB;
		});
	} else {
		data.sort(function (a, b) {
			dateA = new Date(a[entrie]);
			dateB = new Date(b[entrie]);
			return dateB - dateA;
		});
	}
}
// funcion que quita las clases asc o desc de las columnas
function removeClassTable() {
	document.getElementById("nameRankTable").classList = "";
	document.getElementById("pointsRankTable").classList = "";
	document.getElementById("timeRankTable").classList = "";
	document.getElementById("dateRankTable").classList = "";
}
// Funcion que dada un campo del objeto el tipo y el id de la columna de la tabla de ranking
// ordena la tabla dependiendo el campo y el tipo
// 1 de menor a mayor asc A-Z
// 0 de mayor a menor desc Z-A
function sortTable(entrie, type, columnId) {
	var table = document.getElementById("tableRanking");
	var dir;
	var html = "";
	var tbody = table.getElementsByTagName("tbody")[0];
	var ranking = localStorage.getItem("ranking");
	if (ranking === null) {
		return;
	}
	var columnClass = document.getElementById(columnId).classList;
	columnClass.contains("desc") ? (dir = 1) : (dir = 0);
	removeClassTable();
	dir === 1 ? columnClass.add("asc") : columnClass.add("desc");
	ranking = JSON.parse(ranking);
	if (type == "number") {
		orderByNumber(ranking, entrie, dir);
	} else if (type == "string") {
		orderByString(ranking, entrie, dir);
	} else if (type == "date") {
		orderByDate(ranking, entrie, dir);
	}
	tbody.innerHTML = createHtmlTable(ranking);
}
// Funcion que agrega eventos a las columnas de la tabla de ranking
// agregamos los eventos a los botones de ordenar a cada columna de la tabla
function eventTableRanking() {
	document
		.getElementById("nameRankTable")
		.addEventListener("click", function () {
			sortTable("name", "string", "nameRankTable");
		});
	document
		.getElementById("pointsRankTable")
		.addEventListener("click", function () {
			sortTable("points", "number", "pointsRankTable");
		});
	document
		.getElementById("timeRankTable")
		.addEventListener("click", function () {
			sortTable("time", "number", "timeRankTable");
		});
	document
		.getElementById("dateRankTable")
		.addEventListener("click", function () {
			sortTable("date", "date", "dateRankTable");
		});
}
// Funcion que creara la tabla de ranking
function createTableRanking() {
	var rank = JSON.parse(localStorage.getItem("ranking"));
	// Si no hay datos en el ranking, no se hace nada
	if (
		rank === null ||
		rank === undefined ||
		rank === "" ||
		rank.length === 0
	) {
		return;
	}
	// Ordenar el ranking por puntos
	rank = rank.sort(function (a, b) {
		return parseInt(b.points) - parseInt(a.points);
	});
	var table = document.querySelector("#tableRanking tbody");
	table.innerHTML = createHtmlTable(rank);
	removeClassTable();
	eventTableRanking();
}