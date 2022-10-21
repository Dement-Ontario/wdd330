export function qs(selector) {
    return document.querySelector(selector);
}

export function onTouch(elementSelector, callback) {
    elementSelector.addEventListener("touchend", callback);
    elementSelector.addEventListener("click", callback);
}