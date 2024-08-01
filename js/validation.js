//----- validaciones en el formulario de inicio de juego----------
// configuracion inicial
var btnStart = document.getElementById("btnStartGame");
btnStart.disabled = true;
btnStart.classList.add("disabledBtn");
document.getElementById("errorUsernameStart").style.display = "none";

//validar el inicio de juego el nombre correcto
function validateStartGame() {
	var btnstartButton = document.getElementById("btnStartGame");
	var username = document.getElementById("username");
	console.log("cac");

	if (username.value.length >= 3) {
		btnstartButton.disabled = false;
		btnstartButton.classList.remove("disabledBtn");
	} else {
		btnstartButton.disabled = true;
		btnstartButton.classList.add("disabledBtn");
	}
}
// ejecute al presionar una tecla
document.getElementById("username").addEventListener("keyup", function () {
	validateStartGame();
});
//ejecute al salir del campo
document.getElementById("username").addEventListener("blur", function () {
	var username = document.getElementById("username");
	if (username.value.length < 3) {
		document.getElementById("errorUsernameStart").style.display = "block";
	} else {
		document.getElementById("errorUsernameStart").style.display = "none";
	}
});
//ejecute al enfocar el campo
document.getElementById("username").addEventListener("focus", function () {
	var username = document.getElementById("username");
	document.getElementById("errorUsernameStart").style.display = "none";
});

