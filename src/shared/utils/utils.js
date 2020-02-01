export const getTags = JSON.parse(localStorage.getItem('tags'));
export const storeValues = (keyName, items) => JSON.stringify(localStorage.setItem(keyName, items));
