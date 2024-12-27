export default class Comun {
  constructor() {    
  }

  delay(time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  }

  getDataLocalStorage(key) {
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }
    return null; // Retorna null si no hay datos guardados
  }
}