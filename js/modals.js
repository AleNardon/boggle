function setModal(html) {
	// Get the modal
	let modal = document.getElementById("myModal");

	// Get the button that opens the modal
	let btn = document.getElementById("contact");

	// Get the <span> element that closes the modal
	let span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal
	btn.onclick = function () {
		modal.style.display = "block";
	};

	// When the user clicks on <span> (x), close the modal
	span.onclick = function () {
		modal.style.display = "none";
	};

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = "none";
		}
	};
	document.getElementById("modalHtml").innerHTML = html;
}

function displayGameOverModal() {
	// Get the modal
	let modal = document.getElementById("myModal");
	// Get the <span> element that closes the modal
	let span = document.getElementsByClassName("close")[0];

	let name = JSON.parse(localStorage.getItem("configPlay")).name;
	let time = JSON.parse(localStorage.getItem("configPlay")).time;
	let points = localStorage.getItem("points");

	let board = writeBoard(JSON.parse(localStorage.getItem("board")));
	let plays = JSON.parse(localStorage.getItem("plays"));
	let playsHtml = createTablePoints(plays);

	if (playsHtml === "" || playsHtml === undefined) {
		playsHtml = `<div class="error">No words were played</div>`;
	} else {
		playsHtml = `<div class="wordsPlayed">
                    <h3>Words played</h3>
                    <div id="tablePointsFinish">
                        <div class="titleTable">
                            <span> Words </span>
                            <span> Points </span>
                        </div>
                        <div >
                            ${playsHtml}
                        </div>
                    </div>
                </div>`;
	}
	let htmlModal = ` 
        <div class="gameOver">
            <h2>Game Over</h2>
    
            <div class="infoGameOver">
                <div class="dashName finishName">Name: ${name}</div>
                <div class="dashPoints finishPoint ${
					points < 0 ? "redPoints" : "greenPoints"
				}">Total Points: ${points}</div>
                <div class="timerFinish">${
					parseInt(time) === 1 ? "1 minute" : time + " minute"
				} </div>
                <div class="finishBoard" >${board}</div>
            </div>
            ${playsHtml}

        </div>
`;
	document.getElementById("modalHtml").innerHTML = htmlModal;

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
