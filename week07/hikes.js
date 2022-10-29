import Comments from "./comments.js";

//create an array of hikes
const hikeList = [
    {
      name: "Bechler Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description:
        "Beautiful short hike along the Bechler river to Bechler Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
      name: "Teton Canyon",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description: "Beautiful short (or long) hike through Teton Canyon.",
      directions:
        "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Staline Raod for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
      name: "Denanda Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "7 miles",
      difficulty: "Moderate",
      description:
        "Beautiful hike through Bechler meadows river to Denanda Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
];
  
const imgBasePath = "//byui-cit.github.io/cit261/examples/";

export default class Hikes {
    constructor(elementId) {
        this.parentElement = document.getElementById(elementId);
        this.backButton = this.buildBackButton();
        
        // Comment type is hikes and element id targets the div with #comments
        this.comments = new Comments("hikes", "comments");
    }

    getAllHikes() {
        return hikeList;
    }

    getHikeByName(hikeName) {
        return this.getAllHikes().find(hike => hike.name === hikeName);
    }

    showHikeList() {
        const hikeListElement = document.getElementById("hikes");
        hikeListElement.innerHTML = "";
        renderHikeList(hikeList, hikeListElement);
        this.addHikeListener();
        this.backButton.classList.add('hidden');

        // Shows the comment list with the query defaulting to null and thus no div with .addComment
        this.comments.showCommentList();
    }
    // show one hike with full details in the parentElement
    showOneHike(hikeName) {
        const hike = this.getHikeByName(hikeName);
        this.parentElement.innerHTML = '';
        this.parentElement.appendChild(renderOneHikeFull(hike));
        // show the back button
        this.backButton.classList.remove('hidden');

        // Shows the comment list with the query as NOT null and thus including the div with .addComment
        this.comments.showCommentList(hikeName);
    }
    // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
    addHikeListener() {
        const childrenArray = Array.from(this.parentElement.children);
        childrenArray.forEach(element => {
            element.addEventListener("touchend", e => {this.showOneHike(e.currentTarget.dataset.name)});
            element.addEventListener("click", e => {this.showOneHike(e.currentTarget.dataset.name)});
        });
    }

    buildBackButton() {
        const backButton = document.createElement("button");
        backButton.innerHTML = "&lt;- All Hikes";
        backButton.addEventListener("touchend", () => {
            this.showHikeList();
        });
        backButton.addEventListener("click", () => {
            this.showHikeList();
        });
        backButton.classList.add("hidden");
        this.parentElement.before(backButton);
        return backButton;
    }
}

function renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
        parent.appendChild(renderOneHikeLight(hike));
    });
}
function renderOneHikeLight(hike) {
    const item = document.createElement('li');
    item.classList.add('light');
    // setting this to make getting the details for a specific hike easier later.
    item.setAttribute('data-name', hike.name);
    item.innerHTML = ` <h2>${hike.name}</h2>
    <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
    <div>
            <div>
                <h3>Distance</h3>
                <p>${hike.distance}</p>
            </div>
            <div>
                <h3>Difficulty</h3>
                <p>${hike.difficulty}</p>
            </div>
    </div>`;
  
    return item;
}
function renderOneHikeFull(hike) {
    const item = document.createElement("li");
    item.innerHTML = ` 
        
    <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
    <h2>${hike.name}</h2>
    <div>
        <h3>Distance</h3>
        <p>${hike.distance}</p>
    </div>
    <div>
        <h3>Difficulty</h3>
        <p>${hike.difficulty}</p>
    </div>
    <div>
        <h3>Description</h3>
        <p>${hike.description}</p>
    </div>
    <div>
        <h3>How to get there</h3>
        <p>${hike.directions}</p>
    </div>

    `;
    return item;
}