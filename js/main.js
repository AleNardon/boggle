
// modal de contacto
let contactModal = ` 
<div class="modalContact">
    <h2 class="titContact">Contacto</h2>
    <p class="textContact">Si tienes alguna duda o sugerencia, no dudes en contactarnos.</p>
</div>`;
setModal(contactModal);

// inicio del juego 
function startGame() {
    let form = document.getElementById("formStartGame")
    // nombre con la primera en mayuscula el resto en minuscula
    
    let name = form.name.value.charAt(0).toUpperCase() + form.name.value.slice(1).toLowerCase();
    let time = form.time.value;
    
    localStorage.setItem("configPlay", JSON.stringify({ name: name, time: time, day: new Date()}));
    // ocultar el inicio del juego
    document.getElementById("startGame").style.display = "none";
    // mostrar el juego
    document.getElementById("viewGame").style.display = "";
    // poner el puntaje en 0
    localStorage.setItem("points", 0);
    // poner las palabras jugadas en un array vacío
    localStorage.setItem("wordsPlayed", JSON.stringify([]));
    // poner las jugadas en un array vacío
    localStorage.setItem("plays", JSON.stringify([]));
    

    // sacar el estilo al temoporizador
    document.getElementById("timer").classList.remove("timerRed");
    
    
    // setear el tablero de jugadas en vacio
    document.getElementById("plays").innerHTML = "";
    // setear el tablero de puntos en 0
    document.getElementById("points").innerText = "0";
    // cambiar el nombre en el juego
    document.getElementById("namePlay").innerText = name;
    
    buttonAccept.disabled = true;
    document.getElementById("buttonAccept").disabled = false;
    //rellenar el ranking 

    // crear el tablero de juego
    createBoard(4)
    // agregar funcionalidad al boton aceptar
    document.getElementById("buttonAccept").addEventListener("click", accept);
    // iniciar el temporizador
    startTimer();

}

document.getElementById("formStartGame").addEventListener("submit", function (e) {
    e.preventDefault();
    startGame();
});

createTableRanking();