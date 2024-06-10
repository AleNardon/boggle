// Longitud de la palabra

// letras --- Puntos
//  3,4 ---- 1
//   5  ---- 2
//   6  ---- 3
//   7  ---- 5
//   8+ ---- 11

function points(word) {
    if (word.length >= 3 && word.length <= 4) {
        return 1;
    } else if (word.length == 5) {
        return 2;
    } else if (word.length == 6) {
        return 3;
    } else if (word.length == 7) {
        return 5;
    } else if (word.length >= 8) {
        return 11;
    } else {
        return 0;
    }
}

function accept() {
    
    let word = document.getElementById("wordSelected").value;
    let points = localStorage.getItem("points");
    // la palabra es menor a 3 letras?
    if (word.length < 3) {
        points -= 1;
    }

    // la palabra ya se ha escrito?
    if (localStorage.getItem("words").includes(word)) {
        points -= 1;
    }
    // la palabra no existe en el diccionario

    

    let result = points(word);

}