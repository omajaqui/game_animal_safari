export default class Comun {
  constructor() {
    this.collectionDefault = [
      { name: 'stiker_buho', visible: false },
      { name: 'stiker_cerdo', visible: false },
      { name: 'stiker_gato', visible: false },
      { name: 'stiker_hormiga', visible: false },
      { name: 'stiker_murcielago', visible: false },
      { name: 'stiker_rata', visible: false },
      { name: 'stiker_perro', visible: false },
      { name: 'stiker_zorro', visible: false },

      { name: 'stiker_aguila', visible: false },
      { name: 'stiker_caballo', visible: false },
      { name: 'stiker_hipopotamo', visible: false },
      { name: 'stiker_iguana', visible: false },
      { name: 'stiker_leon', visible: false },
      { name: 'stiker_mono', visible: false },
      { name: 'stiker_rana', visible: false },
      { name: 'stiker_oso', visible: false },
      { name: 'stiker_tigre', visible: false },
      { name: 'stiker_zebra', visible: false },

      { name: 'stiker_araña', visible: false },
      { name: 'stiker_ardilla', visible: false },
      { name: 'stiker_armadillo', visible: false },
      { name: 'stiker_caiman', visible: false },
      { name: 'stiker_canguro', visible: false },
      { name: 'stiker_colibri', visible: false },
      { name: 'stiker_cucaracha', visible: false },
      { name: 'stiker_elefante', visible: false },
      { name: 'stiker_escorpion', visible: false },
      { name: 'stiker_jirafa', visible: false },
      { name: 'stiker_mariposa', visible: false },
      { name: 'stiker_mariquita', visible: false },
      { name: 'stiker_puercoespin', visible: false },
      { name: 'stiker_saltamontes', visible: false },
      { name: 'stiker_serpiente', visible: false },
      { name: 'stiker_urraca', visible: false },
    ];  
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

  createColeccion(newData = null) {
    const colectionData = (newData !== null) ? newData : this.collectionDefault;
    const data = this.getDataLocalStorage('collection');
    if(!data || newData) {
      localStorage.setItem('collection', JSON.stringify(colectionData));
    }
  }

  resetCollection(){
    localStorage.removeItem('collection');
    this.createColeccion();
  }
}