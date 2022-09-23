const links = [
    {
        label : "Week 01",
        url : "week01/"
    },
    {
        label : "Week 02",
        url : "week02/"
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