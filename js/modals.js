// ---------Configuracion del modal de informacion------
var modal = document.getElementById("contactModal");
var btn = document.getElementById("contact");
var span = document.getElementById("closeContact");

btn.onclick = function () {
	modal.style.display = "block";
};

span.onclick = function () {
	modal.style.display = "none";
};

window.onclick = function (event) {
	if (event.target == modal) {
		modal.style.display = "none";
	}
};



// ---------Configuracion del modal de informacion de la partida------
function displayGameOverModal() {

	var modal = document.getElementById("myModal");
	var span = document.getElementById("closeGO");

	var name = JSON.parse(localStorage.getItem("configPlay")).name;
	var time = JSON.parse(localStorage.getItem("configPlay")).time;
	var points = localStorage.getItem("points");

	var board = writeBoard(JSON.parse(localStorage.getItem("board")));
	var plays = JSON.parse(localStorage.getItem("plays"));
	var playsHtml = createTablePoints(plays);

	
    document.getElementById("idNameGO").innerText = name;
    var pointDiv =document.getElementById("idPointsGO")
    pointDiv.innerText = "Total Points: "+points;
    pointDiv.classList.add(points < 0 ? "redPoints" : "greenPoints");
    document.getElementById("idTimerGO").innerText = parseInt(time) === 1 ? "1 minute" : time + " minutes";
    document.getElementById("idBoardGO").innerHTML = board;
    
	
    var errorNoWords = document.getElementById("idErrorNoWordsGO");
    var wordsPlays = document.getElementById("idWordsPlaysGO");

    if (playsHtml === "" || playsHtml === undefined) {
		errorNoWords.style.display = "block";
        wordsPlays.style.display = "none";
	} else {
        errorNoWords.style.display = "none";
        wordsPlays.style.display = "block";
        document.getElementById("idPlaysGO").innerHTML = playsHtml;
	}


	modal.style.display = "block";

	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	};
	// si hace click fuera del modal no se cierre

	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "block";
		}
	};
}
