// *** Global Variables ***
const gameBoxNode = document.querySelector("#game-box");

const ballNode = document.createElement("div"); // se crea la pelotita
ballNode.id = "ball"; // se asigna un id a la pelotita (para CSS)
gameBoxNode.append(ballNode); // se añade la pelotita a la caja de juego

const paddleNode = document.createElement("div"); // se crea la paleta
paddleNode.id = "paddle"; // se asigna un id a la paleta (para CSS)
gameBoxNode.append(paddleNode); // se añade la pelotita a la caja de juego

let ballX = 30 //valor definido en el CSS
let ballY = 30
let ballSpeed = 10

let isBallMovingRight = true //true: se mueve a la derecha; false: se mueve a la izda.
let isBallMovingDown = true

// *** Game Functions ***
function ballMovement() {
    if(isBallMovingRight === true){
        ballX += ballSpeed //la pelota se moverá 120 px por segundo (2x60)
    }else{
        ballX -= ballSpeed
    }
    //CADA VEZ QUE MODIFICAMOS UNA VARIABLE DE POSICIÓN, TAMAÑO, COLOR U OTRA, DEBEMOS ACTUALIZAR EL DOM
    ballNode.style.left = `${ballX}px` //importante agregar px

    if(isBallMovingDown === true){
        ballY += ballSpeed //la pelota se moverá 120 px por segundo (2x60)
    }else{
        ballY -= ballSpeed
    }
    ballNode.style.top = `${ballY}px`
}

function ballWallCollision() {
    //determina cuando la pelota colisiona con la pared del gamebox
    //gameBoxNode.offsetWidth es siempre el valor numerico del ancho del canvas
    //gameBoxNode.offsetHeight es siempre el valor numerico del ancho del canvas
    if( (ballX + ballNode.offsetWidth)>= gameBoxNode.offsetWidth) {
        isBallMovingRight = false
    }else if((ballY + ballNode.offsetHeight) >= gameBoxNode.offsetHeight) {
        isBallMovingDown = false
    }else if (ballX <= 0) { //cuando sea menor o igual a 0 volverá a ser true, es decir, se moverá a la dcha
        isBallMovingRight = true
    }else if (ballY <= 0) {
        isBallMovingDown = true
    }
}

function gameLoop() {
    //console.log("juego andando")//recomendación: hacemos consolelogs para probar pero luego mejor borrarlos o comentarlos porque ralentizan los equipos
    ballMovement()
    //tenemos que invocar la función ballWallColision ya que queremos chequearla en este itervalo, 60fps
    ballWallCollision()
}




// *** Game Loop Interval ***

//en lugar de crear una función anónima dentro del setInterval, creamos la función arriba y sólo le pasamos la función
setInterval(gameLoop, 1000/60) //valor de ms que se recomienda para juegos (esto es igual a deci 60fps)
//al estar pasando la funcion gameLoop, todo lo que hagamos detro de gameLoop se ejecutará 60 veces/segundo



// *** Event Listeners ***
//también podemos hacer document.addEventListener pero para animaciones mejor usar window
window.addEventListener("keydown", () => {
    console.log("presionando teclas")
})



