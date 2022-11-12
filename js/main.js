const links = [
    {
        label : "Week 01: Notes on Mobile Design and Not Much Else",
        url : "week01/"
    },
    {
        label : "Week 02: The Basics, Arrays, If-Thens, Loops, and Functions",
        url : "week02/"
    },
    {
        label : "Week 03: This, Objects, the DOM, and Events",
        url : "week03/"
    },
    {
        label : "Week 04: Forms, OOP, and Modules",
        url : "week04/"
    },
    {
        label : "Week 05: Testing and Debugging",
        url : "week05/"
    },
    {
        label : "Week 06: The Return of the ToDo List",
        url : "week06/"
    },
    {
        label : "Week 07: Further Functions, Ajax, and Fetch",
        url : "week07/"
    },
    {
        label : "Week 08: Transforms, Transitions, Canvas, SVG, and Drag and Drop",
        url : "week08/"
    },
    {
        label : "Week 09: The Window Object and Some HTML APIs",
        url : "week09/"
    }
];

let linkList = document.querySelector("ol");

links.forEach(link => {
    let linkLabel = document.createElement("li");
    let linkUrl = document.createElement("a");

    linkUrl.textContent = link.label;
    linkUrl.setAttribute("href", link.url);

    linkLabel.appendChild(linkUrl);
    linkList.appendChild(linkLabel);
});