function saveToStorage(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}
function getFromStorage(key) {
  return JSON.parse(localStorage.getItem(key)) ?? {};
}

export { saveToStorage, getFromStorage };
