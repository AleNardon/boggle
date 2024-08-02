"use strict";
// ----- validaciones en el formulario de contacto ----------
// configuracion inicial
var btnSend = document.getElementById("sendContact");
btnSend.disabled = true;
btnSend.classList.add("disabledBtnContact");
var errorName = document.getElementById("errorName");
var errorMessage = document.getElementById("errorMessage");
var errorEmail = document.getElementById("errorEmail");
errorName.style.display = "none";
errorMessage.style.display = "none";
errorEmail.style.display = "none";
//Funcion para validar el nombre que sea mayor a 3 caracteres y solo letras y numeros
function validateName() {
	var name = document.getElementById("name");
	var error = document.getElementById("errorName");
	var namePattern = /^[a-zA-Z0-9 ]+$/;
	if (name.value.length >= 3 && namePattern.test(name.value)) {
		error.style.display = "none";
		return true;
	} else {
		error.style.display = "block";
		return false;
	}
}
//ejecute al salir del campo
document.getElementById("name").addEventListener("blur", function () {
	validateName();
});
//ejecute al enfocar el campo
document.getElementById("name").addEventListener("focus", function () {
	errorName.style.display = "none";
});
// funcion para validar el email que sea un email valido con @ y .
function validateEmail() {
	var email = document.getElementById("email");
	var error = document.getElementById("errorEmail");
	var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	if (email.value.length > 0 && emailPattern.test(email.value)) {
		error.style.display = "none";
		return true;
	} else {
		error.style.display = "block";
		return false;
	}
}
//ejecute al salir del campo
document.getElementById("email").addEventListener("blur", function () {
	validateEmail();
});
//ejecute al enfocar el campo
document.getElementById("email").addEventListener("focus", function () {
	errorEmail.style.display = "none";
});
// validar mensaje
function validateMessage() {
	var message = document.getElementById("message");
	error = document.getElementById("errorMessage");

	if (message.value.length >= 5) {
		error.style.display = "none";
		return true;
	} else {
		error.style.display = "block";
		return false;
	}
}
//ejecute al salir del campo
document.getElementById("message").addEventListener("blur", function () {
	validateMessage();
});
//ejecute al enfocar el campo
document.getElementById("message").addEventListener("focus", function () {
	errorMessage.style.display = "none";
});
// funcion para validar el formulario completo si se cumple habilita el boton de enviar
function validateContact() {
	if (validateName() && validateEmail() && validateMessage()) {
		btnSend.disabled = false;
		btnSend.classList.remove("disabledBtnContact");
	} else {
		btnSend.disabled = true;
		btnSend.classList.add("disabledBtnContact");
	}
}
document.getElementById("name").addEventListener("keyup", function () {
	validateContact();
});
document.getElementById("message").addEventListener("keyup", function () {
	validateContact();
});
document.getElementById("email").addEventListener("keyup", function () {
	validateContact();
});
// Función para el mailto
function sendMail() {
	var name = document.getElementById("name").value;
	var email = document.getElementById("email").value;
	var message = document.getElementById("message").value;
	var mailtoLink =
		"mailto:" +
		encodeURIComponent(email) +
		"?subject=Message from " +
		encodeURIComponent(name) +
		"&body=" +
		encodeURIComponent(message) +
		"%0A%0ADe:%20" +
		encodeURIComponent(name) +
		"%0AEmail:%20" +
		encodeURIComponent(email);

	window.location.href = mailtoLink;
}
// Llama a la función sendMail al hacer clic en el botón
btnSend.addEventListener("click", function (event) {
	event.preventDefault(); // Previene la acción por defecto del botón si está en un formulario
	sendMail();
});
