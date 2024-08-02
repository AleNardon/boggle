// Funcion que se activara al terminar el tiempo de juego
function finishTime() {
	// deshabilitar el boton de aceptar
	document.getElementById("buttonAccept").disabled = true;
	// sonido de finalizacion
	var ring = new Audio("sounds/ring.mp3");
	ring.play();
	// despliega el modal con la informacion de la partida
	displayGameOverModal();
	// mostrar el inicio de juego
	document.getElementById("startGame").style.display = "";
	// ocultar el juego
	document.getElementById("viewGame").style.display = "none";
	var rank = JSON.parse(localStorage.getItem("ranking"));
	// agregar la partida al ranking
	var configPlay = JSON.parse(localStorage.getItem("configPlay"));
	var rankPlay = {
		name: configPlay.name,
		points: localStorage.getItem("points"),
		date: configPlay.day,
		time: configPlay.time,
	};

	if (
		rank === null ||
		rank === undefined ||
		rank === "" ||
		rank.length === 0
	) {
		localStorage.setItem("ranking", JSON.stringify([rankPlay]));
	} else {
		rank.push(rankPlay);
		localStorage.setItem("ranking", JSON.stringify(rank));
	}
	// crear la tabla del ranking
	createTableRanking();
	eventTableRanking();
}
// Funcion que inicia el temporizador
function startTimer() {
	var timerDisplay = document.getElementById("timer");
	var time = JSON.parse(localStorage.getItem("configPlay")).time;
	var totalTime = time * 60;
	// funcion que se ejecutara cada segundo
	var interval = setInterval(function () {
		var minutes = Math.floor(totalTime / 60);
		var seconds = totalTime % 60;
		// Formatear los números para que siempre tengan dos dígitos
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		timerDisplay.textContent = minutes + ":" + seconds;
		// si el tiempo llega a 10 segundos se pone en rojo y suena una alerta
		if (totalTime === 10) {
			timerDisplay.classList.add("timerRed");
			var clock = new Audio("sounds/clock.mp3");
			clock.play();
		}
		// si termina el tiempo se detiene el temporizador y se llama a la funcion de finalizacion
		if (totalTime <= 0) {
			clearInterval(interval);
			finishTime();
		} else {
			totalTime--;
		}
	}, 1000);
}