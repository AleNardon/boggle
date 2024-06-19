localStorage.setItem(
	"configPlay",
	JSON.stringify({ time: 3, name: "Jugador 1" })
);
function startTimer() {
	let buttonAccept = document.getElementById("buttonAccept");
	let timerDisplay = document.getElementById("timer");
	let time = JSON.parse(localStorage.getItem("configPlay")).time;
	let totalTime = time * 60; // 3 minutos en segundos
	



	let interval = setInterval(function () {
		let minutes = Math.floor(totalTime / 60);
		let seconds = totalTime % 60;

		// Formatear los números para que siempre tengan dos dígitos
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;

		timerDisplay.textContent = minutes + ":" + seconds;
		if (totalTime <= 10) {
			timerDisplay.classList.add("timerRed");
		}

		if (totalTime <= 0) {
			clearInterval(interval);
			buttonAccept.disabled = true;
            modalFinishGame();
		} else {
			totalTime--;
		}
	}, 1000);
}
