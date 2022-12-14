export function readFromLS(key) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
}

export function writeToLS(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}