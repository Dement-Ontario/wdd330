let swapiurl = 'https://swapi.dev/api/people';
let swapiNext = '';
let swapiPrev = '';
const swapiList = document.getElementById('peopleList');


function generateList() {
    fetch(swapiurl).then(response => response.json())
    .then(json =>{
        console.log(json);
        json.results.forEach(element => {
            const characterName = document.createElement('li');
            characterName.innerHTML = element.name;
            characterName.addEventListener('click', () => {characterInfo(element, characterName)});

            swapiList.appendChild(characterName);

            swapiNext = json.next;
            swapiPrev = json.previous;
        });
    });
}

generateList();

document.getElementById('next').addEventListener('click', () => {
    if(swapiNext !== null) {
        swapiurl = swapiNext;
        document.getElementById("peopleList").innerHTML = '';
        generateList();
    }
});

document.getElementById('prev').addEventListener('click', () => {
    if(swapiPrev !== null) {
        swapiurl = swapiPrev;
        document.getElementById("peopleList").innerHTML = '';
        generateList();
    }
});

function characterInfo(character, listItem) {
    console.log(character);
    
    infoList = `<p>Birth Year: ${character.birth_year}<br>
    Eye Color: ${character.eye_color}<br>
    Gender: ${character.gender}<br>
    <a href="${character.url}">More...</a></p>`;

    console.log(infoList);
    
    if(listItem.innerHTML === character.name) {
        listItem.innerHTML += infoList;
    } else {
        listItem.innerHTML = character.name;
    }
    
}