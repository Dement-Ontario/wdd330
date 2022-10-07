const  player1 = "X";
const  player2 = "O";
let currentPlayer = player1;

const gridReset = document.querySelector("#reset");
const gridContainer = document.querySelector(".grid-container");

gridReset.addEventListener("touchend", resetBoard);
gridReset.addEventListener("click", resetBoard);
gridContainer.childNodes.forEach(element => {
    element.addEventListener("touchend", () => {advance(element)});
    element.addEventListener("click", () => {advance(element)});
});

function advance(clickedSquare) {
    if(clickedSquare.innerHTML === "") {
        clickedSquare.innerHTML = currentPlayer;
        if(currentPlayer === player1) {
            currentPlayer = player2;
        } else {
            currentPlayer = player1;
        }
    }
}

function resetBoard() {
    gridContainer.childNodes.forEach(element => {
        element.innerHTML = "";
    });
}