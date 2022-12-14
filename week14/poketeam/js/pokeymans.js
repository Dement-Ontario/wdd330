import { readFromLS, writeToLS } from "./ls.js";
import { qs } from "./utilities.js";

const pokeNameList = [];
let pokeStorage = {
    "pokemon-1" : "",
    "pokemon-2" : "",
    "pokemon-3" : "",
    "pokemon-4" : "",
    "pokemon-5" : "",
    "pokemon-6" : ""
}

export default class Pokemon {
    constructor() {
        this.pokeTeamHTML = qs("#poke-team");
        this.storageKey = "pokeStorage";
    }

    fillPokeDataset() {
        const url = "https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0";
        const dataset = qs("#poke-list");

        fetch(url).then(response => response.json())
        .then(json => {
            // console.log(json);

            // Capitalize the first letter of every pokemon and add to dataset
            json.results.forEach(poke => {
                pokeNameList.push(poke.name);
                const name = makeNameLegible(poke.name);
                const option = document.createElement("option");
                option.value = `${name}`;
                dataset.appendChild(option);
            });
            // console.log(pokeNameList);
            loadPoke(this.storageKey);
        });
    }

    findSlot(input) {
        let slotNumber = 1;
        while(slotNumber <= 6) {
            const slot = `#pokemon-${slotNumber}`;
            if(qs(`${slot} p`).innerHTML !== "Empty") {
                slotNumber++;
            } else {
                postName(input, slot, slotNumber, this.storageKey);
                break;
            }
        }
        if(slotNumber > 6) {
            alert("Looks like you've filled all of the slots!\nUse an update button to replace a Pokemon or an X button to remove it.");
        }
    }

    replaceSlot(input, buttonNumber) {
        const slot = `#pokemon-${buttonNumber}`;
        postName(input, slot, buttonNumber, this.storageKey);
    }

    clearSlot(buttonNumber) {
        const slot = `#pokemon-${buttonNumber}`;
        const img = qs(`${slot} div img`);
        const name = qs(`${slot} p`);

        img.src = "";
        img.alt = "";
        name.textContent = "Empty";

        qs(slot).classList.remove("filled");

        pokeStorage[`pokemon-${buttonNumber}`] = "";
        writeToLS(this.storageKey, pokeStorage);
    }
}

function loadPoke(key) {
    if(readFromLS(key) === null) {
        writeToLS(key, pokeStorage);
    } else {
        pokeStorage = readFromLS(key);
        const pokemon = readFromLS(key);
        Object.entries(pokemon).forEach(pokeSlot => {
            if(pokeSlot[1] !== "") {
                postName(pokeSlot[1], `#${pokeSlot[0]}`, pokeSlot[0].substring(8), key);
            }
        });
    }
}

function makeNameLegible(name) {
    const splitName = name.split("-");
    let newName = [];
    splitName.forEach(split => {
        const upperSplit = split.charAt(0).toUpperCase() + split.slice(1);
        newName.push(upperSplit);
    });
    return newName.join(" ");
}

function makeNameUsable(name) {
    const lowerName = name.toLowerCase();
    const newName = lowerName.split(" ");
    return newName.join("-");
}

function postName(input, slot, slotNumber, key) {
    const name = makeNameUsable(input);
    // console.log(name);
    // console.log(pokeNameList);
    if(pokeNameList.includes(name)) {
        const pokeUrl = `https://pokeapi.co/api/v2/pokemon/${name}`;
        // console.log(pokeUrl);

        fetch(pokeUrl).then(response => response.json())
        .then(json => {
            const legibleName = makeNameLegible(name);
            const pokeImg = qs(`${slot} div img`);
            const pokeName = qs(`${slot} p`);
            // console.log(json.sprites.front_default);
            
            if(json.sprites.front_default !== null) {
               pokeImg.src = json.sprites.front_default;
               pokeImg.alt = legibleName;
            } else {
                pokeImg.src = "./images/nopokepicture.jpg";
                pokeImg.alt = `Picture for ${legibleName} not found.`;
            }
            pokeName.textContent = legibleName;
            qs(slot).classList.add("filled");

            pokeStorage[`pokemon-${slotNumber}`] = legibleName;
            writeToLS(key, pokeStorage);
        }); 
    } else {
        alert("Uh oh! You didn't type in a Pokemon from the database.\nAre you sure you spelled it correctly?");
    }
}