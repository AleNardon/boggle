// loader
document.addEventListener("DOMContentLoaded", function () {
	// Espera a que el contenido esté completamente cargado
	window.addEventListener("load", function () {
		// Oculta el loader
		document.getElementById("loader").style.display = "none";
		// Muestra el contenido
		document.getElementById("content").classList.remove("hidden");
	});
});
