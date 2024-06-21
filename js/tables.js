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

function createTableRanking() {
	let rank = JSON.parse(localStorage.getItem("ranking"));
    if (rank === null || rank === undefined || rank === "" || rank.length === 0) {
        return
    }
	let table = document.querySelector('#tableRanking tbody');
	let html = "";
	for (let i = 0; i < rank.length; i++) {
		html += "<tr>";
		html += `<td>${rank[i].name}</td><td>${rank[i].points}</td><td>${rank[i].time}</td><td>${new Date(rank[i].date).toLocaleDateString("es-es")}</td>`;
		html += "</tr>";
	}
    table.innerHTML = html;
}
