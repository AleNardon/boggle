function finishTime() {
	document.getElementById("buttonAccept").disabled = true;
	let ring = new Audio("../sounds/ring.mp3");
	ring.play();
	displayGameOverModal();
	// ocultar el inicio del juego
	document.getElementById("startGame").style.display = "";
	// mostrar el juego
	document.getElementById("viewGame").style.display = "none";
	let rank = JSON.parse(localStorage.getItem("ranking"));
	let configPlay = JSON.parse(localStorage.getItem("configPlay"));
	let rankPlay = {
		name: configPlay.name,
		points: localStorage.getItem("points"),
		date: configPlay.day,
		time: configPlay.time,
	};

	if (rank === null || rank === undefined || rank === "" || rank.length === 0) {
		localStorage.setItem("ranking", JSON.stringify([rankPlay]));
        } else {
        rank.push(rankPlay)
        localStorage.setItem("ranking", JSON.stringify(rank));
	}
	createTableRanking();
}

function startTimer() {
	let timerDisplay = document.getElementById("timer");
	let time = JSON.parse(localStorage.getItem("configPlay")).time;
	let totalTime = time * 60; // 3 minutos en segundos
	// let totalTime = 10; // 3 minutos en segundos

	let interval = setInterval(function () {
		let minutes = Math.floor(totalTime / 60);
		let seconds = totalTime % 60;

		// Formatear los números para que siempre tengan dos dígitos
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		timerDisplay.textContent = minutes + ":" + seconds;
		if (totalTime === 10) {
			timerDisplay.classList.add("timerRed");
			let clock = new Audio("../sounds/clock.mp3");
			clock.play();
		}

		if (totalTime <= 0) {
			clearInterval(interval);
			finishTime();
		} else {
			totalTime--;
		}
	}, 1000);
}
