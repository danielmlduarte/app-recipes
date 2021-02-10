// pega
export const getStorage = (key) => JSON.parse(localStorage.getItem(key));
// coloca
export const setStorage = (key, item) => {
  localStorage.setItem(key, JSON.stringify(item));
};
