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
function sortTable(columnIndex, type) {
	var table,
		rows,
		switching,
		i,
		x,
		y,
		shouldSwitch,
		dir,
		switchcount = 0;
	table = document.getElementById("tableRanking");
	switching = true;
	dir = "asc";

	while (switching) {
		switching = false;
		rows = table.rows;
		for (i = 1; i < rows.length - 1; i++) {
			shouldSwitch = false;
			x = rows[i].getElementsByTagName("td")[columnIndex];
			y = rows[i + 1].getElementsByTagName("td")[columnIndex];

			if (type === "number") {
				var xContent = parseFloat(x.innerHTML);
				var yContent = parseFloat(y.innerHTML);
			} else if (type === "date") {
				var xContent = new Date(x.innerHTML);
				var yContent = new Date(y.innerHTML);
			} else {
				var xContent = x.innerHTML.toLowerCase();
				var yContent = y.innerHTML.toLowerCase();
			}

			if (dir === "asc") {
				if (xContent > yContent) {
					shouldSwitch = true;
					break;
				}
			} else if (dir === "desc") {
				if (xContent < yContent) {
					shouldSwitch = true;
					break;
				}
			}
		}
		if (shouldSwitch) {
			rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
			switching = true;
			switchcount++;
		} else {
			if (switchcount === 0 && dir === "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
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
	var html = "";
	for (var i = 0; i < rank.length; i++) {
		html +=
			"<tr><td>" +
			rank[i].name +
			"</td><td>" +
			rank[i].points +
			"</td><td>" +
			rank[i].time +
			"</td><td>" +
			new Date(rank[i].date).toLocaleDateString("es-es") +
			"</td></tr>";
	}
	table.innerHTML = html;

	// agregamos los eventos a los botones de ordenar a cada columna de la tabla
	document
		.getElementById("NameRankTable")
		.addEventListener("click", function () {
			sortTable(0, "string  ");
		});
	document
		.getElementById("PointsRankTable")
		.addEventListener("click", function () {
			sortTable(1, "number");
		});
	document
		.getElementById("TimeRankTable")
		.addEventListener("click", function () {
			sortTable(2, "number");
		});
	document
		.getElementById("DateRankTable")
		.addEventListener("click", function () {
			sortTable(3, "date");
		});
}
