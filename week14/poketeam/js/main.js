import Pokemon from "./pokeymans.js";
import { onTouch } from "./utilities.js";

const PokeClass = new Pokemon;

const form = document.getElementById("poke-form");
const pokemon = document.querySelector(".choose-poke");
const updateButtons = document.querySelectorAll(".update-button");
const removeButtons = document.querySelectorAll(".remove-button");

let submitCount = 1;
let removeCount = 1;

updateButtons.forEach(button => {
    const buttonNumber = submitCount;
    onTouch(button, () => {form.onsubmit = (event) => submitPoke(event, true, buttonNumber)});
    submitCount++;
})

removeButtons.forEach(button => {
    const buttonNumber = removeCount;
    onTouch(button, () => {PokeClass.clearSlot(buttonNumber)});
    removeCount++;
})

form.onsubmit = submitPoke;

function submitPoke(event, isUpdate = false, buttonNumber) {
    event.preventDefault();
    if(!isUpdate) {
        PokeClass.findSlot(pokemon.value);
    } else {
        PokeClass.replaceSlot(pokemon.value, buttonNumber);
        form.onsubmit = submitPoke;
    }
}

PokeClass.fillPokeDataset();