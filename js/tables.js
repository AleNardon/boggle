function createRegisterPlay(play) {
	return `<div class="contentTable"><span> ${play.word} </span><span> ${play.point} </span></div>`;
}
function createTablePoints(plays) {
	let len = plays.length;
	let html = "";
	for (let i = 0; i < len; i++) {
		html += createRegisterPlay(plays[i]);
	}
	return html;
}
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

			if (dir == "asc") {
				if (xContent > yContent) {
					shouldSwitch = true;
					break;
				}
			} else if (dir == "desc") {
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
			if (switchcount == 0 && dir == "asc") {
				dir = "desc";
				switching = true;
			}
		}
	}
}

function createTableRanking() {
	let rank = JSON.parse(localStorage.getItem("ranking"));

	if (
		rank === null ||
		rank === undefined ||
		rank === "" ||
		rank.length === 0
	) {
		return;
	}
	rank = rank.sort(function (a, b) {
		return parseInt(b.points) - parseInt(a.points);
	});
	let table = document.querySelector("#tableRanking tbody");
	let html = "";
	for (let i = 0; i < rank.length; i++) {
        html += "<tr>";
		html += `<td>${rank[i].name}</td><td>${rank[i].points}</td><td>${
            rank[i].time
		}</td><td>${new Date(rank[i].date).toLocaleDateString("es-es")}</td>`;
		html += "</tr>";
	}
	table.innerHTML = html;
    
    document.getElementById("NameRankTable").addEventListener("click", function(){ sortTable(0,"string  ")});
    document.getElementById("PointsRankTable").addEventListener("click", function(){ sortTable(1,"number")});
    document.getElementById("TimeRankTable").addEventListener("click", function(){ sortTable(2,"number")});
    document.getElementById("DateRankTable").addEventListener("click", function(){sortTable(3,"date")});

}
